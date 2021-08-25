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
    overrides?: Overrides
  ): Promise<SafeMinionFactory> {
    return super.deploy(
      _template,
      _molochTemplate,
      _executorTemplate,
      overrides || {}
    ) as Promise<SafeMinionFactory>;
  }
  getDeployTransaction(
    _template: string,
    _molochTemplate: string,
    _executorTemplate: string,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(
      _template,
      _molochTemplate,
      _executorTemplate,
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
  "0x60a060405234801561001057600080fd5b5060405161088338038061088383398101604081905261002f916100af565b6001600160601b0319606084901b166080526040516343431f6360e11b815283906001600160a01b038216906386863ec69061007490869086906000906004016100fb565b600060405180830381600087803b15801561008e57600080fd5b505af11580156100a2573d6000803e3d6000fd5b5050505050505050610137565b6000806000606084860312156100c3578283fd5b83516100ce8161011f565b60208501519093506100df8161011f565b60408501519092506100f08161011f565b809150509250925092565b6001600160a01b039384168152919092166020820152604081019190915260600190565b6001600160a01b038116811461013457600080fd5b50565b60805160601c61072861015b6000396000818160ff015261015301526107286000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80633e86f2731461005c5780636f2ddd931461007a5780637b3745871461008f578063835202ce146100a2578063d67014df146100b5575b600080fd5b6100646100d6565b6040516100719190610658565b60405180910390f35b6100826100fd565b60405161007191906105f4565b61008261009d366004610591565b610121565b6100826100b03660046104c7565b61014b565b6100c86100c33660046104a6565b6102ef565b60405161007192919061062c565b6040518060400160405280600b81526020016a29b0b3329036b4b734b7b760a91b81525081565b7f000000000000000000000000000000000000000000000000000000000000000081565b6000818154811061013157600080fd5b6000918252602090912001546001600160a01b0316905081565b6000806101777f000000000000000000000000000000000000000000000000000000000000000061039f565b6040516343431f6360e11b81529091506001600160a01b038216906386863ec6906101aa90899089908890600401610608565b600060405180830381600087803b1580156101c457600080fd5b505af11580156101d8573d6000803e3d6000fd5b50506040805180820182526001600160a01b038a8116825260208083018a815287831660009081526001808452959020845181546001600160a01b0319169416939093178355518051939650919450610236938501929101906103f1565b5050600080546001810182559080527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630180546001600160a01b0319166001600160a01b03848116918217909255604080518082018252600b81526a29b0b3329036b4b734b7b760a91b60208201529051928a16935090917fa7263f64fc0919758633f16671099128e3b868bb0893fcb099b19fb9ab522ade916102de91899190899061066b565b60405180910390a395945050505050565b6001602081905260009182526040909120805491810180546001600160a01b039093169261031c906106a1565b80601f0160208091040260200160405190810160405280929190818152602001828054610348906106a1565b80156103955780601f1061036a57610100808354040283529160200191610395565b820191906000526020600020905b81548152906001019060200180831161037857829003601f168201915b5050505050905082565b6000808260601b9050604051733d602d80600a3d3981f3363d3d373d3d3d363d7360601b81528160148201526e5af43d82803e903d91602b57fd5bf360881b60288201526037816000f0949350505050565b8280546103fd906106a1565b90600052602060002090601f01602090048101928261041f5760008555610465565b82601f1061043857805160ff1916838001178555610465565b82800160010185558215610465579182015b8281111561046557825182559160200191906001019061044a565b50610471929150610475565b5090565b5b808211156104715760008155600101610476565b80356001600160a01b03811681146104a157600080fd5b919050565b6000602082840312156104b7578081fd5b6104c08261048a565b9392505050565b600080600080608085870312156104dc578283fd5b6104e58561048a565b935060206104f481870161048a565b9350604086013567ffffffffffffffff80821115610510578485fd5b818801915088601f830112610523578485fd5b813581811115610535576105356106dc565b604051601f8201601f1916810185018381118282101715610558576105586106dc565b60405281815283820185018b101561056e578687fd5b818585018683013790810190930194909452509396929550929360600135925050565b6000602082840312156105a2578081fd5b5035919050565b60008151808452815b818110156105ce576020818501810151868301820152016105b2565b818111156105df5782602083870101525b50601f01601f19169290920160200192915050565b6001600160a01b0391909116815260200190565b6001600160a01b039384168152919092166020820152604081019190915260600190565b6001600160a01b0383168152604060208201819052600090610650908301846105a9565b949350505050565b6000602082526104c060208301846105a9565b60006060825261067e60608301866105a9565b828103602084015261069081866105a9565b915050826040830152949350505050565b6002810460018216806106b557607f821691505b602082108114156106d657634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fdfea26469706673582212202b59e1cc490a78105255249f72dc4caf939e3cdba51c2136bcafcf7c7081a36964736f6c63430008000033";