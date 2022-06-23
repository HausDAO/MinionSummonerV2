# MinionSummoner
Summon All the Minions

## Safe Minion Deployments

Mainnet: 0xbc37509a283e2bb67fd151c34e72e826c501e108

Polygon: xA1b97D22e22507498B350A9edeA85c44bA7DBC01

xDai: 0xA1b97D22e22507498B350A9edeA85c44bA7DBC01

Görli: 0x121931c0Bc458A5f13F3861444AeB036cc8a5363

## Documetation is still WIP

### Safe Minion walkthrough and docs

DAOHaus uses the Moloch DAO framework for share allocation, voting, and treasury management. Moloch DAOs alone are not able to interact with arbitrary external contracts.

DAOHaus developers created Minion contracts which associate arbitrary external calls with DAO proposals. This made it so Moloch DAOs could govern state changes on other contracts using the Minion as an adapter.

Now, by making Minions Zodiac-compatible, it enables us to take Minions even further, expanding the possibilities for what DAOs can do.

### Use cases

Through Minion Safes, DAOHaus DAOs can do the following (and much more):

* Manage a bank of NFTs
* Create orders with on-chain and signature-based NFT marketplaces
* Provide liquidity with AMMs
* Upgrade to new governance frameworks (eg MolochV3 😉) without having to transfer their assets
* Elect temporary delegates to manage assets in a Safe
* Interact with any decentralized application through the Safe Wallet Connect integration
* Create custom 'rage quit' adapters to manage non-divisible assets or multi-bank treasuries
* Update a current Gnosis Safe to a Daohaus DAO
* Manage multiple Safes
* Transfer an entire set of assets (DAO
Mergers & Acquisitions)

### Why Zodiac


*Quote from Gnosis*
> A composable design philosophy for DAOs, Zodiac is a collection of tools built according to an open standard. The Zodiac open standard enables DAOs to act more like constellations, connecting platforms, protocols, and chains, no longer confined to monolithic designs. In other words: **Zodiac is the expansion pack for DAOs**

V0 Minions have multiple responsibilities.

* Translate Moloch DAO proposals into arbitrary external calls
* Store a separate treasury of DAO assets including NFTs and other tokens the Moloch DAO does not support

Through Zodiac we can allow the Minion to focus only on translating proposals to external calls, and store all assets in a Gnosis Safe.

With assets in a Gnosis Safe, we can enable a wide variety of governance options and migration paths:

### Governance Options



| Governance     | Rules                                                                                              |
| -------------- | -------------------------------------------------------------------------------------------------- |
| Vanilla Moloch | Share weighted, full voting & grace periods                                                        |
| Quorum         | Early execution allowed if quorum is reached                                                       |
| Delegates      | Temporarily elected EOAs to act as delegates of the DAO for high stakes, time sensitive executions |



### Migration Paths

DAOs that start as a multisig with signers can decentralize their governance over time by handing over control of the Safe to a Moloch's Minion. The assets will then only be able to be managed through governance proposals.

DAOs that want to upgrade to a newer Moloch or other governance frameworks do not have to move all of their assets. They simply change which Minion is the module on the Safe through a vote.

DAOs that want to sell or transfer a large group of assets from their DAO to another can just change the owner of the Safe, effictively transfering everything in one large batch for very little gas.

## How it works

A Minion is deployed and configured to make proposals on, listen to a specific Moloch.

The Minion inherits the `Module.sol` contract from the Zodiac library. The Minion then uses the Module's `exec` function to execute arbitrary external calls on behalf of the Safe.

The Minion **always** uses the Gnosis Multisend library so that multiple transactions can be associated with a single proposal.

### Contract Signatures

The Safe is configured to use the `Compatibility Fallback Handler` which enables a safe to make EIP1271 contract signatures. In order to "sign" a message as a DAO, a member can make a proposal to `delegateCall` to the Gnosis `SignMessageLib`


### Streamlined Deployment

If the DAO is setting up a new Gnosis safe, they can deploy the Safe, Minion, and configure all of the settings in a single transaction.

```
/// @dev Function to summon minion and configure with a new safe
    /// @param _moloch Already deployed Moloch to instruct minion
    /// @param _details Optional metadata to store
    /// @param _minQuorum Optional quorum settings, set 0 to disable
    /// @param _saltNonce Number used to calculate the address of the new minion
    function summonMinionAndSafe(
        address _moloch,
        string memory _details,
        uint256 _minQuorum,
        uint256 _saltNonce
    ) external returns (address);
```

This function does the following:

1. Deploys a new Minion using a proxy factory
2. Deploys a new Safe using a proxy factory
3. Sets up the Minion to use the Gnosis multisend library
4. Sets up the Safe to use the Gnosis Compatibility fallback handler, and enables the minion as the sole module and signer

### Deployment with existing safe

If the DAO has a Safe already, they have to deploy in 2 steps.

1. Deploy Minion
2. Submit transaction on Safe to enable Minoin as module

```
    /// @dev Function to only summon a minion to be attached to an existing safe
    /// @param _moloch Already deployed Moloch to instruct minion
    /// @param _avatar Already deployed safe
    /// @param _details Optional metadata to store
    /// @param _minQuorum Optional quorum settings, set 0 to disable
    /// @param _saltNonce Number used to calculate the address of the new minion
    function summonMinion(
        address _moloch,
        address _avatar,
        string memory _details,
        uint256 _minQuorum,
        uint256 _saltNonce
    ) external returns (address);
```

## Contract Addresses



| Network | Summoner                                                                                            |
| ------- | --------------------------------------------------------------------------------------------------- |
| Mainnet | https://etherscan.io/address/0xbc37509a283e2bb67fd151c34e72e826c501e108                             |
| Polygon | https://polygonscan.com/address/0xA1b97D22e22507498B350A9edeA85c44bA7DBC01                          |
| xDai    | https://blockscout.com/xdai/mainnet/address/0xA1b97D22e22507498B350A9edeA85c44bA7DBC01/transactions |
| Görli   | https://goerli.etherscan.io/address/0x121931c0Bc458A5f13F3861444AeB036cc8a5363                      |

## Deploy one today!

Safe Minions are live on the DAOHaus app. Add one to your DAO and start expanding your community's coordination toolbox.


![](https://i.imgur.com/fjhrEdw.png)

![](https://i.imgur.com/a4guQDZ.png)


## Credits

Based on the original work done by RaidGuild at [Moloch-Minion](https://github.com/raid-guild/moloch-minion/)

To be used as an extension to the Moloch V2 contracts by MolochVentures [Moloch](https://github.com/MolochVentures/moloch)



## Gittron

<table border="0"><tr>  <td><a href="https://gittron.me/bots/0x8927082e018a34dc7d675896f6741146%22%3E<img src="https://s3.amazonaws.com/od-flat-svg/0x8927082e018a34dc7d675896f6741146.png" alt="gittron" width="50"/></a></td><td><a href="https://gittron.me/bots/0x8927082e018a34dc7d675896f6741146%22%3ESUPPORT US WITH GITTRON</a></td></tr></table>

