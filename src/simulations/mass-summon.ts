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
import { privatekey } from '../util/util'

async function main() {
  const accounts = await ethers.getSigners()

  console.log(
    'Accounts:',
    accounts.map((a) => a.address)
  )

  // Configuration
  const MolochSummoner = await ethers.getContractFactory('MolochSummoner')
  
  const shares = qualifiedAddresses.map((value: string, index: number) => Math.round(values[index] * 100))
  console.log({shares})
  
  // const molochSummonerRinkeby = '0xC33a4EfecB11D2cAD8E7d8d2a6b5E7FEacCC521d'
  const molochSummonerMainnet = '0x38064F40B20347d58b326E767791A6f79cdEddCe'
  // const rinkebyToken = '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea'
  const wethAddress = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
  const gear = '0x06745bee20ad9cc7dfb6f40b66504397235f547c'
  const robot = '0xfb5453340c03db5ade474b27e68b6a9c6b2823eb'
  
  const molochSummoner = (await MolochSummoner.attach(molochSummonerMainnet)) as MolochSummoner
  
  // const summon1 = await molochSummoner.summonMoloch([accounts[0].address], [anyErc20.address], 5, 5, 1, 0, 3, 0, [100])
  const gasPrice = '42000000000'

  // Deploy DAO
  console.log({qualifiedAddresses: qualifiedAddresses.length, shares: shares.length})
  const tx = await molochSummoner.summonMoloch(qualifiedAddresses, [wethAddress, gear, robot], 60, 2880, 1440, 0, 3, 0, shares, {gasLimit: 19000000, gasPrice})
  // const gas = await molochSummoner.estimateGas.summonMoloch(qualifiedAddresses, [rinkebyToken], 5, 5, 1, 0, 3, 0, shares, {gasLimit: 19000000})
  console.log({tx})
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
