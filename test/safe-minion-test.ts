import { ethers } from 'hardhat'
import { solidity } from 'ethereum-waffle'
import { randomBytes } from 'crypto'
import { Contract, ContractFactory, BigNumberish, Wallet } from 'ethers'
import { use, expect } from 'chai'
import { AnyErc20 } from '../src/types/AnyErc20'
import { BadMoloch } from '../src/types/BadMoloch'
import { Moloch } from '../src/types/Moloch'
import { DaoConditionalHelper } from '../src/types/DaoConditionalHelper'
import { SafeMinion } from '../src/types/SafeMinion'
import { SafeMinionSummoner } from '../src/types/SafeMinionSummoner'
// import { TestExecutor } from '../src/types/TestExecutor'
import { GnosisSafe } from '../src/types/GnosisSafe'
import { GnosisSafeProxy } from '../src/types/GnosisSafeProxy'
import { CompatibilityFallbackHandler } from '../src/types/CompatibilityFallbackHandler'
import { MultiSend } from '../src/types/MultiSend'
import { SignMessageLib } from '../src/types/SignMessageLib'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { decodeMultiAction, doProposal, encodeMultiAction, fastForwardBlocks } from './util'
import { encodeMultiSend, executeContractCallWithSigners, MetaTransaction } from '@gnosis.pm/safe-contracts'

const generateNonce = async () => {
  const buffer = await randomBytes(32)
  return buffer.toString('hex')
}

use(solidity)

