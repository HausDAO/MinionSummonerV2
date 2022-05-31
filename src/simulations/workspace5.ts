import { ethers } from 'hardhat'
import { GnosisSafe } from '../types/GnosisSafe'
import { MultiSend } from '../types/MultiSend'
import { Moloch } from '../types/Moloch'
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
  const molochAddr = '0x8b9280f30f386c4b8fc363d5984845d946a936c3'
  const gnosisSafe = (await GnosisSafe.attach(safeAddr)) as GnosisSafe
  
  const multisend = (await MultiSend.attach(multisendAddr)) as MultiSend
  const moloch = (await Moloch.attach(molochAddr)) as Moloch

        // IAsset[] assets;
        // uint256[] maxAmountsIn;
        // bytes userData;
        // bool fromInternalBalance;
  const addrs = ["0xf632ce27ea72dea30d30c1a9700b6b3bceaa05cf","0xdf8088276f2548f1083b0c3a5bd0c72823c86f8e","0xd26a3f686d43f2a62ba9eae2ff77e9f516d945b9","0xced608aa29bb92185d9b6340adcbfa263dae075b","0xb53b0255895c4f9e3a185e484e5b674bccfbc076","0xaf629783a3925bfcfe7ce3f9d37a89b72f05ee9a","0x8f942eced007bd3976927b7958b50df126feecb5","0x839395e20bbb182fa440d08f850e6c7a8f6f0780","0x74a01e5b6daf56409476e03d6ed7d79310ffb560","0x639824d880c5c2cfa5ee84a6923dcfe78eb4fff2","0x1c05376bc22170ce4f72018be6046185238604b8","0x0dcb9f6cb7bf556fd22105ae6a17669dc124e5e0","0x0098377e5028f52b5fc038dd1775f859e8cfb564"];
  const shares = [100,300,200,100,800,200,300,700,300,100,105,300,100]
  const loots = [0,0,0,0,0,0,0,0,0,0,0,0,0]
        
  const action_0 = moloch.interface.encodeFunctionData('setSharesLoot', [addrs,shares,loots,true])
  const action_1 = moloch.interface.encodeFunctionData('setSharesLoot', [addrs,loots,shares,false])

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
