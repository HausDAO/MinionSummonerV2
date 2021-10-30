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
  
  const multisendAddr = '0xA238CBeb142c10Ef7Ad8442C6D1f9E89e07e7761'
  
  const safeAddr = '0xaEca461405DD2892FBa8Bd03eFE6Ab89749D4B39'
  // const weth9Mainnet = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'

  // const mainnetGnosis = '0xaEca461405DD2892FBa8Bd03eFE6Ab89749D4B39'
  const gnosisSafe = (await GnosisSafe.attach(safeAddr)) as GnosisSafe
  
  const multisend = (await MultiSend.attach(multisendAddr)) as MultiSend

        // IAsset[] assets;
        // uint256[] maxAmountsIn;
        // bytes userData;
        // bool fromInternalBalance;
        
  const action_0 = gnosisSafe.interface.encodeFunctionData('removeOwner', ['0x0000000000000000000000000000000000000001', '0x8811FF071B9035e91a6c659DF4950C5728d805dc', 1])
  const action_1 = gnosisSafe.interface.encodeFunctionData('removeOwner', ['0x0000000000000000000000000000000000000001', '0x8811FF071B9035e91a6c659DF4950C5728d805dc', 1])
  const action_2 = gnosisSafe.interface.encodeFunctionData('removeOwner', ['0x0000000000000000000000000000000000000001', '0x8811FF071B9035e91a6c659DF4950C5728d805dc', 1])

  console.log({action_0, action_1})
  const multi_action = encodeMultiAction(multisend, [action_0, action_1], [safeAddr, safeAddr], [BigNumber.from(0), BigNumber.from(0)], [0, 0])
  
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