describe.only('Safe Minion Functionality', function () {
  let Moloch: ContractFactory
  let moloch: Moloch

  let MultiSend: ContractFactory
  let multisend: MultiSend

  let SignMessageLib: ContractFactory
  let signMessageLib: SignMessageLib

  let CompatibilityFallbackHandler: ContractFactory
  let handler: CompatibilityFallbackHandler

  let molochAsAlice: Moloch

  let SafeMinion: ContractFactory
  let safeMinion: SafeMinion
  let safeMinionTemplate: SafeMinion
  
  let safeMinionAsBob: SafeMinion

  let SafeMinionSummoner: ContractFactory
  let safeMinionSummoner: SafeMinionSummoner

  let GnosisSafe: ContractFactory
  let gnosisSafeSingleton: GnosisSafe
  let gnosisSafe: GnosisSafe

  let GnosisSafeProxy: ContractFactory
  let gnosisSafeProxy: GnosisSafeProxy

  let DaoConditionalHelper: ContractFactory
  let helper: DaoConditionalHelper

  let AnyNft: ContractFactory

  let AnyERC20: ContractFactory
  let anyErc20: AnyErc20

  let BadMoloch: ContractFactory
  let badMoloch: BadMoloch

  let signers: SignerWithAddress[]

  let deployer: SignerWithAddress
  let alice: SignerWithAddress
  let bob: SignerWithAddress

  let deployerAddress: string
  let aliceAddress: string
  let bobAddress: string

  let arbitraryMsgHash: string
  let magicValue: string

  let testWallet: Wallet

  const demoKey = '0xc41d4ecec0049da2bc18ad0538dffedd2af76714a0438229dbd55e1109f0493d'
  const testWalletAbstract = new ethers.Wallet(demoKey)

  const zeroAddress = '0x0000000000000000000000000000000000000000'

  let minQuorum: BigNumberish

  this.beforeAll(async function () {
    Moloch = await ethers.getContractFactory('Moloch')
    DaoConditionalHelper = await ethers.getContractFactory('DaoConditionalHelper')
    SafeMinion = await ethers.getContractFactory('SafeMinion')
    SafeMinionSummoner = await ethers.getContractFactory('SafeMinionSummoner')
    AnyNft = await ethers.getContractFactory('AnyNFT')
    GnosisSafe = await ethers.getContractFactory('GnosisSafe')
    GnosisSafeProxy = await ethers.getContractFactory('GnosisSafeProxy')
    MultiSend = await ethers.getContractFactory('MultiSend')
    SignMessageLib = await ethers.getContractFactory('SignMessageLib')
    CompatibilityFallbackHandler = await ethers.getContractFactory('CompatibilityFallbackHandler')
    AnyERC20 = await ethers.getContractFactory('AnyERC20')
    BadMoloch = await ethers.getContractFactory('BadMoloch')

    signers = await ethers.getSigners()
    deployer = signers[0]
    alice = signers[1]
    bob = signers[2]

    deployerAddress = deployer.address
    aliceAddress = alice.address
    bobAddress = bob.address
    arbitraryMsgHash = await ethers.utils.hashMessage('This does not have to be the same')
    magicValue = '0x1626ba7e'

    // Deploy gnosis singleton
    gnosisSafeSingleton = (await GnosisSafe.deploy()) as GnosisSafe
    multisend = (await MultiSend.deploy()) as MultiSend
    signMessageLib = (await SignMessageLib.deploy()) as SignMessageLib
    handler = (await CompatibilityFallbackHandler.deploy()) as CompatibilityFallbackHandler
    safeMinionTemplate = (await SafeMinion.deploy()) as SafeMinion

    safeMinionSummoner = (await SafeMinionSummoner.deploy(
      safeMinionTemplate.address,
      gnosisSafeSingleton.address,
      handler.address,
      multisend.address
    )) as SafeMinionSummoner

    testWallet = await testWalletAbstract.connect(ethers.provider)
  })

  describe('Helpers', function () {
    it('fast forwards blocks', async function () {
      const blockNumber = await ethers.provider.getBlockNumber()
      await fastForwardBlocks(5)
      expect(await ethers.provider.getBlockNumber()).to.equal(blockNumber + 5)
    })
  })
  describe('Minions', function () {
    this.beforeEach(async function () {
      // Deploy ERC20 contract
      anyErc20 = (await AnyERC20.deploy()) as AnyErc20

      // deploy Moloch and Minion
      moloch = (await Moloch.deploy()) as Moloch
      helper = (await DaoConditionalHelper.deploy()) as DaoConditionalHelper
      molochAsAlice = await moloch.connect(alice)
      // 5 block periods, 5 period voting, 1 period grace, 0 proposal deposit, 3 dilution bound, 0 reward, 100 summoner shares, 50 alice shares
      await moloch.init([deployerAddress, aliceAddress], [anyErc20.address], 5, 5, 1, 0, 3, 0, [100, 50])

      // Mint ERC20 to moloch
      await anyErc20.mint(moloch.address, 10000)

      // collect tokens
      await moloch.collectTokens(anyErc20.address)

      minQuorum = 20
      
      const salt = await generateNonce()

      await safeMinionSummoner.summonMinionAndSafe(moloch.address, '', minQuorum, "0x" + salt)
      const newMinionCount = (await safeMinionSummoner.minionCount()).toNumber()
      const newMinionAddress = await safeMinionSummoner.minionList(newMinionCount - 1)
      safeMinion = (await SafeMinion.attach(newMinionAddress)) as SafeMinion
      safeMinionAsBob = await safeMinion.connect(bob)
      const gnosisSafeAddress = await safeMinion.avatar()
      await anyErc20.mint(gnosisSafeAddress, 500)
      gnosisSafe = (await GnosisSafe.attach(gnosisSafeAddress)) as GnosisSafe
    })

    it('Sets up the tests', async function () {
      const threshold = await gnosisSafe.getThreshold()
      console.log({ safeMinion: safeMinion.address, gnosisSafe: gnosisSafe.address })
      console.log({ threshold })
      expect(await moloch.totalGuildBankTokens()).to.equal(1)
      expect((await moloch.members(aliceAddress)).shares).to.equal(50)
      expect((await moloch.members(deployerAddress)).shares).to.equal(100)
      expect(await gnosisSafe.isOwner(safeMinion.address)).to.equal(true)
      // expect(await gnosisSafe.isModuleEnabled(deployerAddress)).to.equal(false)
      // expect(await gnosisSafe.isModuleEnabled(safeMinion.address)).to.equal(true)
    })
    
    describe('Module Boilerplate', function () {
      it('Sets the safe as the owner and avatar', async function () {
        expect (await safeMinion.owner()).to.equal(gnosisSafe.address)
        expect (await safeMinion.avatar()).to.equal(gnosisSafe.address)
      })

      it('Allows safe to change avatar', async function () {
        const change_avatar_action = safeMinion.interface.encodeFunctionData('setAvatar', [bobAddress])
        const multi_action = encodeMultiAction(multisend, [change_avatar_action], [safeMinion.address], [0])
        await safeMinion.proposeAction(multi_action, anyErc20.address, 0, 'test', false)

        await doProposal(true, 0, moloch)

        await safeMinion.executeAction(0, multi_action)

        expect (await safeMinion.avatar()).to.equal(bobAddress)
      })

      it('Allows safe to change owner', async function () {
        const change_owner_action = safeMinion.interface.encodeFunctionData('transferOwnership', [bobAddress])
        const multi_action = encodeMultiAction(multisend, [change_owner_action], [safeMinion.address], [0])
        await safeMinion.proposeAction(multi_action, anyErc20.address, 0, 'test', false)

        await doProposal(true, 0, moloch)

        await safeMinion.executeAction(0, multi_action)

        expect (await safeMinion.owner()).to.equal(bobAddress)
      })

    })
    
    describe('Signatures', function () {
      it('Allows a member to submit a signature proposal and mark it valid through voting', async function () {
        const sign_action_1 = signMessageLib.interface.encodeFunctionData('signMessage', [arbitraryMsgHash])
        const multi_action = encodeMultiAction(multisend, [sign_action_1], [signMessageLib.address], [1])
        await safeMinion.proposeAction(multi_action, anyErc20.address, 0, 'test', false)

        await doProposal(true, 0, moloch)

        await safeMinion.executeAction(0, multi_action)

        const validator = await handler.attach(gnosisSafe.address)
        expect(await validator.callStatic['isValidSignature(bytes32,bytes)'](arbitraryMsgHash, '0x')).to.equal(magicValue)
      })

      it('Fails if proposal has not passed', async function () {
        const sign_action_1 = signMessageLib.interface.encodeFunctionData('signMessage', [arbitraryMsgHash])
        const multi_action = encodeMultiAction(multisend, [sign_action_1], [signMessageLib.address], [1])
        await safeMinion.proposeAction(multi_action, anyErc20.address, 0, 'test', false)

        const validator = await handler.attach(gnosisSafe.address)
        expect(validator.callStatic['isValidSignature(bytes32,bytes)'](arbitraryMsgHash, '0x')).to.be.revertedWith('Hash not approved')
      })
    })

    describe('Safe management', function () {
      it('Enables multiple modules to be activated on setup', async function () {
        const proxy = await GnosisSafeProxy.deploy(gnosisSafeSingleton.address)
        gnosisSafe = (await GnosisSafe.attach(proxy.address)) as GnosisSafe
        await safeMinionSummoner.summonMinion(moloch.address, gnosisSafe.address, '', minQuorum, 100)
        const newMinionCount = (await safeMinionSummoner.minionCount()).toNumber()
        const newMinionAddress = await safeMinionSummoner.minionList(newMinionCount - 1)
        safeMinion = (await SafeMinion.attach(newMinionAddress)) as SafeMinion

        expect(await gnosisSafe.isModuleEnabled(safeMinion.address)).to.equal(false)
        expect(await gnosisSafe.isModuleEnabled(deployerAddress)).to.equal(false)

        const enableModuleAction_1 = gnosisSafe.interface.encodeFunctionData('enableModule', [safeMinion.address])
        const enableModuleAction_2 = gnosisSafe.interface.encodeFunctionData('enableModule', [deployerAddress])
        const multi_action = encodeMultiAction(
          multisend,
          [enableModuleAction_1, enableModuleAction_2],
          [gnosisSafe.address, gnosisSafe.address],
          [0, 0]
        )
        await gnosisSafe.setup([testWallet.address], 1, multisend.address, multi_action, zeroAddress, zeroAddress, 0, zeroAddress)
        expect(await gnosisSafe.isModuleEnabled(safeMinion.address)).to.equal(true)
        expect(await gnosisSafe.isModuleEnabled(deployerAddress)).to.equal(true)
      })
      it('Enables a minion to add another module', async function () {
        expect(await gnosisSafe.isModuleEnabled(deployerAddress)).to.equal(false)
        const action_1 = gnosisSafe.interface.encodeFunctionData('enableModule', [deployerAddress])
        const multi_action = encodeMultiAction(multisend, [action_1], [gnosisSafe.address], [0])
        await safeMinion.proposeAction(multi_action, anyErc20.address, 0, 'test', false)
        await doProposal(true, 0, moloch)

        await safeMinion.executeAction(0, multi_action)
        expect(await gnosisSafe.isModuleEnabled(deployerAddress)).to.equal(true)
      })

      it('Enables a minion to add an owner', async function () {
        expect(await gnosisSafe.isOwner(deployerAddress)).to.equal(false)
        const action_1 = gnosisSafe.interface.encodeFunctionData('addOwnerWithThreshold', [deployerAddress, 1])
        const multi_action = encodeMultiAction(multisend, [action_1], [gnosisSafe.address], [0])
        await safeMinion.proposeAction(multi_action, anyErc20.address, 0, 'test', false)
        await doProposal(true, 0, moloch)

        await safeMinion.executeAction(0, multi_action)
        expect(await gnosisSafe.isOwner(deployerAddress)).to.equal(true)
      })
    })

    describe('Cross withdraw from another Moloch to this minion', function () {
      let otherMoloch: Moloch
      let otherErc20 : AnyErc20
      this.beforeEach(async function() {
        otherMoloch = (await Moloch.deploy()) as Moloch
        otherErc20 = (await AnyERC20.deploy()) as AnyErc20
        await otherMoloch.init([deployerAddress], [anyErc20.address, otherErc20.address], 5, 5, 1, 0, 3, 0, [100])
        await anyErc20.mint(otherMoloch.address, 100)
        await otherErc20.mint(otherMoloch.address, 100)
        await otherMoloch.collectTokens(anyErc20.address)
        await otherMoloch.collectTokens(otherErc20.address)
      })
      it('Enables a Minion to withdraw Moloch funds into a safe', async function () {
        expect(await anyErc20.balanceOf(gnosisSafe.address)).to.equal(500)
        await otherMoloch.submitProposal(gnosisSafe.address, 0, 0, 0, anyErc20.address, 10, anyErc20.address, '')
        await doProposal(true, 0, otherMoloch)
        expect(await otherMoloch.userTokenBalances(gnosisSafe.address, anyErc20.address)).to.equal(10)

        await safeMinion.crossWithdraw(otherMoloch.address, anyErc20.address, 5, false)
        expect(await anyErc20.balanceOf(gnosisSafe.address)).to.equal(505)
      })

      it('Enables a Minion to withdraw Moloch funds into Moloch if token is whitelisted', async function () {
        expect(await anyErc20.balanceOf(gnosisSafe.address)).to.equal(500)
        expect(await anyErc20.balanceOf(moloch.address)).to.equal(10000)
        await otherMoloch.submitProposal(gnosisSafe.address, 0, 0, 0, anyErc20.address, 10, anyErc20.address, '')
        await doProposal(true, 0, otherMoloch)

        await safeMinion.crossWithdraw(otherMoloch.address, anyErc20.address, 5, true)
        expect(await anyErc20.balanceOf(gnosisSafe.address)).to.equal(500)
        expect(await anyErc20.balanceOf(moloch.address)).to.equal(10005)
      })

      it('Fails if token not whitelisted by recipient moloch', async function () {
        expect(await otherErc20.balanceOf(gnosisSafe.address)).to.equal(0)
        expect(await otherErc20.balanceOf(moloch.address)).to.equal(0)
        await otherMoloch.submitProposal(gnosisSafe.address, 0, 0, 0, anyErc20.address, 10, otherErc20.address, '')
        await doProposal(true, 0, otherMoloch)

        expect(safeMinion.crossWithdraw(otherMoloch.address, otherErc20.address, 5, true)).to.be.revertedWith('Minion:token is not whitelisted')
        expect(await otherErc20.balanceOf(gnosisSafe.address)).to.equal(0)
        expect(await otherErc20.balanceOf(moloch.address)).to.equal(0)
      })
    })

    describe('Cross withdraw exploit attempts', function () {
      let badMoloch: BadMoloch
      this.beforeEach(async function() {
        badMoloch = (await BadMoloch.deploy()) as BadMoloch
      })
      it('Prevents member from calling cross withdraw on self', async function () {
        expect(await anyErc20.balanceOf(gnosisSafe.address)).to.equal(500)
        await moloch.submitProposal(gnosisSafe.address, 0, 0, 0, anyErc20.address, 10, anyErc20.address, '')
        await doProposal(true, 0, moloch)
        expect(safeMinion.crossWithdraw(moloch.address, anyErc20.address, 5, true)).to.be.revertedWith('Minion::invalid self crosswithdraw')
        expect(await anyErc20.balanceOf(gnosisSafe.address)).to.equal(500)
      })

      it('Prevents member from calling crosswithdraw resulting in decrease of safe balance', async function () {
        expect(await anyErc20.balanceOf(gnosisSafe.address)).to.equal(500)
        expect(await anyErc20.balanceOf(moloch.address)).to.equal(10000)
        expect(safeMinion.crossWithdraw(badMoloch.address, anyErc20.address, 5, true)).to.be.revertedWith('Minion::invalid balance crosswithdraw')
        expect(await anyErc20.balanceOf(gnosisSafe.address)).to.equal(500)
        expect(await anyErc20.balanceOf(moloch.address)).to.equal(10000)
      })

    })
    
    describe('Execute as Minion', function () {
      this.beforeEach(async function() {
        await anyErc20.mint(safeMinion.address, 100)
      })
      it('Enables the Safe to rescue tokens sent to the minion', async function () {
        expect(await anyErc20.balanceOf(safeMinion.address)).to.equal(100)
        expect(await anyErc20.balanceOf(gnosisSafe.address)).to.equal(500)
        const minionAction = anyErc20.interface.encodeFunctionData('transfer', [gnosisSafe.address, 100])
        const action_1 = safeMinion.interface.encodeFunctionData('executeAsMinion', [anyErc20.address, 0, minionAction])

        const multi_action = encodeMultiAction(multisend, [action_1], [safeMinion.address], [0])

        await safeMinion.proposeAction(multi_action, anyErc20.address, 0, 'test', false)

        await doProposal(true, 0, moloch)

        await safeMinion.executeAction(0, multi_action)

        expect(await anyErc20.balanceOf(safeMinion.address)).to.equal(0)
        expect(await anyErc20.balanceOf(gnosisSafe.address)).to.equal(600)
        
      })

      it('Reverts if external call reverts', async function () {
        expect(await anyErc20.balanceOf(safeMinion.address)).to.equal(100)
        expect(await anyErc20.balanceOf(gnosisSafe.address)).to.equal(500)
        const minionAction = anyErc20.interface.encodeFunctionData('transfer', [gnosisSafe.address, 150])
        const action_1 = safeMinion.interface.encodeFunctionData('executeAsMinion', [anyErc20.address, 0, minionAction])

        const multi_action = encodeMultiAction(multisend, [action_1], [safeMinion.address], [0])

        await safeMinion.proposeAction(multi_action, anyErc20.address, 0, 'test', false)

        await doProposal(true, 0, moloch)

        expect(safeMinion.executeAction(0, multi_action)).to.be.revertedWith('Minion::call failure')

        expect(await anyErc20.balanceOf(safeMinion.address)).to.equal(100)
        expect(await anyErc20.balanceOf(gnosisSafe.address)).to.equal(500)

      })
      
      it('Does not allow anyone else to call exec as minion', async function() {
        const minionAction = anyErc20.interface.encodeFunctionData('transfer', [safeMinion.address, 100])
        expect(safeMinion.executeAsMinion(anyErc20.address, 0, minionAction)).to.be.revertedWith('Minion::not avatar')

      })
    })

    describe('Safe withdraw from Moloch', function () {
      it('Enables a Minion to withdraw Moloch funds into a safe', async function () {
        expect(await anyErc20.balanceOf(aliceAddress)).to.equal(0)
        expect(await anyErc20.balanceOf(gnosisSafe.address)).to.equal(500)
        const action_1 = anyErc20.interface.encodeFunctionData('transfer', [aliceAddress, 10])

        const multi_action = encodeMultiAction(multisend, [action_1], [anyErc20.address], [0])
        await safeMinion.proposeAction(multi_action, anyErc20.address, 100, 'test', false)

        await doProposal(true, 0, moloch)

        await safeMinion.doWithdraw(anyErc20.address, 100)
        expect(await anyErc20.balanceOf(gnosisSafe.address)).to.equal(600)
        expect(await anyErc20.balanceOf(aliceAddress)).to.equal(0)

        await safeMinion.executeAction(0, multi_action)

        expect(await anyErc20.balanceOf(gnosisSafe.address)).to.equal(590)
        expect(await anyErc20.balanceOf(aliceAddress)).to.equal(10)
      })
    })
    
    describe('Fallback', function() {
      it('reverts if ETH is sent to this contract', async function () {
        expect(bob.sendTransaction({to: safeMinion.address, value: 100})).to.be.reverted
        expect(bob.sendTransaction({to: safeMinion.address, value: 100, data: '0x1'})).to.be.reverted
      })

    })
    
    describe('Multisend', function () {
      it('Enables 2 actions to be associated with one proposal', async function () {
        const action_1 = anyErc20.interface.encodeFunctionData('transfer', [aliceAddress, 10])
        const action_2 = anyErc20.interface.encodeFunctionData('transfer', [aliceAddress, 20])

        const multi_action = encodeMultiAction(multisend, [action_1, action_2], [anyErc20.address, anyErc20.address], [0, 0])

        await safeMinion.proposeAction(multi_action, anyErc20.address, 0, 'test', false)

        await doProposal(true, 0, moloch)

        await safeMinion.executeAction(0, multi_action)

        expect(await anyErc20.balanceOf(aliceAddress)).to.equal(30)
        expect(await anyErc20.balanceOf(gnosisSafe.address)).to.equal(470)
      })

      it('only allows member to execute if enabled', async function () {
        const action_1 = anyErc20.interface.encodeFunctionData('transfer', [aliceAddress, 10])
        const action_2 = anyErc20.interface.encodeFunctionData('transfer', [aliceAddress, 20])

        const multi_action = encodeMultiAction(multisend, [action_1, action_2], [anyErc20.address, anyErc20.address], [0, 0])

        await safeMinion.proposeAction(multi_action, anyErc20.address, 0, 'test', true)

        await doProposal(true, 0, moloch)

        expect(safeMinionAsBob.executeAction(0, multi_action)).to.be.revertedWith('Minion::not member')

        expect(await anyErc20.balanceOf(aliceAddress)).to.equal(0)
        expect(await anyErc20.balanceOf(gnosisSafe.address)).to.equal(500)
      })

      it('allows anyone to execute if member only not enabled', async function () {
        const action_1 = anyErc20.interface.encodeFunctionData('transfer', [aliceAddress, 10])
        const action_2 = anyErc20.interface.encodeFunctionData('transfer', [aliceAddress, 20])

        const multi_action = encodeMultiAction(multisend, [action_1, action_2], [anyErc20.address, anyErc20.address], [0, 0])

        await safeMinion.proposeAction(multi_action, anyErc20.address, 0, 'test', false)

        await doProposal(true, 0, moloch)

        await safeMinionAsBob.executeAction(0, multi_action)

        expect(await anyErc20.balanceOf(aliceAddress)).to.equal(30)
        expect(await anyErc20.balanceOf(gnosisSafe.address)).to.equal(470)
      })
      
      it('Decodes multisend into actions', async function() {
          const action_1 = anyErc20.interface.encodeFunctionData('transfer', [aliceAddress, 10])
          const action_2 = anyErc20.interface.encodeFunctionData('transfer', [aliceAddress, 20])

          const multi_action = encodeMultiAction(multisend, [action_1, action_2], [anyErc20.address, anyErc20.address], [0, 0])
          const decoded = decodeMultiAction(multisend, multi_action)
          
          expect(decoded.length).to.equal(2)
          expect(decoded[0].to.toLowerCase()).to.equal(anyErc20.address.toLowerCase())
          expect(decoded[1].to.toLowerCase()).to.equal(anyErc20.address.toLowerCase())
          expect(decoded[0].data).to.equal(action_1)
          expect(decoded[1].data).to.equal(action_2)
          expect(decoded[0].operation).to.equal(0)
          expect(decoded[1].operation).to.equal(0)
          
          const decodedData = await anyErc20.interface.decodeFunctionData('transfer', decoded[0].data)

      })

      it('Enables a proposal to delete a previous action', async function () {
        const action_1 = anyErc20.interface.encodeFunctionData('transfer', [aliceAddress, 10])
        const delete_action_1 = safeMinion.interface.encodeFunctionData('deleteAction', [0])

        const multi_action_1 = encodeMultiAction(multisend, [action_1], [anyErc20.address], [0])
        const delete_multi_action_1 = encodeMultiAction(multisend, [delete_action_1], [safeMinion.address], [0])

        await safeMinion.proposeAction(multi_action_1, anyErc20.address, 0, 'test', false)

        await doProposal(true, 0, moloch)

        await safeMinion.proposeAction(delete_multi_action_1, anyErc20.address, 0, 'test', false)

        await doProposal(true, 1, moloch)

        await safeMinion.executeAction(1, delete_multi_action_1)
        expect(safeMinion.executeAction(0, multi_action_1)).to.be.revertedWith('Minion::action was deleted')
      })

      it('Enables actions to be executed early when minQuorum is met', async function () {
        const action_1 = anyErc20.interface.encodeFunctionData('transfer', [aliceAddress, 10])
        const action_2 = anyErc20.interface.encodeFunctionData('transfer', [aliceAddress, 20])

        const multi_action = encodeMultiAction(multisend, [action_1, action_2], [anyErc20.address, anyErc20.address], [0, 0])

        await safeMinion.proposeAction(multi_action, anyErc20.address, 0, 'test', false)

        await fastForwardBlocks(1)
        await moloch.sponsorProposal(0)

        await fastForwardBlocks(5)
        await moloch.submitVote(0, 1)

        await fastForwardBlocks(5)

        // execute before proposal is processed

        await safeMinion.executeAction(0, multi_action)

        expect(await anyErc20.balanceOf(aliceAddress)).to.equal(30)
        expect(await anyErc20.balanceOf(gnosisSafe.address)).to.equal(470)
      })

      it('Fail actions when executed early and minQuorum is not met', async function () {
        const action_1 = anyErc20.interface.encodeFunctionData('transfer', [aliceAddress, 10])
        const action_2 = anyErc20.interface.encodeFunctionData('transfer', [aliceAddress, 20])

        const multi_action = encodeMultiAction(multisend, [action_1, action_2], [anyErc20.address, anyErc20.address], [0, 0])

        await safeMinion.proposeAction(multi_action, anyErc20.address, 0, 'test', false)

        await fastForwardBlocks(1)
        await moloch.sponsorProposal(0)

        await fastForwardBlocks(5)
        // do not vote on proposal

        // execute before proposal is processed

        expect(safeMinion.executeAction(0, multi_action)).to.be.revertedWith('Minion::proposal execution requirements not met')
      })

      it('It withdraws tokens from treasury when part of the proposal', async function () {
        const action_1 = anyErc20.interface.encodeFunctionData('approve', [aliceAddress, 10])
        const multi_action = encodeMultiAction(multisend, [action_1], [anyErc20.address], [0])

        // withdraw 10 anytoken on execute
        await safeMinion.proposeAction(multi_action, anyErc20.address, 10, 'test', false)

        await doProposal(true, 0, moloch)
        expect(await anyErc20.balanceOf(gnosisSafe.address)).to.equal(500)
        await safeMinion.executeAction(0, multi_action)
        expect(await anyErc20.balanceOf(gnosisSafe.address)).to.equal(510)
      })

      it('Fails if an executed action is different from a proposed action', async function () {
        const action_1 = anyErc20.interface.encodeFunctionData('transfer', [aliceAddress, 10])
        const action_2 = anyErc20.interface.encodeFunctionData('transfer', [aliceAddress, 20])

        const multi_action = encodeMultiAction(multisend, [action_1, action_2], [anyErc20.address, anyErc20.address], [0, 0])

        const invalid_action = anyErc20.interface.encodeFunctionData('transfer', [aliceAddress, 30])

        const invalid_multi_action = encodeMultiAction(multisend, [action_1, invalid_action], [anyErc20.address, anyErc20.address], [0, 0])

        await safeMinion.proposeAction(multi_action, anyErc20.address, 0, 'test', false)

        await doProposal(true, 0, moloch)

        expect(safeMinion.executeAction(0, invalid_multi_action)).to.be.revertedWith('Minion::not a valid operation')
      })

      it('Fails when first actions condition is not meet', async function () {
        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        const action_1 = helper.interface.encodeFunctionData('isAfter', [
          Math.floor(tomorrow.getTime() / 1000), // tomorrows data, remove ms
        ])
        const action_2 = anyErc20.interface.encodeFunctionData('transfer', [aliceAddress, 20])

        const multi_action = encodeMultiAction(multisend, [action_1, action_2], [helper.address, anyErc20.address], [0, 0])

        await safeMinion.proposeAction(multi_action, anyErc20.address, 0, 'test', false)

        await doProposal(true, 0, moloch)

        expect(safeMinion.executeAction(0, multi_action)).to.be.revertedWith('Minion::call failure')
      })

      it('Passes when first actions condition is meet', async function () {
        const today = new Date()
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)
        const action_1 = helper.interface.encodeFunctionData('isAfter', [
          Math.floor(yesterday.getTime() / 1000), // yesterdays date
        ])
        const action_2 = anyErc20.interface.encodeFunctionData('transfer', [aliceAddress, 20])

        const multi_action = encodeMultiAction(multisend, [action_1, action_2], [helper.address, anyErc20.address], [0, 0])

        await safeMinion.proposeAction(multi_action, anyErc20.address, 0, 'test', false)

        await doProposal(true, 0, moloch)

        await safeMinion.executeAction(0, multi_action)

        expect(await anyErc20.balanceOf(aliceAddress)).to.equal(20)
      })

      it('Enables Buyout proposal type condition', async function () {
        const action_1 = helper.interface.encodeFunctionData('isNotDaoMember', [aliceAddress, moloch.address])
        const action_2 = anyErc20.interface.encodeFunctionData('transfer', [aliceAddress, 20])

        const multi_action = encodeMultiAction(multisend, [action_1, action_2], [helper.address, anyErc20.address], [0, 0])

        await safeMinion.proposeAction(multi_action, anyErc20.address, 0, 'test', false)

        await doProposal(true, 0, moloch)

        // should fail before ragequit
        expect(safeMinion.executeAction(0, multi_action)).to.be.revertedWith('Minion::call failure')

        await molochAsAlice.ragequit(50, 0)
        // now it should complete successfully
        await safeMinion.executeAction(0, multi_action)

        expect(await anyErc20.balanceOf(aliceAddress)).to.equal(20)
      })
    })
  })
})
