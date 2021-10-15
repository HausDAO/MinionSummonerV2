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
  const minionAddr = '0x5912655276e62d007FF19B5c5Cdadf7A7EEa7115'
  const safeAddr = '0x1EbeAaF3DB2aFd47c1a0B511C845fe2BE8A4cc33'
  const wmaticAddr = '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270'
  const multisendAddr = '0xA238CBeb142c10Ef7Ad8442C6D1f9E89e07e7761'
  
  // const weth9Mainnet = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'

  // const mainnetGnosis = '0xaEca461405DD2892FBa8Bd03eFE6Ab89749D4B39'
  // const gnosisSafe = (await GnosisSafe.attach(mainnetGnosis))
  
  const wmatic = (await Wmatic.attach(wmaticAddr)) as Wmatic
  const multisend = (await MultiSend.attach(multisendAddr)) as MultiSend
  const minion = (await SafeMinion.attach(minionAddr)) as SafeMinion
  
  const wmaticToSend = ethers.utils.parseEther('450')

  const action_1 = wmatic.interface.encodeFunctionData('transfer', [safeAddr, wmaticToSend])
  const action_2 = minion.interface.encodeFunctionData('executeAsMinion', [wmaticAddr, 0, action_1])
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
