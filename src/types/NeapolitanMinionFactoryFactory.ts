/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { NeapolitanMinionFactory } from "./NeapolitanMinionFactory";

export class NeapolitanMinionFactoryFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _template: string,
    _molochTemplate: string,
    overrides?: Overrides
  ): Promise<NeapolitanMinionFactory> {
    return super.deploy(
      _template,
      _molochTemplate,
      overrides || {}
    ) as Promise<NeapolitanMinionFactory>;
  }
  getDeployTransaction(
    _template: string,
    _molochTemplate: string,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(
      _template,
      _molochTemplate,
      overrides || {}
    );
  }
  attach(address: string): NeapolitanMinionFactory {
    return super.attach(address) as NeapolitanMinionFactory;
  }
  connect(signer: Signer): NeapolitanMinionFactoryFactory {
    return super.connect(signer) as NeapolitanMinionFactoryFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NeapolitanMinionFactory {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as NeapolitanMinionFactory;
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
  "0x60a060405234801561001057600080fd5b5060405161085338038061085383398101604081905261002f916100ac565b6001600160601b0319606083901b16608052604051630e66b9c960e21b815282906001600160a01b0382169063399ae724906100729085906000906004016100e5565b600060405180830381600087803b15801561008c57600080fd5b505af11580156100a0573d6000803e3d6000fd5b50505050505050610116565b600080604083850312156100be578182fd5b82516100c9816100fe565b60208401519092506100da816100fe565b809150509250929050565b6001600160a01b03929092168252602082015260400190565b6001600160a01b038116811461011357600080fd5b50565b60805160601c61071861013b6000396000818161010b01526102ac01526107186000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80633e86f2731461005c5780633fb88bec1461007a5780636f2ddd931461009a5780637b374587146100a2578063d67014df146100b5575b600080fd5b6100646100d6565b6040516100719190610648565b60405180910390f35b61008d6100883660046104d0565b610103565b60405161007191906105ef565b61008d6102aa565b61008d6100b036600461058c565b6102ce565b6100c86100c33660046104af565b6102f8565b604051610071929190610603565b604051806040016040528060118152602001702732b0b837b634ba30b71036b4b734b7b760791b81525081565b60008061012f7f00000000000000000000000000000000000000000000000000000000000000006103a8565b604051630e66b9c960e21b81529091506001600160a01b0382169063399ae72490610160908890879060040161062f565b600060405180830381600087803b15801561017a57600080fd5b505af115801561018e573d6000803e3d6000fd5b50506040805180820182526001600160a01b03898116825260208083018a815287831660009081526001808452959020845181546001600160a01b03191694169390931783555180519396509194506101ec938501929101906103fa565b5050600080546001810182559080527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5630180546001600160a01b0319166001600160a01b0384811691821790925560408051808201825260118152702732b0b837b634ba30b71036b4b734b7b760791b60208201529051928916935090917fa7263f64fc0919758633f16671099128e3b868bb0893fcb099b19fb9ab522ade9161029a91899190899061065b565b60405180910390a3949350505050565b7f000000000000000000000000000000000000000000000000000000000000000081565b600081815481106102de57600080fd5b6000918252602090912001546001600160a01b0316905081565b6001602081905260009182526040909120805491810180546001600160a01b039093169261032590610691565b80601f016020809104026020016040519081016040528092919081815260200182805461035190610691565b801561039e5780601f106103735761010080835404028352916020019161039e565b820191906000526020600020905b81548152906001019060200180831161038157829003601f168201915b5050505050905082565b6000808260601b9050604051733d602d80600a3d3981f3363d3d373d3d3d363d7360601b81528160148201526e5af43d82803e903d91602b57fd5bf360881b60288201526037816000f0949350505050565b82805461040690610691565b90600052602060002090601f016020900481019282610428576000855561046e565b82601f1061044157805160ff191683800117855561046e565b8280016001018555821561046e579182015b8281111561046e578251825591602001919060010190610453565b5061047a92915061047e565b5090565b5b8082111561047a576000815560010161047f565b80356001600160a01b03811681146104aa57600080fd5b919050565b6000602082840312156104c0578081fd5b6104c982610493565b9392505050565b6000806000606084860312156104e4578182fd5b6104ed84610493565b925060208085013567ffffffffffffffff8082111561050a578485fd5b818701915087601f83011261051d578485fd5b81358181111561052f5761052f6106cc565b604051601f8201601f1916810185018381118282101715610552576105526106cc565b60405281815283820185018a1015610568578687fd5b81858501868301379081019093019490945250929592945050506040919091013590565b60006020828403121561059d578081fd5b5035919050565b60008151808452815b818110156105c9576020818501810151868301820152016105ad565b818111156105da5782602083870101525b50601f01601f19169290920160200192915050565b6001600160a01b0391909116815260200190565b6001600160a01b0383168152604060208201819052600090610627908301846105a4565b949350505050565b6001600160a01b03929092168252602082015260400190565b6000602082526104c960208301846105a4565b60006060825261066e60608301866105a4565b828103602084015261068081866105a4565b915050826040830152949350505050565b6002810460018216806106a557607f821691505b602082108114156106c657634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fdfea2646970667358221220d1d6c170f4e60d385b2e2bb280ec14226a3c7656d2aa4232b107e6aadb21924464736f6c63430008000033";
