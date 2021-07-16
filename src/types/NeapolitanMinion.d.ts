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

interface NeapolitanMinionInterface extends ethers.utils.Interface {
  functions: {
    "actions(uint256)": FunctionFragment;
    "cancelAction(uint256)": FunctionFragment;
    "changeOwner(address)": FunctionFragment;
    "crossWithdraw(address,address,uint256,bool)": FunctionFragment;
    "doWithdraw(address,uint256)": FunctionFragment;
    "executeAction(uint256,address[],uint256[],bytes[])": FunctionFragment;
    "hashOperation(address[],uint256[],bytes[])": FunctionFragment;
    "init(address,uint256)": FunctionFragment;
    "isMember(address)": FunctionFragment;
    "minQuorum()": FunctionFragment;
    "moloch()": FunctionFragment;
    "molochDepositToken()": FunctionFragment;
    "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)": FunctionFragment;
    "onERC1155Received(address,address,uint256,uint256,bytes)": FunctionFragment;
    "onERC721Received(address,address,uint256,bytes)": FunctionFragment;
    "proposeAction(address[],uint256[],bytes[],address,uint256,string)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "actions",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "cancelAction",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "changeOwner", values: [string]): string;
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
    values: [BigNumberish, string[], BigNumberish[], BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "hashOperation",
    values: [string[], BigNumberish[], BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "init",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "isMember", values: [string]): string;
  encodeFunctionData(functionFragment: "minQuorum", values?: undefined): string;
  encodeFunctionData(functionFragment: "moloch", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "molochDepositToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "onERC1155BatchReceived",
    values: [string, string, BigNumberish[], BigNumberish[], BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "onERC1155Received",
    values: [string, string, BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "onERC721Received",
    values: [string, string, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "proposeAction",
    values: [
      string[],
      BigNumberish[],
      BytesLike[],
      string,
      BigNumberish,
      string
    ]
  ): string;

  decodeFunctionResult(functionFragment: "actions", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "cancelAction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "changeOwner",
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
  decodeFunctionResult(
    functionFragment: "hashOperation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "init", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isMember", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "minQuorum", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "moloch", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "molochDepositToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onERC1155BatchReceived",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onERC1155Received",
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

  events: {
    "ActionCanceled(uint256)": EventFragment;
    "CrossWithdraw(address,address,uint256)": EventFragment;
    "DoWithdraw(address,uint256)": EventFragment;
    "ExecuteAction(bytes32,uint256,uint256,address,uint256,bytes,address)": EventFragment;
    "ProposeAction(bytes32,uint256,uint256,address,uint256,bytes)": EventFragment;
    "PulledFunds(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ActionCanceled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "CrossWithdraw"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DoWithdraw"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ExecuteAction"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProposeAction"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PulledFunds"): EventFragment;
}

export class NeapolitanMinion extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: NeapolitanMinionInterface;

  functions: {
    actions(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      id: string;
      proposer: string;
      executed: boolean;
      token: string;
      amount: BigNumber;
      0: string;
      1: string;
      2: boolean;
      3: string;
      4: BigNumber;
    }>;

    "actions(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      id: string;
      proposer: string;
      executed: boolean;
      token: string;
      amount: BigNumber;
      0: string;
      1: string;
      2: boolean;
      3: string;
      4: BigNumber;
    }>;

    cancelAction(
      _proposalId: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "cancelAction(uint256)"(
      _proposalId: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    changeOwner(
      _moloch: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "changeOwner(address)"(
      _moloch: string,
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
      actionTos: string[],
      actionValues: BigNumberish[],
      actionDatas: BytesLike[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "executeAction(uint256,address[],uint256[],bytes[])"(
      proposalId: BigNumberish,
      actionTos: string[],
      actionValues: BigNumberish[],
      actionDatas: BytesLike[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    hashOperation(
      targets: string[],
      values: BigNumberish[],
      datas: BytesLike[],
      overrides?: CallOverrides
    ): Promise<{
      hash: string;
      0: string;
    }>;

    "hashOperation(address[],uint256[],bytes[])"(
      targets: string[],
      values: BigNumberish[],
      datas: BytesLike[],
      overrides?: CallOverrides
    ): Promise<{
      hash: string;
      0: string;
    }>;

    init(
      _moloch: string,
      _minQuorum: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "init(address,uint256)"(
      _moloch: string,
      _minQuorum: BigNumberish,
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

    minQuorum(overrides?: CallOverrides): Promise<{
      0: BigNumber;
    }>;

    "minQuorum()"(overrides?: CallOverrides): Promise<{
      0: BigNumber;
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

    onERC1155BatchReceived(
      arg0: string,
      arg1: string,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"(
      arg0: string,
      arg1: string,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    onERC1155Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "onERC1155Received(address,address,uint256,uint256,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
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
      actionTos: string[],
      actionValues: BigNumberish[],
      actionDatas: BytesLike[],
      withdrawToken: string,
      withdrawAmount: BigNumberish,
      details: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "proposeAction(address[],uint256[],bytes[],address,uint256,string)"(
      actionTos: string[],
      actionValues: BigNumberish[],
      actionDatas: BytesLike[],
      withdrawToken: string,
      withdrawAmount: BigNumberish,
      details: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  actions(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<{
    id: string;
    proposer: string;
    executed: boolean;
    token: string;
    amount: BigNumber;
    0: string;
    1: string;
    2: boolean;
    3: string;
    4: BigNumber;
  }>;

  "actions(uint256)"(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<{
    id: string;
    proposer: string;
    executed: boolean;
    token: string;
    amount: BigNumber;
    0: string;
    1: string;
    2: boolean;
    3: string;
    4: BigNumber;
  }>;

  cancelAction(
    _proposalId: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "cancelAction(uint256)"(
    _proposalId: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  changeOwner(
    _moloch: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "changeOwner(address)"(
    _moloch: string,
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
    actionTos: string[],
    actionValues: BigNumberish[],
    actionDatas: BytesLike[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "executeAction(uint256,address[],uint256[],bytes[])"(
    proposalId: BigNumberish,
    actionTos: string[],
    actionValues: BigNumberish[],
    actionDatas: BytesLike[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  hashOperation(
    targets: string[],
    values: BigNumberish[],
    datas: BytesLike[],
    overrides?: CallOverrides
  ): Promise<string>;

  "hashOperation(address[],uint256[],bytes[])"(
    targets: string[],
    values: BigNumberish[],
    datas: BytesLike[],
    overrides?: CallOverrides
  ): Promise<string>;

  init(
    _moloch: string,
    _minQuorum: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "init(address,uint256)"(
    _moloch: string,
    _minQuorum: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  isMember(user: string, overrides?: CallOverrides): Promise<boolean>;

  "isMember(address)"(
    user: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  minQuorum(overrides?: CallOverrides): Promise<BigNumber>;

  "minQuorum()"(overrides?: CallOverrides): Promise<BigNumber>;

  moloch(overrides?: CallOverrides): Promise<string>;

  "moloch()"(overrides?: CallOverrides): Promise<string>;

  molochDepositToken(overrides?: CallOverrides): Promise<string>;

  "molochDepositToken()"(overrides?: CallOverrides): Promise<string>;

  onERC1155BatchReceived(
    arg0: string,
    arg1: string,
    arg2: BigNumberish[],
    arg3: BigNumberish[],
    arg4: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"(
    arg0: string,
    arg1: string,
    arg2: BigNumberish[],
    arg3: BigNumberish[],
    arg4: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  onERC1155Received(
    arg0: string,
    arg1: string,
    arg2: BigNumberish,
    arg3: BigNumberish,
    arg4: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

  "onERC1155Received(address,address,uint256,uint256,bytes)"(
    arg0: string,
    arg1: string,
    arg2: BigNumberish,
    arg3: BigNumberish,
    arg4: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>;

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
    actionTos: string[],
    actionValues: BigNumberish[],
    actionDatas: BytesLike[],
    withdrawToken: string,
    withdrawAmount: BigNumberish,
    details: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "proposeAction(address[],uint256[],bytes[],address,uint256,string)"(
    actionTos: string[],
    actionValues: BigNumberish[],
    actionDatas: BytesLike[],
    withdrawToken: string,
    withdrawAmount: BigNumberish,
    details: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    actions(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      id: string;
      proposer: string;
      executed: boolean;
      token: string;
      amount: BigNumber;
      0: string;
      1: string;
      2: boolean;
      3: string;
      4: BigNumber;
    }>;

    "actions(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      id: string;
      proposer: string;
      executed: boolean;
      token: string;
      amount: BigNumber;
      0: string;
      1: string;
      2: boolean;
      3: string;
      4: BigNumber;
    }>;

    cancelAction(
      _proposalId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "cancelAction(uint256)"(
      _proposalId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    changeOwner(_moloch: string, overrides?: CallOverrides): Promise<boolean>;

    "changeOwner(address)"(
      _moloch: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

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
      actionTos: string[],
      actionValues: BigNumberish[],
      actionDatas: BytesLike[],
      overrides?: CallOverrides
    ): Promise<boolean>;

    "executeAction(uint256,address[],uint256[],bytes[])"(
      proposalId: BigNumberish,
      actionTos: string[],
      actionValues: BigNumberish[],
      actionDatas: BytesLike[],
      overrides?: CallOverrides
    ): Promise<boolean>;

    hashOperation(
      targets: string[],
      values: BigNumberish[],
      datas: BytesLike[],
      overrides?: CallOverrides
    ): Promise<string>;

    "hashOperation(address[],uint256[],bytes[])"(
      targets: string[],
      values: BigNumberish[],
      datas: BytesLike[],
      overrides?: CallOverrides
    ): Promise<string>;

    init(
      _moloch: string,
      _minQuorum: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "init(address,uint256)"(
      _moloch: string,
      _minQuorum: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    isMember(user: string, overrides?: CallOverrides): Promise<boolean>;

    "isMember(address)"(
      user: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    minQuorum(overrides?: CallOverrides): Promise<BigNumber>;

    "minQuorum()"(overrides?: CallOverrides): Promise<BigNumber>;

    moloch(overrides?: CallOverrides): Promise<string>;

    "moloch()"(overrides?: CallOverrides): Promise<string>;

    molochDepositToken(overrides?: CallOverrides): Promise<string>;

    "molochDepositToken()"(overrides?: CallOverrides): Promise<string>;

    onERC1155BatchReceived(
      arg0: string,
      arg1: string,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"(
      arg0: string,
      arg1: string,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    onERC1155Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    "onERC1155Received(address,address,uint256,uint256,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

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
      actionTos: string[],
      actionValues: BigNumberish[],
      actionDatas: BytesLike[],
      withdrawToken: string,
      withdrawAmount: BigNumberish,
      details: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "proposeAction(address[],uint256[],bytes[],address,uint256,string)"(
      actionTos: string[],
      actionValues: BigNumberish[],
      actionDatas: BytesLike[],
      withdrawToken: string,
      withdrawAmount: BigNumberish,
      details: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {
    ActionCanceled(proposalId: null): EventFilter;

    CrossWithdraw(target: null, token: null, amount: null): EventFilter;

    DoWithdraw(token: null, amount: null): EventFilter;

    ExecuteAction(
      id: BytesLike | null,
      proposalId: BigNumberish | null,
      index: null,
      targets: null,
      values: null,
      datas: null,
      executor: null
    ): EventFilter;

    ProposeAction(
      id: BytesLike | null,
      proposalId: BigNumberish | null,
      index: null,
      targets: null,
      values: null,
      datas: null
    ): EventFilter;

    PulledFunds(moloch: null, amount: null): EventFilter;
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

    changeOwner(_moloch: string, overrides?: Overrides): Promise<BigNumber>;

    "changeOwner(address)"(
      _moloch: string,
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
      actionTos: string[],
      actionValues: BigNumberish[],
      actionDatas: BytesLike[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    "executeAction(uint256,address[],uint256[],bytes[])"(
      proposalId: BigNumberish,
      actionTos: string[],
      actionValues: BigNumberish[],
      actionDatas: BytesLike[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    hashOperation(
      targets: string[],
      values: BigNumberish[],
      datas: BytesLike[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "hashOperation(address[],uint256[],bytes[])"(
      targets: string[],
      values: BigNumberish[],
      datas: BytesLike[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    init(
      _moloch: string,
      _minQuorum: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "init(address,uint256)"(
      _moloch: string,
      _minQuorum: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    isMember(user: string, overrides?: CallOverrides): Promise<BigNumber>;

    "isMember(address)"(
      user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    minQuorum(overrides?: CallOverrides): Promise<BigNumber>;

    "minQuorum()"(overrides?: CallOverrides): Promise<BigNumber>;

    moloch(overrides?: CallOverrides): Promise<BigNumber>;

    "moloch()"(overrides?: CallOverrides): Promise<BigNumber>;

    molochDepositToken(overrides?: CallOverrides): Promise<BigNumber>;

    "molochDepositToken()"(overrides?: CallOverrides): Promise<BigNumber>;

    onERC1155BatchReceived(
      arg0: string,
      arg1: string,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"(
      arg0: string,
      arg1: string,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    onERC1155Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "onERC1155Received(address,address,uint256,uint256,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

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
      actionTos: string[],
      actionValues: BigNumberish[],
      actionDatas: BytesLike[],
      withdrawToken: string,
      withdrawAmount: BigNumberish,
      details: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "proposeAction(address[],uint256[],bytes[],address,uint256,string)"(
      actionTos: string[],
      actionValues: BigNumberish[],
      actionDatas: BytesLike[],
      withdrawToken: string,
      withdrawAmount: BigNumberish,
      details: string,
      overrides?: Overrides
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

    changeOwner(
      _moloch: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "changeOwner(address)"(
      _moloch: string,
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
      actionTos: string[],
      actionValues: BigNumberish[],
      actionDatas: BytesLike[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "executeAction(uint256,address[],uint256[],bytes[])"(
      proposalId: BigNumberish,
      actionTos: string[],
      actionValues: BigNumberish[],
      actionDatas: BytesLike[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    hashOperation(
      targets: string[],
      values: BigNumberish[],
      datas: BytesLike[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "hashOperation(address[],uint256[],bytes[])"(
      targets: string[],
      values: BigNumberish[],
      datas: BytesLike[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    init(
      _moloch: string,
      _minQuorum: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "init(address,uint256)"(
      _moloch: string,
      _minQuorum: BigNumberish,
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

    minQuorum(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "minQuorum()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    moloch(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "moloch()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    molochDepositToken(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "molochDepositToken()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    onERC1155BatchReceived(
      arg0: string,
      arg1: string,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"(
      arg0: string,
      arg1: string,
      arg2: BigNumberish[],
      arg3: BigNumberish[],
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    onERC1155Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "onERC1155Received(address,address,uint256,uint256,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      arg4: BytesLike,
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
      actionTos: string[],
      actionValues: BigNumberish[],
      actionDatas: BytesLike[],
      withdrawToken: string,
      withdrawAmount: BigNumberish,
      details: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "proposeAction(address[],uint256[],bytes[],address,uint256,string)"(
      actionTos: string[],
      actionValues: BigNumberish[],
      actionDatas: BytesLike[],
      withdrawToken: string,
      withdrawAmount: BigNumberish,
      details: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
