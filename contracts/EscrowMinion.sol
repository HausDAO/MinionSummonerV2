// Based on https://github.com/HausDAO/MinionSummoner/blob/main/MinionFactory.sol
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

interface IERC721 {
    // brief interface for minion erc721 token txs
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;
}

interface IERC1155 {
    // brief interface for minion erc1155 token txs
    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes calldata data
    ) external;
}

interface IERC721Receiver {
    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4);
}

interface IERC1155PartialReceiver {
    function onERC1155Received(
        address operator,
        address from,
        uint256 id,
        uint256 value,
        bytes calldata data
    ) external returns (bytes4);

    // ERC1155 batch receive not implemented in this escrow contract
}

interface IMOLOCH {
    // brief interface for moloch dao v2

    function depositToken() external view returns (address);

    function tokenWhitelist(address token) external view returns (bool);

    function getProposalFlags(uint256 proposalId)
        external
        view
        returns (bool[6] memory);

    function members(address user)
        external
        view
        returns (
            address,
            uint256,
            uint256,
            bool,
            uint256,
            uint256
        );

    function userTokenBalances(address user, address token)
        external
        view
        returns (uint256);

    function cancelProposal(uint256 proposalId) external;

    function submitProposal(
        address applicant,
        uint256 sharesRequested,
        uint256 lootRequested,
        uint256 tributeOffered,
        address tributeToken,
        uint256 paymentRequested,
        address paymentToken,
        string calldata details
    ) external returns (uint256);

    function withdrawBalance(address token, uint256 amount) external;
}

