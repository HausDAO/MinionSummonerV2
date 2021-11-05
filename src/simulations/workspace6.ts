import { ethers } from 'hardhat'
import { GnosisSafe } from '../types/GnosisSafe'
import { MultiSend } from '../types/MultiSend'
import { ExchangeProxy } from '../types/ExchangeProxy'
import { BPool } from '../types/BPool'
import { SafeMinion } from '../types/SafeMinion'
import { SafeMinionSummoner } from '../types/SafeMinionSummoner'
import { SignMessageLib } from '../types/SignMessageLib'
import { CompatibilityFallbackHandler } from '../types/CompatibilityFallbackHandler'
import { MolochSummoner } from '../types/MolochSummoner'
import { AnyErc20 } from '../types/AnyErc20'
import { Wmatic} from '../types/Wmatic'
import { qualifiedAddresses, values } from './lists'
import { decodeMultiAction, encodeMultiAction} from '../../test/util'
import { BigNumber } from '@ethersproject/bignumber'

async function main() {
  const accounts = await ethers.getSigners()

  console.log(
    'Accounts:',
    accounts.map((a) => a.address)
  )

  // Configuration
  const MultiSend = await ethers.getContractFactory('MultiSend')
  const Wmatic = await ethers.getContractFactory('WMATIC')
  const SafeMinion = await ethers.getContractFactory('SafeMinion')
  console.log('ready for deploy')

  // const gnosisSafeSingleton = (await GnosisSafe.deploy()) as GnosisSafe
  // const signMessageLib = (await SignMessageLib.deploy()) as SignMessageLib
  // const handler = (await CompatibilityFallbackHandler.deploy()) as CompatibilityFallbackHandler
  // const safeMinionTemplate = (await SafeMinion.deploy()) as SafeMinion
  // const molochTemplate = await Moloch.deploy()
  // const molochSummoner = (await MolochSummoner.deploy(molochTemplate.address)) as MolochSummoner
  // const anyErc20 = (await AnyERC20.deploy()) as AnyErc20
  const minionAddr = '0xde1eaae681eed5f9b4541f3eda5d0326f9935707'
  const safeAddr = '0xf1d1165b922fecb1227e5dfb46b4a19015972f62'
  const atokenAddr = '0x9706bef12541e72fce21c487bbe96e540ea5dd65'
  const multisendAddr = '0xa238cbeb142c10ef7ad8442c6d1f9e89e07e7761'
  
  // const weth9Mainnet = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'

  // const mainnetGnosis = '0xaEca461405DD2892FBa8Bd03eFE6Ab89749D4B39'
  // const gnosisSafe = (await GnosisSafe.attach(mainnetGnosis))
  
  const atoken = (await Wmatic.attach(atokenAddr)) as Wmatic
  const multisend = (await MultiSend.attach(multisendAddr)) as MultiSend
  const minion = (await SafeMinion.attach(minionAddr)) as SafeMinion
  

  const action_1 = atoken.interface.encodeFunctionData('transferOwnership', [safeAddr])
  const action_2 = minion.interface.encodeFunctionData('executeAsMinion', [atokenAddr, 0, action_1])
  console.log({action_1})
  console.log({action_2})
  const multi_action = encodeMultiAction(multisend, [action_2], [minionAddr], [BigNumber.from(0)], [0, 0])
  
  console.log({multi_action})
  
  const decoded = decodeMultiAction(multisend, multi_action)
  console.log({decoded})
  

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
