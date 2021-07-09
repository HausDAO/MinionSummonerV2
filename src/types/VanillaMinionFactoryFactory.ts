/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { VanillaMinionFactory } from "./VanillaMinionFactory";

export class VanillaMinionFactoryFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _template: string,
    overrides?: Overrides
  ): Promise<VanillaMinionFactory> {
    return super.deploy(
      _template,
      overrides || {}
    ) as Promise<VanillaMinionFactory>;
  }
  getDeployTransaction(
    _template: string,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(_template, overrides || {});
  }
  attach(address: string): VanillaMinionFactory {
    return super.attach(address) as VanillaMinionFactory;
  }
  connect(signer: Signer): VanillaMinionFactoryFactory {
    return super.connect(signer) as VanillaMinionFactoryFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): VanillaMinionFactory {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as VanillaMinionFactory;
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
        internalType: "string",
        name: "details",
        type: "string",
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
  "0x60a060405234801561001057600080fd5b506040516107063803806107068339818101604052602081101561003357600080fd5b5051606081901b6001600160601b0319166080526001600160a01b031661069a61006c600039806101f85280610222525061069a6000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c80636f2ddd931461005157806376fff522146100755780637b3745871461012b578063d67014df14610148575b600080fd5b6100596101f6565b604080516001600160a01b039092168252519081900360200190f35b6100596004803603604081101561008b57600080fd5b6001600160a01b0382351691908101906040810160208201356401000000008111156100b657600080fd5b8201836020820111156100c857600080fd5b803590602001918460018302840111640100000000831117156100ea57600080fd5b91908080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092955061021a945050505050565b6100596004803603602081101561014157600080fd5b5035610494565b61016e6004803603602081101561015e57600080fd5b50356001600160a01b03166104be565b60405180836001600160a01b0316815260200180602001828103825283818151815260200191508051906020019080838360005b838110156101ba5781810151838201526020016101a2565b50505050905090810190601f1680156101e75780820380516001836020036101000a031916815260200191505b50935050505060405180910390f35b7f000000000000000000000000000000000000000000000000000000000000000081565b6000806102467f0000000000000000000000000000000000000000000000000000000000000000610571565b9050806001600160a01b03166319ab453c856040518263ffffffff1660e01b815260040180826001600160a01b03168152602001915050600060405180830381600087803b15801561029757600080fd5b505af11580156102ab573d6000803e3d6000fd5b5050604080518082018252600e81526d3b30b734b636309036b4b734b7b760911b602080830191909152825180840184526001600160a01b038a811682528183018a815288821660009081526001808652969020835181546001600160a01b031916931692909217825551805194975091955093610331939085019291909101906105c3565b5050600080546001810182558180527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630180546001600160a01b0319166001600160a01b03868116918217909255604080518181528951918101919091528851928a16945090927f82c46fce23f68e421df03972dc4fcfc2add76d8c37a037fbc47e378d132ca6269289928792909182916020808401926060850192918801918190849084905b838110156103f05781810151838201526020016103d8565b50505050905090810190601f16801561041d5780820380516001836020036101000a031916815260200191505b50838103825284518152845160209182019186019080838360005b83811015610450578181015183820152602001610438565b50505050905090810190601f16801561047d5780820380516001836020036101000a031916815260200191505b5094505050505060405180910390a3509392505050565b600081815481106104a457600080fd5b6000918252602090912001546001600160a01b0316905081565b600160208181526000928352604092839020805481840180548651600261010097831615979097026000190190911695909504601f81018590048502860185019096528585526001600160a01b03909116949193929091908301828280156105675780601f1061053c57610100808354040283529160200191610567565b820191906000526020600020905b81548152906001019060200180831161054a57829003601f168201915b5050505050905082565b6000808260601b9050604051733d602d80600a3d3981f3363d3d373d3d3d363d7360601b81528160148201526e5af43d82803e903d91602b57fd5bf360881b60288201526037816000f0949350505050565b828054600181600116156101000203166002900490600052602060002090601f0160209004810192826105f9576000855561063f565b82601f1061061257805160ff191683800117855561063f565b8280016001018555821561063f579182015b8281111561063f578251825591602001919060010190610624565b5061064b92915061064f565b5090565b5b8082111561064b576000815560010161065056fea2646970667358221220837276deb7637e724141f554b8c90cb366ebc2b6af4d97ca5d352e8968d40ed264736f6c63430007050033";
