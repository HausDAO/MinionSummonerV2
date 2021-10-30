import { ethers } from 'hardhat'
import { GnosisSafe } from '../types/GnosisSafe'
import { MultiSend } from '../types/MultiSend'
import { Weth9 } from '../types/Weth9'
import { AnyErc20 } from '../types/AnyErc20'
import { SafeMinion } from '../types/SafeMinion'
import { Pool } from '../types/Pool'
import { Vault } from '../types/Vault'
import { qualifiedAddresses, values } from './lists'
import { decodeMultiAction, encodeMultiAction} from '../../test/util'
import { BigNumber } from '@ethersproject/bignumber'

const pool = require('../../abis/pool.json')
const vault = require('../../abis/vault.json')

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
  const Weth = await ethers.getContractFactory('WETH9')
  const AnyErc20 = await ethers.getContractFactory('AnyERC20')
  const Pool = new ethers.ContractFactory(pool, '0x')
  const Vault = new ethers.ContractFactory(vault, '0x')
  console.log('ready for deploy')

  // const gnosisSafeSingleton = (await GnosisSafe.deploy()) as GnosisSafe
  // const signMessageLib = (await SignMessageLib.deploy()) as SignMessageLib
  // const handler = (await CompatibilityFallbackHandler.deploy()) as CompatibilityFallbackHandler
  // const safeMinionTemplate = (await SafeMinion.deploy()) as SafeMinion
  // const molochTemplate = await Moloch.deploy()
  // const molochSummoner = (await MolochSummoner.deploy(molochTemplate.address)) as MolochSummoner
  // const anyErc20 = (await AnyERC20.deploy()) as AnyErc20
  
  const vaultAddr = '0xba12222222228d8ba445958a75a0704d566bf2c8'
  const poolAddr = '0xccf5575570fac94cec733a58ff91bb3d073085c7'
  const multisendAddr = '0xA238CBeb142c10Ef7Ad8442C6D1f9E89e07e7761'
  
  const wethAddr = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
  const safeAddr = '0xaEca461405DD2892FBa8Bd03eFE6Ab89749D4B39'
  const robotAddr = '0xfb5453340C03db5aDe474b27E68B6a9c6b2823Eb'
  // const weth9Mainnet = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'

  // const mainnetGnosis = '0xaEca461405DD2892FBa8Bd03eFE6Ab89749D4B39'
  // const gnosisSafe = (await GnosisSafe.attach(mainnetGnosis))
  
  const vaultInstance = (await Vault.attach(vaultAddr)) as Vault
  const multisend = (await MultiSend.attach(multisendAddr)) as MultiSend
  const weth = (await Weth.attach(wethAddr)) as Weth9
  const robot = (await AnyErc20.attach(robotAddr)) as AnyErc20

        // IAsset[] assets;
        // uint256[] maxAmountsIn;
        // bytes userData;
        // bool fromInternalBalance;
        
  const joinKind = 1 // exact tokens in for bpt out
        
  const poolId = '0xccf5575570fac94cec733a58ff91bb3d073085c70002000000000000000000af'
  const assets = [wethAddr, robotAddr]
  const maxAmountsIn = [ethers.utils.parseEther('685'), ethers.utils.parseEther('495')]
    const abiCoder = ethers.utils.defaultAbiCoder
    const userData = abiCoder.encode(
      ['uint256', 'uint256[]', 'uint256'],
      [
        joinKind,
        maxAmountsIn,
        1 // todo min amount out?
      ]
    )
  const fromInternalBalance = false
  const action_0 = weth.interface.encodeFunctionData('approve', [vaultAddr, maxAmountsIn[0]])
  const action_1 = robot.interface.encodeFunctionData('approve', [vaultAddr, maxAmountsIn[1]])

  const action_2 = vaultInstance.interface.encodeFunctionData('joinPool', [poolId, safeAddr, safeAddr, {
    assets,
    maxAmountsIn,
    userData,
    fromInternalBalance
    
  }])
  console.log({action_0, action_1, action_2})
  const multi_action = encodeMultiAction(multisend, [action_0, action_1, action_2], [wethAddr, robotAddr, vaultAddr], [BigNumber.from(0), BigNumber.from(0), BigNumber.from(0)], [0, 0, 0])
  
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
