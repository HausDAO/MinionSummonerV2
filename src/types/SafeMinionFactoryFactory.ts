/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { SafeMinionFactory } from "./SafeMinionFactory";

export class SafeMinionFactoryFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _template: string,
    _molochTemplate: string,
    _executorTemplate: string,
    _multisendSingleton: string,
    overrides?: Overrides
  ): Promise<SafeMinionFactory> {
    return super.deploy(
      _template,
      _molochTemplate,
      _executorTemplate,
      _multisendSingleton,
      overrides || {}
    ) as Promise<SafeMinionFactory>;
  }
  getDeployTransaction(
    _template: string,
    _molochTemplate: string,
    _executorTemplate: string,
    _multisendSingleton: string,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(
      _template,
      _molochTemplate,
      _executorTemplate,
      _multisendSingleton,
      overrides || {}
    );
  }
  attach(address: string): SafeMinionFactory {
    return super.attach(address) as SafeMinionFactory;
  }
  connect(signer: Signer): SafeMinionFactoryFactory {
    return super.connect(signer) as SafeMinionFactoryFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SafeMinionFactory {
    return new Contract(address, _abi, signerOrProvider) as SafeMinionFactory;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_template",
        type: "address",
      },
      {
        internalType: "address",
        name: "_molochTemplate",
        type: "address",
      },
      {
        internalType: "address",
        name: "_executorTemplate",
        type: "address",
      },
      {
        internalType: "address",
        name: "_multisendSingleton",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "minion",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "moloch",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "details",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "minionType",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "minQuorum",
        type: "uint256",
      },
    ],
    name: "SummonMinion",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "minionList",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minionType",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "minions",
    outputs: [
      {
        internalType: "address",
        name: "moloch",
        type: "address",
      },
      {
        internalType: "string",
        name: "details",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "moloch",
        type: "address",
      },
      {
        internalType: "address",
        name: "executor",
        type: "address",
      },
      {
        internalType: "address",
        name: "multisend",
        type: "address",
      },
      {
        internalType: "string",
        name: "details",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "minQuorum",
        type: "uint256",
      },
    ],
    name: "summonMinion",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "template",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60a060405234801561001057600080fd5b506040516108b93803806108b983398101604081905261002f916100b2565b6001600160601b0319606085901b16608052604051632331cedd60e11b815284906001600160a01b038216906346639dba9061007690879087908790600090600401610110565b600060405180830381600087803b15801561009057600080fd5b505af11580156100a4573d6000803e3d6000fd5b505050505050505050610152565b600080600080608085870312156100c7578384fd5b84516100d28161013a565b60208601519094506100e38161013a565b60408601519093506100f48161013a565b60608601519092506101058161013a565b939692955090935050565b6001600160a01b039485168152928416602084015292166040820152606081019190915260800190565b6001600160a01b038116811461014f57600080fd5b50565b60805160601c6107426101776000396000818161010501526102a601526107426000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80633e86f2731461005c5780635c952fe91461007a5780636f2ddd931461009a5780637b374587146100a2578063d67014df146100b5575b600080fd5b6100646100d6565b6040516100719190610672565b60405180910390f35b61008d6100883660046104ca565b6100fd565b6040516100719190610608565b61008d6102a4565b61008d6100b03660046105a5565b6102c8565b6100c86100c33660046104a9565b6102f2565b604051610071929190610646565b6040518060400160405280600b81526020016a29b0b3329036b4b734b7b760a91b81525081565b6000806101297f00000000000000000000000000000000000000000000000000000000000000006103a2565b604051632331cedd60e11b81529091506001600160a01b038216906346639dba9061015e908a908a908a90899060040161061c565b600060405180830381600087803b15801561017857600080fd5b505af115801561018c573d6000803e3d6000fd5b50506040805180820182526001600160a01b038b8116825260208083018a815287831660009081526001808452959020845181546001600160a01b03191694169390931783555180519396509194506101ea938501929101906103f4565b5050600080546001810182559080527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630180546001600160a01b0319166001600160a01b03848116918217909255604080518082018252600b81526a29b0b3329036b4b734b7b760a91b60208201529051928b16935090917fa7263f64fc0919758633f16671099128e3b868bb0893fcb099b19fb9ab522ade91610292918991908990610685565b60405180910390a39695505050505050565b7f000000000000000000000000000000000000000000000000000000000000000081565b600081815481106102d857600080fd5b6000918252602090912001546001600160a01b0316905081565b6001602081905260009182526040909120805491810180546001600160a01b039093169261031f906106bb565b80601f016020809104026020016040519081016040528092919081815260200182805461034b906106bb565b80156103985780601f1061036d57610100808354040283529160200191610398565b820191906000526020600020905b81548152906001019060200180831161037b57829003601f168201915b5050505050905082565b6000808260601b9050604051733d602d80600a3d3981f3363d3d373d3d3d363d7360601b81528160148201526e5af43d82803e903d91602b57fd5bf360881b60288201526037816000f0949350505050565b828054610400906106bb565b90600052602060002090601f0160209004810192826104225760008555610468565b82601f1061043b57805160ff1916838001178555610468565b82800160010185558215610468579182015b8281111561046857825182559160200191906001019061044d565b50610474929150610478565b5090565b5b808211156104745760008155600101610479565b80356001600160a01b03811681146104a457600080fd5b919050565b6000602082840312156104ba578081fd5b6104c38261048d565b9392505050565b600080600080600060a086880312156104e1578081fd5b6104ea8661048d565b945060206104f981880161048d565b94506105076040880161048d565b9350606087013567ffffffffffffffff80821115610523578384fd5b818901915089601f830112610536578384fd5b813581811115610548576105486106f6565b604051601f8201601f191681018501838111828210171561056b5761056b6106f6565b60405281815283820185018c1015610581578586fd5b81858501868301379081019093019390935250949793965091946080013592915050565b6000602082840312156105b6578081fd5b5035919050565b60008151808452815b818110156105e2576020818501810151868301820152016105c6565b818111156105f35782602083870101525b50601f01601f19169290920160200192915050565b6001600160a01b0391909116815260200190565b6001600160a01b039485168152928416602084015292166040820152606081019190915260800190565b6001600160a01b038316815260406020820181905260009061066a908301846105bd565b949350505050565b6000602082526104c360208301846105bd565b60006060825261069860608301866105bd565b82810360208401526106aa81866105bd565b915050826040830152949350505050565b6002810460018216806106cf57607f821691505b602082108114156106f057634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fdfea264697066735822122071815257cbcf43da931de60645e3e5b47916a7a3ea617d847a5655f6807d88c764736f6c63430008000033";
