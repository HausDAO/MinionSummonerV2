import { ethers } from 'hardhat'
import { GnosisSafe } from '../types/GnosisSafe'
import { MultiSend } from '../types/MultiSend'
import { SafeMinion } from '../types/SafeMinion'
import { SafeMinionSummoner } from '../types/SafeMinionSummoner'
import { SignMessageLib } from '../types/SignMessageLib'
import { CompatibilityFallbackHandler } from '../types/CompatibilityFallbackHandler'
import { MolochSummoner } from '../types/MolochSummoner'
import { AnyErc20 } from '../types/AnyErc20'
import { qualifiedAddresses, values } from './lists2'

async function main() {
  const accounts = await ethers.getSigners()

  console.log(
    'Accounts:',
    accounts.map((a) => a.address)
  )

  // Configuration
  const Moloch = await ethers.getContractFactory('Moloch')
  const MolochSummoner = await ethers.getContractFactory('MolochSummoner')
  const SafeMinion = await ethers.getContractFactory('SafeMinion')
  const SafeMinionSummoner = await ethers.getContractFactory('SafeMinionSummoner')
  const GnosisSafe = await ethers.getContractFactory('GnosisSafe')
  const MultiSend = await ethers.getContractFactory('MultiSend')
  const SignMessageLib = await ethers.getContractFactory('SignMessageLib')
  const AnyERC20 = await ethers.getContractFactory('AnyERC20')
  const CompatibilityFallbackHandler = await ethers.getContractFactory('CompatibilityFallbackHandler')
  console.log('ready for deploy')

  const gnosisSafeSingleton = (await GnosisSafe.deploy()) as GnosisSafe
  const multisend = (await MultiSend.deploy()) as MultiSend
  const signMessageLib = (await SignMessageLib.deploy()) as SignMessageLib
  const handler = (await CompatibilityFallbackHandler.deploy()) as CompatibilityFallbackHandler
  const safeMinionTemplate = (await SafeMinion.deploy()) as SafeMinion
  const molochTemplate = await Moloch.deploy()
  const molochSummoner = (await MolochSummoner.deploy(molochTemplate.address)) as MolochSummoner
  const anyErc20 = (await AnyERC20.deploy()) as AnyErc20

  const safeMinionSummoner = (await SafeMinionSummoner.deploy(
    safeMinionTemplate.address,
    gnosisSafeSingleton.address,
    handler.address,
    multisend.address
  )) as SafeMinionSummoner
  
  const shares = qualifiedAddresses.map((value: string, index: number) => Math.round(values[index] * 100))
  console.log({shares})
  
  // const summon1 = await molochSummoner.summonMoloch([accounts[0].address], [anyErc20.address], 5, 5, 1, 0, 3, 0, [100])

  // Deploy DAO
  console.log({qualifiedAddresses: qualifiedAddresses.length})
  const gas = await molochSummoner.estimateGas.summonMoloch(qualifiedAddresses, [anyErc20.address], 5, 5, 1, 0, 3, 0, shares, {gasLimit: 19000000})
  console.log({gas: gas.toNumber()})
  // const summoned = await molochSummoner.summonMoloch(qualifiedAddresses, [anyErc20.address], 5, 5, 1, 0, 3, 0, shares)
  // const receipt = await ethers.provider.getTransactionReceipt(summoned.hash);
  // let molochSummonAbi = [ "event SummonComplete(address indexed moloch, address[] summoner, address[] tokens, uint256 summoningTime, uint256 periodDuration, uint256 votingPeriodLength, uint256 gracePeriodLength, uint256 proposalDeposit, uint256 dilutionBound, uint256 processingReward, uint256[] summonerShares)" ]
  // let iface = new ethers.utils.Interface(molochSummonAbi);
  // let log = iface.parseLog(receipt.logs[0]);
  // const {moloch} = log.args;
  // console.log({moloch})
  

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
