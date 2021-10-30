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
import { TheBunnyGang} from '../types/TheBunnyGang'
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
  const TheBunnyGang = await ethers.getContractFactory('TheBunnyGang')
  const SafeMinion = await ethers.getContractFactory('SafeMinion')
  console.log('ready for deploy')

  // const gnosisSafeSingleton = (await GnosisSafe.deploy()) as GnosisSafe
  // const signMessageLib = (await SignMessageLib.deploy()) as SignMessageLib
  // const handler = (await CompatibilityFallbackHandler.deploy()) as CompatibilityFallbackHandler
  // const safeMinionTemplate = (await SafeMinion.deploy()) as SafeMinion
  // const molochTemplate = await Moloch.deploy()
  // const molochSummoner = (await MolochSummoner.deploy(molochTemplate.address)) as MolochSummoner
  // const anyErc20 = (await AnyERC20.deploy()) as AnyErc20
  const minionAddr = '0xed3a5ff7a813faf5976891e2f91da078c3bca20f'
  const safeAddr = '0xc7ed1a1e82c302f4b9e5e921073571a2dba1e01b'
  const multisendAddr = '0xA238CBeb142c10Ef7Ad8442C6D1f9E89e07e7761'
  const wethaddr = '0x82af49447d8a07e3bd95bd0d56f35241523fbab1'
  
  const bunnyAddr = '0x091db4502cbd66492d3e509403bb7ac721ac9f84'
  
  // const weth9Mainnet = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'

  // const mainnetGnosis = '0xaEca461405DD2892FBa8Bd03eFE6Ab89749D4B39'
  // const gnosisSafe = (await GnosisSafe.attach(mainnetGnosis))
  
  const bunny = (await TheBunnyGang.attach(bunnyAddr)) as TheBunnyGang
  const multisend = (await MultiSend.attach(multisendAddr)) as MultiSend
  const minion = (await SafeMinion.attach(minionAddr)) as SafeMinion
  
  const action_1 = bunny.interface.encodeFunctionData('mint', ['0xed3a5ff7a813faf5976891e2f91da078c3bca20f', 1])
  console.log({action_1})
  const multi_action = encodeMultiAction(multisend, [action_1], [bunnyAddr], [ethers.utils.parseEther('0.077')], [0])
  
  console.log({multi_action})
  
  const decoded = decodeMultiAction(multisend, multi_action)
  console.log({decoded})
  
  const multi2 = '0x8d80ff0a0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000009900091db4502cbd66492d3e509403bb7ac721ac9f840000000000000000000000000000000000000000000000042c96f40959140000000000000000000000000000000000000000000000000000000000000000004440c10f19000000000000000000000000c7ed1a1e82c302f4b9e5e921073571a2dba1e01b000000000000000000000000000000000000000000000000000000000000000100000000000000'
  const decoded2 = decodeMultiAction(multisend, multi2)
  console.log({decoded2})
  
  // const encoded = await minion.interface.encodeFunctionData('proposeAction', [multi_action,wethaddr,0,"",])
  

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