contract EscrowMinion is
    IERC721Receiver,
    ReentrancyGuard,
    IERC1155PartialReceiver
{
    using Address for address;
    using SafeERC20 for IERC20;

    uint256 constant MAX_LENGTH = 10;

    enum TributeType {
        ERC20,
        ERC721,
        ERC1155
    }

    // Track the balance and withdrawl state for each token
    struct EscrowBalance {
        uint256[3] typesTokenIdsAmounts;
        address tokenAddress;
        bool executed;
    }

    // Store destination vault and proposer for each proposal
    struct TributeEscrowAction {
        address vaultAddress;
        address proposer;
    }

    mapping(address => mapping(uint256 => TributeEscrowAction)) public actions; // moloch => proposalId => Action
    mapping(address => mapping(uint256 => mapping(uint256 => EscrowBalance))) // moloch => proposal => token index => balance
        public escrowBalances;

    event ProposeAction(
        uint256 proposalId,
        address proposer,
        address moloch,
        address[] tokens,
        uint256[MAX_LENGTH] types,
        uint256[MAX_LENGTH] tokenIds,
        uint256[MAX_LENGTH] amounts,
        address destinationVault
    );
    event ExecuteAction(uint256 proposalId, address executor, address moloch);
    event ActionCanceled(uint256 proposalId, address moloch);

    // Private tracking for destinations to ensure escrow can't get stuck
    mapping(TributeType => uint256) private _destinationChecked;
    uint256 private constant _NOT_CHECKED = 1;
    uint256 private constant _CHECKED = 2;

    constructor() {
        // Follow a similar pattern to reentency guard from OZ
        _destinationChecked[TributeType.ERC721] = _NOT_CHECKED;
        _destinationChecked[TributeType.ERC1155] = _NOT_CHECKED;
    }

    modifier safeDestination() {
        _;
        _destinationChecked[TributeType.ERC721] = _NOT_CHECKED;
        _destinationChecked[TributeType.ERC1155] = _NOT_CHECKED;
    }

    // Safely receive ERC721s
    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure override returns (bytes4) {
        return
            bytes4(
                keccak256("onERC721Received(address,address,uint256,bytes)")
            );
    }

    // Safely receive ERC1155s
    function onERC1155Received(
        address,
        address,
        uint256,
        uint256,
        bytes calldata
    ) external pure override returns (bytes4) {
        return
            bytes4(
                keccak256(
                    "onERC1155Received(address,address,uint256,uint256,bytes)"
                )
            );
    }

    /**
     * @dev Internal function to invoke {IERC721Receiver-onERC721Received} on a target address.
     * The call is not executed if the target address is not a contract.
     *
     * @param operator address representing the entity calling the function
     * @param from address representing the previous owner of the given token ID
     * @param to target address that will receive the tokens
     * @param tokenId uint256 ID of the token to be transferred
     * @param _data bytes optional data to send along with the call
     * @return bool whether the call correctly returned the expected magic value
     */
    function _checkOnERC721Received(
        address operator,
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) private returns (bool) {
        if (!to.isContract()) {
            return true;
        }
        bytes memory returndata = to.functionCall(
            abi.encodeWithSelector(
                IERC721Receiver(to).onERC721Received.selector,
                operator,
                from,
                tokenId,
                _data
            ),
            "ERC721: transfer to non ERC721Receiver implementer"
        );
        bytes4 retval = abi.decode(returndata, (bytes4));
        return (retval == IERC721Receiver(to).onERC721Received.selector);
    }

    function _checkOnERC1155Received(
        address operator,
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) private returns (bool) {
        if (!to.isContract()) {
            return true;
        }
        bytes memory returndata = to.functionCall(
            abi.encodeWithSelector(
                IERC1155PartialReceiver(to).onERC1155Received.selector,
                operator,
                from,
                id,
                amount,
                data
            ),
            "ERC1155: transfer to non ERC1155Receiver implementer"
        );
        bytes4 retval = abi.decode(returndata, (bytes4));
        return (retval ==
            IERC1155PartialReceiver(to).onERC1155Received.selector);
    }

    function checkERC721Recipients(address vaultAddress) internal {
        require(
            _checkOnERC721Received(
                address(this),
                address(this),
                vaultAddress,
                0,
                ""
            ),
            "!ERC721"
        );
        require(
            _checkOnERC721Received(
                address(this),
                address(this),
                msg.sender,
                0,
                ""
            ),
            "!ERC721"
        );
        _destinationChecked[TributeType.ERC721] = _CHECKED;
    }

    function checkERC1155Recipients(address vaultAddress) internal {
        require(
            _checkOnERC1155Received(
                address(this),
                address(this),
                vaultAddress,
                0,
                0,
                ""
            ),
            "!ERC1155"
        );
        require(
            _checkOnERC1155Received(
                address(this),
                address(this),
                msg.sender,
                0,
                0,
                ""
            ),
            "!ERC1155"
        );
        _destinationChecked[TributeType.ERC1155] = _CHECKED;
    }

    function doTransfer(
        address tokenAddress,
        uint256[3] memory typesTokenIdsAmounts,
        address from,
        address to
    ) internal {
        if (typesTokenIdsAmounts[0] == uint256(TributeType.ERC721)) {
            IERC721 erc721 = IERC721(tokenAddress);
            erc721.safeTransferFrom(from, to, typesTokenIdsAmounts[1]);
        } else if (typesTokenIdsAmounts[0] == uint256(TributeType.ERC20)) {
            require(typesTokenIdsAmounts[2] != 0, "!amount");
            IERC20 erc20 = IERC20(tokenAddress);
            if (from == address(this)) {
                erc20.safeTransfer(to, typesTokenIdsAmounts[2]);
            } else {
                erc20.safeTransferFrom(from, to, typesTokenIdsAmounts[2]);
            }
        } else if (typesTokenIdsAmounts[0] == uint256(TributeType.ERC1155)) {
            require(typesTokenIdsAmounts[2] != 0, "!amount");
            IERC1155 erc1155 = IERC1155(tokenAddress);
            erc1155.safeTransferFrom(
                from,
                to,
                typesTokenIdsAmounts[1],
                typesTokenIdsAmounts[2],
                ""
            );
        } else {
            revert("Invalid type");
        }
    }

    function processActionProposal(
        address molochAddress,
        address[] memory tokenAddresses,
        uint256[3][] memory typesTokenIdsAmounts,
        address vaultAddress,
        uint256 proposalId
    ) private {
        uint256[MAX_LENGTH] memory types;
        uint256[MAX_LENGTH] memory tokenIds;
        uint256[MAX_LENGTH] memory amounts;

        // Store proposal metadata
        actions[molochAddress][proposalId] = TributeEscrowAction({
            vaultAddress: vaultAddress,
            proposer: msg.sender
        });
        for (uint256 index = 0; index < tokenAddresses.length; index++) {
            // Store withdrawable balances
            escrowBalances[molochAddress][proposalId][
                index
            ] = EscrowBalance({
                typesTokenIdsAmounts: typesTokenIdsAmounts[index],
                tokenAddress: tokenAddresses[index],
                executed: false
            });

            if (_destinationChecked[TributeType.ERC721] == _NOT_CHECKED)
                checkERC721Recipients(vaultAddress);
            if (_destinationChecked[TributeType.ERC1155] == _NOT_CHECKED)
                checkERC1155Recipients(vaultAddress);

            // Move tokens into escrow
            doTransfer(
                tokenAddresses[index],
                typesTokenIdsAmounts[index],
                msg.sender,
                address(this)
            );

            // Store in memory so they can be emitted in an event
            types[index] = typesTokenIdsAmounts[index][0];
            tokenIds[index] = typesTokenIdsAmounts[index][1];
            amounts[index] = typesTokenIdsAmounts[index][2];
        }
        emit ProposeAction(
            proposalId,
            msg.sender,
            molochAddress,
            tokenAddresses,
            types,
            tokenIds,
            amounts,
            vaultAddress
        );
    }

    //  -- Proposal Functions --
    /**
     * @notice Creates a proposal and moves NFT into escrow
     * @param molochAddress Address of DAO
     * @param tokenAddresses Token contract address
     * @param typesTokenIdsAmounts Token id.
     * @param vaultAddress Address of DAO's NFT vault
     * @param requestSharesLootFunds Amount of shares requested
     // add funding request token
     * @param details Info about proposal
     */
    function proposeTribute(
        address molochAddress,
        address[] calldata tokenAddresses,
        uint256[3][] calldata typesTokenIdsAmounts,
        address vaultAddress,
        uint256[3] calldata requestSharesLootFunds, // also request loot or treasury funds
        string calldata details
    ) external nonReentrant safeDestination returns (uint256) {
        IMOLOCH thisMoloch = IMOLOCH(molochAddress);
        address thisMolochDepositToken = thisMoloch.depositToken();

        require(vaultAddress != address(0), "invalid vaultAddress");

        require(
            typesTokenIdsAmounts.length == tokenAddresses.length,
            "!same-length"
        );

        require(typesTokenIdsAmounts.length <= MAX_LENGTH, "!max-length");

        uint256 proposalId = thisMoloch.submitProposal(
            msg.sender,
            requestSharesLootFunds[0],
            requestSharesLootFunds[1],
            0,
            thisMolochDepositToken,
            requestSharesLootFunds[2],
            thisMolochDepositToken,
            details
        );

        processActionProposal(
            molochAddress,
            tokenAddresses,
            typesTokenIdsAmounts,
            vaultAddress,
            proposalId
        );

        return proposalId;
    }

    function processWithdrawls(
        address molochAddress,
        uint256[] calldata tokenIndices, // only withdraw indices in this list
        address destination,
        uint256 proposalId
    ) private {
        for (uint256 index = 0; index < tokenIndices.length; index++) {
            // Retrieve withdrawable balances
            EscrowBalance storage escrowBalance = escrowBalances[molochAddress][
                proposalId
            ][tokenIndices[index]];
            require(!escrowBalance.executed, "executed");
            require(escrowBalance.tokenAddress != address(0), "!token");
            escrowBalance.executed = true;

            doTransfer(
                escrowBalance.tokenAddress,
                escrowBalance.typesTokenIdsAmounts,
                address(this),
                destination
            );
        }
    }

    function withdrawToDestination(
        uint256 proposalId,
        address molochAddress,
        uint256[] calldata tokenIndices
    ) external nonReentrant {
        IMOLOCH thisMoloch = IMOLOCH(molochAddress);
        bool[6] memory flags = thisMoloch.getProposalFlags(proposalId);

        require(flags[1] || flags[3], "proposal not processed and not cancelled");

        TributeEscrowAction memory action = actions[molochAddress][proposalId];
        address destination;
        // if passed, send NFT to vault
        if (flags[2]) {
            destination = action.vaultAddress;
            // if failed or cancelled, send back to proposer
        } else {
            destination = action.proposer;
        }

        processWithdrawls(
            molochAddress,
            tokenIndices,
            destination,
            proposalId
        );

        emit ExecuteAction(proposalId, msg.sender, molochAddress);
    }

    function cancelAction(uint256 _proposalId, address molochAddress)
        external
        nonReentrant
    {
        IMOLOCH thisMoloch = IMOLOCH(molochAddress);
        TributeEscrowAction memory action = actions[molochAddress][_proposalId];

        require(msg.sender == action.proposer, "not proposer");
        // todo any safety checks?
        thisMoloch.cancelProposal(_proposalId);

        emit ActionCanceled(_proposalId, molochAddress);
    }
}
