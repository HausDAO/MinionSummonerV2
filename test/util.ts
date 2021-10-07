import { BigNumber } from '@ethersproject/bignumber'
import { encodeMultiSend, MetaTransaction } from '@gnosis.pm/safe-contracts'
import { ethers } from 'hardhat'
import { Moloch } from '../src/types/Moloch'
import { MultiSend } from '../src/types/MultiSend'

export const fastForwardTime = async (seconds: number) => {
  await ethers.provider.send('evm_increaseTime', [seconds])
  await ethers.provider.send('evm_mine', [])
}

export const fastForwardBlocks = async (blocks: number) => {
  for (let index = 0; index < blocks; index++) {
    await ethers.provider.send('evm_mine', [])
  }
}

export const doProposal = async (pass: boolean, proposalId: number, moloch: Moloch) => {
  await fastForwardBlocks(1)
  await moloch.sponsorProposal(proposalId)

  await fastForwardBlocks(5)
  await moloch.submitVote(proposalId, pass ? 1 : 2)

  await fastForwardBlocks(31)

  await moloch.processProposal(proposalId)
}

export const encodeMultiAction = (multisend: MultiSend, actions: string[], tos: string[], values: BigNumber[], operations: number[]) => {
  let metatransactions: MetaTransaction[] = []
  for (let index = 0; index < actions.length; index++) {
    metatransactions.push({
      to: tos[index],
      value: values[index],
      data: actions[index],
      operation: operations[index],
    })
  }
  const encodedMetatransactions = encodeMultiSend(metatransactions)
  const multi_action = multisend.interface.encodeFunctionData('multiSend', [encodedMetatransactions])
  return multi_action
}

export const decodeMultiAction = (multisend: MultiSend, encoded: string) => {
  const OPERATION_TYPE = 2
  const ADDRESS = 40
  const VALUE = 64
  const DATA_LENGTH = 64

  const actions = multisend.interface.decodeFunctionData('multiSend', encoded)
  let transactionsEncoded = (actions[0] as string).slice(2)

  const transactions: MetaTransaction[] = []

  while (transactionsEncoded.length >= OPERATION_TYPE + ADDRESS + VALUE + DATA_LENGTH) {
    const thisTxLengthHex = transactionsEncoded.slice(OPERATION_TYPE + ADDRESS + VALUE, OPERATION_TYPE + ADDRESS + VALUE + DATA_LENGTH)
    const thisTxLength = BigNumber.from('0x' + thisTxLengthHex).toNumber()
    transactions.push({
      to: '0x' + transactionsEncoded.slice(2, OPERATION_TYPE + ADDRESS),
      value: '0x' + transactionsEncoded.slice(OPERATION_TYPE + ADDRESS, OPERATION_TYPE + ADDRESS + VALUE),
      data:
        '0x' +
        transactionsEncoded.slice(OPERATION_TYPE + ADDRESS + VALUE + DATA_LENGTH, OPERATION_TYPE + ADDRESS + VALUE + DATA_LENGTH + thisTxLength * 2),
      operation: parseInt(transactionsEncoded.slice(0, 2)),
    })
    transactionsEncoded = transactionsEncoded.slice(OPERATION_TYPE + ADDRESS + VALUE + DATA_LENGTH + thisTxLength * 2)
  }

  return transactions
}

// 00
// a513e6e4b8f2a923d98304ec87f64353c4d5c853
// 0000000000000000000000000000000000000000000000000000000000000000
// 0000000000000000000000000000000000000000000000000000000000000044
// a9059cbb00000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c8000000000000000000000000000000000000000000000000000000000000000a
// a9059cbb00000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c80000000000000000000000000000000000000000000000000000000000000
// a9059cbb00000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c8000000000000000000000000000000000000000000000000000000000000
// 0xa9059cbb00000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c80000000000000000000000000000000000000000000000000000000000000014
