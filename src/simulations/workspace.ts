import { ethers } from 'hardhat'
import { GnosisSafe } from '../types/GnosisSafe'
import { MultiSend } from '../types/MultiSend'
import { SafeMinion } from '../types/SafeMinion'
import { SafeMinionSummoner } from '../types/SafeMinionSummoner'
import { SignMessageLib } from '../types/SignMessageLib'
import { CompatibilityFallbackHandler } from '../types/CompatibilityFallbackHandler'
import { MolochSummoner } from '../types/MolochSummoner'
import { AnyErc20 } from '../types/AnyErc20'
import { Weth9 } from '../types/Weth9'
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
  const Moloch = await ethers.getContractFactory('Moloch')
  const MolochSummoner = await ethers.getContractFactory('MolochSummoner')
  const SafeMinion = await ethers.getContractFactory('SafeMinion')
  const SafeMinionSummoner = await ethers.getContractFactory('SafeMinionSummoner')
  const GnosisSafe = await ethers.getContractFactory('GnosisSafe')
  const MultiSend = await ethers.getContractFactory('MultiSend')
  const SignMessageLib = await ethers.getContractFactory('SignMessageLib')
  const AnyERC20 = await ethers.getContractFactory('AnyERC20')
  const Weth9 = await ethers.getContractFactory('WETH9')
  const CompatibilityFallbackHandler = await ethers.getContractFactory('CompatibilityFallbackHandler')
  console.log('ready for deploy')

  // const gnosisSafeSingleton = (await GnosisSafe.deploy()) as GnosisSafe
  // const signMessageLib = (await SignMessageLib.deploy()) as SignMessageLib
  // const handler = (await CompatibilityFallbackHandler.deploy()) as CompatibilityFallbackHandler
  // const safeMinionTemplate = (await SafeMinion.deploy()) as SafeMinion
  // const molochTemplate = await Moloch.deploy()
  // const molochSummoner = (await MolochSummoner.deploy(molochTemplate.address)) as MolochSummoner
  // const anyErc20 = (await AnyERC20.deploy()) as AnyErc20
  
  const weth9Rinkeby = '0xc778417E063141139Fce010982780140Aa0cD5Ab'
  const multisendAddr = '0xA238CBeb142c10Ef7Ad8442C6D1f9E89e07e7761'
  // const weth9Mainnet = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'

  // const mainnetGnosis = '0xaEca461405DD2892FBa8Bd03eFE6Ab89749D4B39'
  // const gnosisSafe = (await GnosisSafe.attach(mainnetGnosis))
  
  const weth = (await Weth9.attach(weth9Rinkeby))
  const multisend = (await MultiSend.attach(multisendAddr)) as MultiSend

  const action_1 = weth.interface.encodeFunctionData('deposit')
  const action_2 = weth.interface.encodeFunctionData('transfer', [weth9Rinkeby, ethers.utils.parseEther('1')])
  console.log({action_1})
  console.log({action_2})
  const multi_action = encodeMultiAction(multisend, [action_1, action_2], [weth.address, weth.address], [ethers.utils.parseEther('127.3861'), BigNumber.from(0)], [0, 0])
  
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
