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

interface Erc1271MinionInterface extends ethers.utils.Interface {
  functions: {
    "actions(uint256)": FunctionFragment;
    "cancelAction(uint256)": FunctionFragment;
    "cancelSignature(bytes32)": FunctionFragment;
    "crossWithdraw(address,address,uint256,bool)": FunctionFragment;
    "doWithdraw(address,uint256)": FunctionFragment;
    "executeAction(uint256)": FunctionFragment;
    "init(address)": FunctionFragment;
    "isMember(address)": FunctionFragment;
    "isValidSignature(bytes32,bytes)": FunctionFragment;
    "moloch()": FunctionFragment;
    "molochDepositToken()": FunctionFragment;
    "onERC721Received(address,address,uint256,bytes)": FunctionFragment;
    "proposeAction(address,uint256,bytes,string)": FunctionFragment;
    "proposeSignature(bytes32,bytes32,bytes4,string)": FunctionFragment;
    "signatures(bytes32)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "actions",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "cancelAction",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "cancelSignature",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "crossWithdraw",
    values: [string, string, BigNumberish, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "doWithdraw",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "executeAction",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "init", values: [string]): string;
  encodeFunctionData(functionFragment: "isMember", values: [string]): string;
  encodeFunctionData(
    functionFragment: "isValidSignature",
    values: [BytesLike, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "moloch", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "molochDepositToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "onERC721Received",
    values: [string, string, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "proposeAction",
    values: [string, BigNumberish, BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "proposeSignature",
    values: [BytesLike, BytesLike, BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "signatures",
    values: [BytesLike]
  ): string;

  decodeFunctionResult(functionFragment: "actions", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "cancelAction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "cancelSignature",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "crossWithdraw",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "doWithdraw", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "executeAction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "init", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isMember", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isValidSignature",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "moloch", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "molochDepositToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onERC721Received",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "proposeAction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "proposeSignature",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "signatures", data: BytesLike): Result;

  events: {
    "ActionCanceled(uint256)": EventFragment;
    "CrossWithdraw(address,address,uint256)": EventFragment;
    "DoWithdraw(address,uint256)": EventFragment;
    "ExecuteAction(uint256,address)": EventFragment;
    "ExecuteSignature(uint256,address)": EventFragment;
    "ProposeAction(uint256,address)": EventFragment;
    "ProposeSignature(uint256,bytes32,address)": EventFragment;
    "PulledFunds(address,uint256)": EventFragment;
    "SignatureCanceled(uint256,bytes32)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ActionCanceled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "CrossWithdraw"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DoWithdraw"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ExecuteAction"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ExecuteSignature"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProposeAction"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProposeSignature"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PulledFunds"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SignatureCanceled"): EventFragment;
}

export class Erc1271Minion extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: Erc1271MinionInterface;

  functions: {
    actions(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      value: BigNumber;
      to: string;
      proposer: string;
      executed: boolean;
      data: string;
      0: BigNumber;
      1: string;
      2: string;
      3: boolean;
      4: string;
    }>;

    "actions(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      value: BigNumber;
      to: string;
      proposer: string;
      executed: boolean;
      data: string;
      0: BigNumber;
      1: string;
      2: string;
      3: boolean;
      4: string;
    }>;

    cancelAction(
      _proposalId: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "cancelAction(uint256)"(
      _proposalId: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    cancelSignature(
      msgHash: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "cancelSignature(bytes32)"(
      msgHash: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    crossWithdraw(
      target: string,
      token: string,
      amount: BigNumberish,
      transfer: boolean,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "crossWithdraw(address,address,uint256,bool)"(
      target: string,
      token: string,
      amount: BigNumberish,
      transfer: boolean,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    doWithdraw(
      token: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "doWithdraw(address,uint256)"(
      token: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    executeAction(
      proposalId: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "executeAction(uint256)"(
      proposalId: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    init(_moloch: string, overrides?: Overrides): Promise<ContractTransaction>;

    "init(address)"(
      _moloch: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    isMember(
      user: string,
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    "isMember(address)"(
      user: string,
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    isValidSignature(
      permissionHash: BytesLike,
      signature: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "isValidSignature(bytes32,bytes)"(
      permissionHash: BytesLike,
      signature: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    moloch(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    "moloch()"(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    molochDepositToken(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    "molochDepositToken()"(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "onERC721Received(address,address,uint256,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    proposeAction(
      actionTo: string,
      actionValue: BigNumberish,
      actionData: BytesLike,
      details: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "proposeAction(address,uint256,bytes,string)"(
      actionTo: string,
      actionValue: BigNumberish,
      actionData: BytesLike,
      details: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    proposeSignature(
      msgHash: BytesLike,
      signatureHash: BytesLike,
      magicValue: BytesLike,
      details: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "proposeSignature(bytes32,bytes32,bytes4,string)"(
      msgHash: BytesLike,
      signatureHash: BytesLike,
      magicValue: BytesLike,
      details: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    signatures(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      signatureHash: string;
      magicValue: string;
      proposalId: BigNumber;
      proposer: string;
      0: string;
      1: string;
      2: BigNumber;
      3: string;
    }>;

    "signatures(bytes32)"(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      signatureHash: string;
      magicValue: string;
      proposalId: BigNumber;
      proposer: string;
      0: string;
      1: string;
      2: BigNumber;
      3: string;
    }>;
  };

  actions(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<{
    value: BigNumber;
    to: string;
    proposer: string;
    executed: boolean;
    data: string;
    0: BigNumber;
    1: string;
    2: string;
    3: boolean;
    4: string;
  }>;

  "actions(uint256)"(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<{
    value: BigNumber;
    to: string;
    proposer: string;
    executed: boolean;
    data: string;
    0: BigNumber;
    1: string;
    2: string;
    3: boolean;
    4: string;
  }>;

  cancelAction(
    _proposalId: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "cancelAction(uint256)"(
    _proposalId: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  cancelSignature(
    msgHash: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "cancelSignature(bytes32)"(
    msgHash: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  crossWithdraw(
    target: string,
    token: string,
    amount: BigNumberish,
    transfer: boolean,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "crossWithdraw(address,address,uint256,bool)"(
    target: string,
    token: string,
    amount: BigNumberish,
    transfer: boolean,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  doWithdraw(
    token: string,
    amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "doWithdraw(address,uint256)"(
    token: string,
    amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  executeAction(
    proposalId: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "executeAction(uint256)"(
    proposalId: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  init(_moloch: string, overrides?: Overrides): Promise<ContractTransaction>;

  "init(address)"(
    _moloch: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  isMember(user: string, overrides?: CallOverrides): Promise<boolean>;

  "isMember(address)"(
    user: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isValidSignature(
    permissionHash: BytesLike,
    signature: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  "isValidSignature(bytes32,bytes)"(
    permissionHash: BytesLike,
    signature: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  moloch(overrides?: CallOverrides): Promise<string>;

  "moloch()"(overrides?: CallOverrides): Promise<string>;

  molochDepositToken(overrides?: CallOverrides): Promise<string>;

  "molochDepositToken()"(overrides?: CallOverrides): Promise<string>;

  onERC721Received(
    arg0: string,
    arg1: string,
    arg2: BigNumberish,
    arg3: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  "onERC721Received(address,address,uint256,bytes)"(
    arg0: string,
    arg1: string,
    arg2: BigNumberish,
    arg3: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  proposeAction(
    actionTo: string,
    actionValue: BigNumberish,
    actionData: BytesLike,
    details: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "proposeAction(address,uint256,bytes,string)"(
    actionTo: string,
    actionValue: BigNumberish,
    actionData: BytesLike,
    details: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  proposeSignature(
    msgHash: BytesLike,
    signatureHash: BytesLike,
    magicValue: BytesLike,
    details: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "proposeSignature(bytes32,bytes32,bytes4,string)"(
    msgHash: BytesLike,
    signatureHash: BytesLike,
    magicValue: BytesLike,
    details: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  signatures(
    arg0: BytesLike,
    overrides?: CallOverrides
  ): Promise<{
    signatureHash: string;
    magicValue: string;
    proposalId: BigNumber;
    proposer: string;
    0: string;
    1: string;
    2: BigNumber;
    3: string;
  }>;

  "signatures(bytes32)"(
    arg0: BytesLike,
    overrides?: CallOverrides
  ): Promise<{
    signatureHash: string;
    magicValue: string;
    proposalId: BigNumber;
    proposer: string;
    0: string;
    1: string;
    2: BigNumber;
    3: string;
  }>;

  callStatic: {
    actions(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      value: BigNumber;
      to: string;
      proposer: string;
      executed: boolean;
      data: string;
      0: BigNumber;
      1: string;
      2: string;
      3: boolean;
      4: string;
    }>;

    "actions(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      value: BigNumber;
      to: string;
      proposer: string;
      executed: boolean;
      data: string;
      0: BigNumber;
      1: string;
      2: string;
      3: boolean;
      4: string;
    }>;

    cancelAction(
      _proposalId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "cancelAction(uint256)"(
      _proposalId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    cancelSignature(
      msgHash: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    "cancelSignature(bytes32)"(
      msgHash: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    crossWithdraw(
      target: string,
      token: string,
      amount: BigNumberish,
      transfer: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    "crossWithdraw(address,address,uint256,bool)"(
      target: string,
      token: string,
      amount: BigNumberish,
      transfer: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    doWithdraw(
      token: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "doWithdraw(address,uint256)"(
      token: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    executeAction(
      proposalId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    "executeAction(uint256)"(
      proposalId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    init(_moloch: string, overrides?: CallOverrides): Promise<void>;

    "init(address)"(_moloch: string, overrides?: CallOverrides): Promise<void>;

    isMember(user: string, overrides?: CallOverrides): Promise<boolean>;

    "isMember(address)"(
      user: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isValidSignature(
      permissionHash: BytesLike,
      signature: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    "isValidSignature(bytes32,bytes)"(
      permissionHash: BytesLike,
      signature: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    moloch(overrides?: CallOverrides): Promise<string>;

    "moloch()"(overrides?: CallOverrides): Promise<string>;

    molochDepositToken(overrides?: CallOverrides): Promise<string>;

    "molochDepositToken()"(overrides?: CallOverrides): Promise<string>;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    "onERC721Received(address,address,uint256,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    proposeAction(
      actionTo: string,
      actionValue: BigNumberish,
      actionData: BytesLike,
      details: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "proposeAction(address,uint256,bytes,string)"(
      actionTo: string,
      actionValue: BigNumberish,
      actionData: BytesLike,
      details: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    proposeSignature(
      msgHash: BytesLike,
      signatureHash: BytesLike,
      magicValue: BytesLike,
      details: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "proposeSignature(bytes32,bytes32,bytes4,string)"(
      msgHash: BytesLike,
      signatureHash: BytesLike,
      magicValue: BytesLike,
      details: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    signatures(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      signatureHash: string;
      magicValue: string;
      proposalId: BigNumber;
      proposer: string;
      0: string;
      1: string;
      2: BigNumber;
      3: string;
    }>;

    "signatures(bytes32)"(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      signatureHash: string;
      magicValue: string;
      proposalId: BigNumber;
      proposer: string;
      0: string;
      1: string;
      2: BigNumber;
      3: string;
    }>;
  };

  filters: {
    ActionCanceled(proposalId: null): EventFilter;

    CrossWithdraw(target: null, token: null, amount: null): EventFilter;

    DoWithdraw(token: null, amount: null): EventFilter;

    ExecuteAction(proposalId: null, executor: null): EventFilter;

    ExecuteSignature(proposalId: null, executor: null): EventFilter;

    ProposeAction(proposalId: null, proposer: null): EventFilter;

    ProposeSignature(
      proposalId: null,
      msgHash: null,
      proposer: null
    ): EventFilter;

    PulledFunds(moloch: null, amount: null): EventFilter;

    SignatureCanceled(proposalId: null, msgHash: null): EventFilter;
  };

  estimateGas: {
    actions(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    "actions(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    cancelAction(
      _proposalId: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "cancelAction(uint256)"(
      _proposalId: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    cancelSignature(
      msgHash: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "cancelSignature(bytes32)"(
      msgHash: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    crossWithdraw(
      target: string,
      token: string,
      amount: BigNumberish,
      transfer: boolean,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "crossWithdraw(address,address,uint256,bool)"(
      target: string,
      token: string,
      amount: BigNumberish,
      transfer: boolean,
      overrides?: Overrides
    ): Promise<BigNumber>;

    doWithdraw(
      token: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "doWithdraw(address,uint256)"(
      token: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    executeAction(
      proposalId: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "executeAction(uint256)"(
      proposalId: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    init(_moloch: string, overrides?: Overrides): Promise<BigNumber>;

    "init(address)"(_moloch: string, overrides?: Overrides): Promise<BigNumber>;

    isMember(user: string, overrides?: CallOverrides): Promise<BigNumber>;

    "isMember(address)"(
      user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isValidSignature(
      permissionHash: BytesLike,
      signature: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "isValidSignature(bytes32,bytes)"(
      permissionHash: BytesLike,
      signature: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    moloch(overrides?: CallOverrides): Promise<BigNumber>;

    "moloch()"(overrides?: CallOverrides): Promise<BigNumber>;

    molochDepositToken(overrides?: CallOverrides): Promise<BigNumber>;

    "molochDepositToken()"(overrides?: CallOverrides): Promise<BigNumber>;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "onERC721Received(address,address,uint256,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    proposeAction(
      actionTo: string,
      actionValue: BigNumberish,
      actionData: BytesLike,
      details: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "proposeAction(address,uint256,bytes,string)"(
      actionTo: string,
      actionValue: BigNumberish,
      actionData: BytesLike,
      details: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    proposeSignature(
      msgHash: BytesLike,
      signatureHash: BytesLike,
      magicValue: BytesLike,
      details: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "proposeSignature(bytes32,bytes32,bytes4,string)"(
      msgHash: BytesLike,
      signatureHash: BytesLike,
      magicValue: BytesLike,
      details: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    signatures(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    "signatures(bytes32)"(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    actions(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "actions(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    cancelAction(
      _proposalId: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "cancelAction(uint256)"(
      _proposalId: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    cancelSignature(
      msgHash: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "cancelSignature(bytes32)"(
      msgHash: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    crossWithdraw(
      target: string,
      token: string,
      amount: BigNumberish,
      transfer: boolean,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "crossWithdraw(address,address,uint256,bool)"(
      target: string,
      token: string,
      amount: BigNumberish,
      transfer: boolean,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    doWithdraw(
      token: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "doWithdraw(address,uint256)"(
      token: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    executeAction(
      proposalId: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "executeAction(uint256)"(
      proposalId: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    init(_moloch: string, overrides?: Overrides): Promise<PopulatedTransaction>;

    "init(address)"(
      _moloch: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    isMember(
      user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "isMember(address)"(
      user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isValidSignature(
      permissionHash: BytesLike,
      signature: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "isValidSignature(bytes32,bytes)"(
      permissionHash: BytesLike,
      signature: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    moloch(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "moloch()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    molochDepositToken(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "molochDepositToken()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "onERC721Received(address,address,uint256,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    proposeAction(
      actionTo: string,
      actionValue: BigNumberish,
      actionData: BytesLike,
      details: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "proposeAction(address,uint256,bytes,string)"(
      actionTo: string,
      actionValue: BigNumberish,
      actionData: BytesLike,
      details: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    proposeSignature(
      msgHash: BytesLike,
      signatureHash: BytesLike,
      magicValue: BytesLike,
      details: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "proposeSignature(bytes32,bytes32,bytes4,string)"(
      msgHash: BytesLike,
      signatureHash: BytesLike,
      magicValue: BytesLike,
      details: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    signatures(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "signatures(bytes32)"(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}