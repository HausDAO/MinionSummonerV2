/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface ImolochInterface extends ethers.utils.Interface {
  functions: {
    "cancelProposal(uint256)": FunctionFragment;
    "depositToken()": FunctionFragment;
    "getProposalFlags(uint256)": FunctionFragment;
    "members(address)": FunctionFragment;
    "submitProposal(address,uint256,uint256,uint256,address,uint256,address,string)": FunctionFragment;
    "tokenWhitelist(address)": FunctionFragment;
    "userTokenBalances(address,address)": FunctionFragment;
    "withdrawBalance(address,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "cancelProposal",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "depositToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getProposalFlags",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "members", values: [string]): string;
  encodeFunctionData(
    functionFragment: "submitProposal",
    values: [
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      string,
      BigNumberish,
      string,
      string
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenWhitelist",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "userTokenBalances",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawBalance",
    values: [string, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "cancelProposal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "depositToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getProposalFlags",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "members", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "submitProposal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokenWhitelist",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "userTokenBalances",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawBalance",
    data: BytesLike
  ): Result;

  events: {};
}

export class Imoloch extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: ImolochInterface;

  functions: {
    cancelProposal(
      proposalId: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "cancelProposal(uint256)"(
      proposalId: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    depositToken(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    "depositToken()"(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    getProposalFlags(
      proposalId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: [boolean, boolean, boolean, boolean, boolean, boolean];
    }>;

    "getProposalFlags(uint256)"(
      proposalId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: [boolean, boolean, boolean, boolean, boolean, boolean];
    }>;

    members(
      user: string,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
      1: BigNumber;
      2: BigNumber;
      3: boolean;
      4: BigNumber;
      5: BigNumber;
    }>;

    "members(address)"(
      user: string,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
      1: BigNumber;
      2: BigNumber;
      3: boolean;
      4: BigNumber;
      5: BigNumber;
    }>;

    submitProposal(
      applicant: string,
      sharesRequested: BigNumberish,
      lootRequested: BigNumberish,
      tributeOffered: BigNumberish,
      tributeToken: string,
      paymentRequested: BigNumberish,
      paymentToken: string,
      details: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "submitProposal(address,uint256,uint256,uint256,address,uint256,address,string)"(
      applicant: string,
      sharesRequested: BigNumberish,
      lootRequested: BigNumberish,
      tributeOffered: BigNumberish,
      tributeToken: string,
      paymentRequested: BigNumberish,
      paymentToken: string,
      details: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    tokenWhitelist(
      token: string,
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    "tokenWhitelist(address)"(
      token: string,
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    userTokenBalances(
      user: string,
      token: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "userTokenBalances(address,address)"(
      user: string,
      token: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    withdrawBalance(
      token: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "withdrawBalance(address,uint256)"(
      token: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  cancelProposal(
    proposalId: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "cancelProposal(uint256)"(
    proposalId: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  depositToken(overrides?: CallOverrides): Promise<string>;

  "depositToken()"(overrides?: CallOverrides): Promise<string>;

  getProposalFlags(
    proposalId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[boolean, boolean, boolean, boolean, boolean, boolean]>;

  "getProposalFlags(uint256)"(
    proposalId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[boolean, boolean, boolean, boolean, boolean, boolean]>;

  members(
    user: string,
    overrides?: CallOverrides
  ): Promise<{
    0: string;
    1: BigNumber;
    2: BigNumber;
    3: boolean;
    4: BigNumber;
    5: BigNumber;
  }>;

  "members(address)"(
    user: string,
    overrides?: CallOverrides
  ): Promise<{
    0: string;
    1: BigNumber;
    2: BigNumber;
    3: boolean;
    4: BigNumber;
    5: BigNumber;
  }>;

  submitProposal(
    applicant: string,
    sharesRequested: BigNumberish,
    lootRequested: BigNumberish,
    tributeOffered: BigNumberish,
    tributeToken: string,
    paymentRequested: BigNumberish,
    paymentToken: string,
    details: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "submitProposal(address,uint256,uint256,uint256,address,uint256,address,string)"(
    applicant: string,
    sharesRequested: BigNumberish,
    lootRequested: BigNumberish,
    tributeOffered: BigNumberish,
    tributeToken: string,
    paymentRequested: BigNumberish,
    paymentToken: string,
    details: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  tokenWhitelist(token: string, overrides?: CallOverrides): Promise<boolean>;

  "tokenWhitelist(address)"(
    token: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  userTokenBalances(
    user: string,
    token: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "userTokenBalances(address,address)"(
    user: string,
    token: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  withdrawBalance(
    token: string,
    amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "withdrawBalance(address,uint256)"(
    token: string,
    amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    cancelProposal(
      proposalId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "cancelProposal(uint256)"(
      proposalId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    depositToken(overrides?: CallOverrides): Promise<string>;

    "depositToken()"(overrides?: CallOverrides): Promise<string>;

    getProposalFlags(
      proposalId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean, boolean, boolean, boolean, boolean, boolean]>;

    "getProposalFlags(uint256)"(
      proposalId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean, boolean, boolean, boolean, boolean, boolean]>;

    members(
      user: string,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
      1: BigNumber;
      2: BigNumber;
      3: boolean;
      4: BigNumber;
      5: BigNumber;
    }>;

    "members(address)"(
      user: string,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
      1: BigNumber;
      2: BigNumber;
      3: boolean;
      4: BigNumber;
      5: BigNumber;
    }>;

    submitProposal(
      applicant: string,
      sharesRequested: BigNumberish,
      lootRequested: BigNumberish,
      tributeOffered: BigNumberish,
      tributeToken: string,
      paymentRequested: BigNumberish,
      paymentToken: string,
      details: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "submitProposal(address,uint256,uint256,uint256,address,uint256,address,string)"(
      applicant: string,
      sharesRequested: BigNumberish,
      lootRequested: BigNumberish,
      tributeOffered: BigNumberish,
      tributeToken: string,
      paymentRequested: BigNumberish,
      paymentToken: string,
      details: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenWhitelist(token: string, overrides?: CallOverrides): Promise<boolean>;

    "tokenWhitelist(address)"(
      token: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    userTokenBalances(
      user: string,
      token: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "userTokenBalances(address,address)"(
      user: string,
      token: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdrawBalance(
      token: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "withdrawBalance(address,uint256)"(
      token: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    cancelProposal(
      proposalId: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "cancelProposal(uint256)"(
      proposalId: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    depositToken(overrides?: CallOverrides): Promise<BigNumber>;

    "depositToken()"(overrides?: CallOverrides): Promise<BigNumber>;

    getProposalFlags(
      proposalId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getProposalFlags(uint256)"(
      proposalId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    members(user: string, overrides?: CallOverrides): Promise<BigNumber>;

    "members(address)"(
      user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    submitProposal(
      applicant: string,
      sharesRequested: BigNumberish,
      lootRequested: BigNumberish,
      tributeOffered: BigNumberish,
      tributeToken: string,
      paymentRequested: BigNumberish,
      paymentToken: string,
      details: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "submitProposal(address,uint256,uint256,uint256,address,uint256,address,string)"(
      applicant: string,
      sharesRequested: BigNumberish,
      lootRequested: BigNumberish,
      tributeOffered: BigNumberish,
      tributeToken: string,
      paymentRequested: BigNumberish,
      paymentToken: string,
      details: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    tokenWhitelist(
      token: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "tokenWhitelist(address)"(
      token: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    userTokenBalances(
      user: string,
      token: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "userTokenBalances(address,address)"(
      user: string,
      token: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdrawBalance(
      token: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "withdrawBalance(address,uint256)"(
      token: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    cancelProposal(
      proposalId: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "cancelProposal(uint256)"(
      proposalId: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    depositToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "depositToken()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getProposalFlags(
      proposalId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getProposalFlags(uint256)"(
      proposalId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    members(
      user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "members(address)"(
      user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    submitProposal(
      applicant: string,
      sharesRequested: BigNumberish,
      lootRequested: BigNumberish,
      tributeOffered: BigNumberish,
      tributeToken: string,
      paymentRequested: BigNumberish,
      paymentToken: string,
      details: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "submitProposal(address,uint256,uint256,uint256,address,uint256,address,string)"(
      applicant: string,
      sharesRequested: BigNumberish,
      lootRequested: BigNumberish,
      tributeOffered: BigNumberish,
      tributeToken: string,
      paymentRequested: BigNumberish,
      paymentToken: string,
      details: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    tokenWhitelist(
      token: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "tokenWhitelist(address)"(
      token: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    userTokenBalances(
      user: string,
      token: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "userTokenBalances(address,address)"(
      user: string,
      token: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdrawBalance(
      token: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "withdrawBalance(address,uint256)"(
      token: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
