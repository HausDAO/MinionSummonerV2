import { ethers } from 'hardhat'
const { FlashbotsBundleProvider } = require('@flashbots/ethers-provider-bundle')

import { Wallet } from 'ethers'

import { SafeMinion } from '../types/SafeMinion'

import { privatekey } from '../util/util'

async function createSignedBundle(
  nonce: number,
  gasPrice: number,
  proposalId: number,
  transactions: string,
  minion: SafeMinion,
  flashbotsProvider: any,
  admin: Wallet
) {
  const priorityFee = 5000000000
  const maxFee = 200000000000

  const execTransaction = await minion.populateTransaction.executeAction(proposalId, transactions, {
    nonce,
    maxFeePerGas: maxFee,
    maxPriorityFeePerGas: priorityFee,
    type: 2,
  })
  
  execTransaction.chainId = 1

  console.log({ execTransaction })
  const signedTransactions = await flashbotsProvider.signBundle([
    {
      signer: admin,
      transaction: execTransaction,
    },
  ])

  console.log({ signedTransactions })
  return signedTransactions
}

async function broadcastBundle(signedTransactions: any, flashbotsProvider: any, blockNumber: number, numBlocks: number) {
  const simulation = await flashbotsProvider.simulate(signedTransactions, blockNumber + 1)

  console.log({ simulation })
  if ('error' in simulation) {
    console.log(`Simulation Error: ${simulation.error.message}`)
  } else {
    console.log(`Simulation Success: ${blockNumber} ${JSON.stringify(simulation, null, 2)}`)
  }

  for (var i = 1; i <= numBlocks; i++) {
    const bundleSubmission = flashbotsProvider.sendRawBundle(
      signedTransactions,
      blockNumber + i
    );
    console.log("submitted for block # ", blockNumber + i);
    console.log({bundleSubmission})
  }
}

async function main() {
  const walletKey = privatekey()

  const adminAbstract = new ethers.Wallet(walletKey)
  const provider = new ethers.providers.JsonRpcProvider({ url: 'https://mainnet.infura.io/v3/9a8b1c46717d4707bdeef517bf0ee00b'})
  const admin = await adminAbstract.connect(provider)

  const safeMinionAddr = '0x9703c59f921087428c3e51d93d08000bab7b72b2'
  const SafeMinion = await ethers.getContractFactory('SafeMinion', admin)

  const flashbotsProvider = await FlashbotsBundleProvider.create(provider, admin)

  const minion = (await SafeMinion.attach(safeMinionAddr)) as SafeMinion

  const gasPrice = 120000000000 // TODO mainnet gas

  const nonce = 8 // TODO specify nonce

  const proposalId = 0
  const transactions =
    '0x8d80ff0a0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000019200c02aaa39b223fe8d0a0e5c4f27ead9083c756cc200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000044095ea7b30000000000000000000000003c035c3f8e271e12df1bed648024e60249f507c3000000000000000000000000000000000000000000000000a333e9b15e980000003c035c3f8e271e12df1bed648024e60249f507c3000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a48201aa3f000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000000000000000000000000000a333e9b15e980000000000000000000000000000fb5453340c03db5ade474b27e68b6a9c6b2823eb000000000000000000000000000000000000000000000017da3a04c7b3e0000000000000000000000000000000000000000000000000000000620e0dc3cd00000000000000000000000000000000'

  const signedTransactions = await createSignedBundle(nonce, gasPrice, proposalId, transactions, minion, flashbotsProvider, admin)

  console.log({ signedTransactions })

  const blockNumber = await provider.getBlockNumber()

  await broadcastBundle(signedTransactions, flashbotsProvider, blockNumber, 20)

  console.log('bundles submitted')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
