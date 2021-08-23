import { ethers } from "hardhat";
import { solidity } from "ethereum-waffle";
import { BigNumberish, Contract, ContractFactory } from "ethers";
import { use, expect } from "chai";
import { AnyErc20 } from "../src/types/AnyErc20";
import { Moloch } from "../src/types/Moloch";
import { DaoConditionalHelper } from "../src/types/DaoConditionalHelper";
import { WhitelistModuleHelper } from "../src/types/WhitelistModuleHelper";
import { NeapolitanMinion } from "../src/types/NeapolitanMinion";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { doProposal, fastForwardBlocks } from "./util";

use(solidity);

describe("Multi-call Minion", function () {
  let Moloch: ContractFactory;
  let moloch: Moloch;
  let moloch2: Moloch;
  let DaoConditionalHelper: ContractFactory;
  let helper: DaoConditionalHelper;
  let WhitelistModuleHelper: ContractFactory;
  let moduleHelper: WhitelistModuleHelper;


  let molochAsAlice: Moloch;

  let NeapolitanMinion: ContractFactory;
  let neapolitanMinion: NeapolitanMinion;

  let neapolitanMinionAsAlice: NeapolitanMinion;
  let neapolitanMinionAsCeleste: NeapolitanMinion;
  let moduleHelperAsAlice: WhitelistModuleHelper;
  let moduleHelperAsBob: WhitelistModuleHelper;

  let AnyNft: ContractFactory;

  let AnyERC20: ContractFactory;
  let anyErc20: AnyErc20;

  let signers: SignerWithAddress[];

  let deployer: SignerWithAddress;
  let alice: SignerWithAddress;
  let bob: SignerWithAddress;
  let celeste: SignerWithAddress;

  const zeroAddress = "0x0000000000000000000000000000000000000000";
  let totalAccountingAddress: string;
  let guildAccountingAddress: string;

  let deployerAddress: string;
  let aliceAddress: string;
  let celesteAddress: string;
  let bobAddress: string;

  let minQuorum: BigNumberish;

  this.beforeAll(async function () {
    Moloch = await ethers.getContractFactory("Moloch");
    DaoConditionalHelper = await ethers.getContractFactory("DaoConditionalHelper");
    NeapolitanMinion = await ethers.getContractFactory("NeapolitanMinion");
    WhitelistModuleHelper = await ethers.getContractFactory("WhitelistModuleHelper");
    AnyNft = await ethers.getContractFactory("AnyNFT");
    AnyERC20 = await ethers.getContractFactory("AnyERC20");
    signers = await ethers.getSigners();
    deployer = signers[0];
    alice = signers[1];
    bob = signers[2];
    celeste = signers[3];

    deployerAddress = deployer.address;
    aliceAddress = alice.address;
    celesteAddress = celeste.address;
    bobAddress = bob.address;
  });

  describe("Minions", function () {
    this.beforeEach(async function () {
      // Deploy ERC20 contract
      anyErc20 = (await AnyERC20.deploy()) as AnyErc20;

      // deploy Moloch and Minion
      moloch = (await Moloch.deploy()) as Moloch;
      moloch2 = (await Moloch.deploy()) as Moloch;
      helper = (await DaoConditionalHelper.deploy()) as DaoConditionalHelper;
      molochAsAlice = await moloch.connect(alice);
      // 5 block periods, 5 period voting, 1 period grace, 0 proposal deposit, 3 dilution bound, 0 reward, 100 summoner shares, 50 alice shares
      await moloch.init(
        [deployerAddress, aliceAddress, bobAddress],
        [anyErc20.address],
        5,
        5,
        1,
        0,
        3,
        0,
        [100, 50, 10]
      );
      await moloch2.init(
        [deployerAddress, aliceAddress, bobAddress],
        [anyErc20.address],
        5,
        5,
        1,
        0,
        3,
        0,
        [100, 50, 10]
      );

      // Mint ERC20 to moloch
      await anyErc20.mint(moloch.address, 10000);

      // collect tokens
      await moloch.collectTokens(anyErc20.address);
      minQuorum = 20;
      neapolitanMinion = (await NeapolitanMinion.deploy()) as NeapolitanMinion;
      await neapolitanMinion.init(moloch.address, minQuorum);
      neapolitanMinionAsAlice = await neapolitanMinion.connect(alice);
      neapolitanMinionAsCeleste = await neapolitanMinion.connect(celeste)

      moduleHelper = (await WhitelistModuleHelper
        .deploy([aliceAddress],neapolitanMinion.address)) as WhitelistModuleHelper;
      moduleHelperAsAlice = await moduleHelper.connect(alice);
      moduleHelperAsBob = await moduleHelper.connect(bob);

      // send some erc20 to minion
      await anyErc20.mint(neapolitanMinion.address, 500);

      totalAccountingAddress = await moloch.TOTAL();
      guildAccountingAddress = await moloch.GUILD();

      await fastForwardBlocks(5);
    });

    it("Sets up the tests", async function () {
      expect(await anyErc20.balanceOf(moloch.address)).to.equal(10000);
      expect(await anyErc20.balanceOf(neapolitanMinion.address)).to.equal(500);
      expect(await moloch.totalGuildBankTokens()).to.equal(1);
      expect(
        await moloch.userTokenBalances(guildAccountingAddress, anyErc20.address)
      ).to.equal(10000);
      expect(
        await moloch.userTokenBalances(totalAccountingAddress, anyErc20.address)
      ).to.equal(10000);
      expect((await moloch.members(aliceAddress)).shares).to.equal(50);
      expect((await moloch.members(deployerAddress)).shares).to.equal(100);
      expect((await moloch.members(deployerAddress)).shares).to.equal(100);
      expect((await moloch.members(celesteAddress)).shares).to.equal(0);
    });
    
    describe("Permissions", function() {
      it("Allows member to execute", async function () {
        const action_1 = anyErc20.interface.encodeFunctionData("transfer", [
          aliceAddress,
          10,
        ]);

        await neapolitanMinion.proposeAction(
          [anyErc20.address],
          [0],
          [action_1],
          anyErc20.address,
          0,
          "test",
          false
        );
        
        await doProposal(true, 0, moloch)


        await neapolitanMinion.executeAction(
          0,
          [anyErc20.address],
          [0],
          [action_1]
        );

        expect(await anyErc20.balanceOf(aliceAddress)).to.equal(10);
        expect(await anyErc20.balanceOf(neapolitanMinion.address)).to.equal(
          490
        );
      });

      it("Does not allow anyone else to execute in member or module prop", async function () {
        const action_1 = anyErc20.interface.encodeFunctionData("transfer", [
          aliceAddress,
          10,
        ]);

        await neapolitanMinion.proposeAction(
          [anyErc20.address],
          [0],
          [action_1],
          anyErc20.address,
          0,
          "test",
          true
        );
        
        await doProposal(true, 0, moloch)


        expect(neapolitanMinionAsCeleste.executeAction(
          0,
          [anyErc20.address],
          [0],
          [action_1]
        )).to.be.revertedWith('Minion::not member or module')

        expect(await anyErc20.balanceOf(aliceAddress)).to.equal(0);
        expect(await anyErc20.balanceOf(neapolitanMinion.address)).to.equal(
          500
        );
      });


    })

    describe("Multi-call", function () {
      it("Enables 2 actions to be associated with one proposal", async function () {
        const action_1 = anyErc20.interface.encodeFunctionData("transfer", [
          aliceAddress,
          10,
        ]);
        const action_2 = anyErc20.interface.encodeFunctionData("transfer", [
          aliceAddress,
          20,
        ]);

        await neapolitanMinion.proposeAction(
          [anyErc20.address, anyErc20.address],
          [0, 0],
          [action_1, action_2],
          anyErc20.address,
          0,
          "test",
          false
        );

        await doProposal(true, 0, moloch)

        await neapolitanMinion.executeAction(
          0,
          [anyErc20.address, anyErc20.address],
          [0, 0],
          [action_1, action_2]
        );

        expect(await anyErc20.balanceOf(aliceAddress)).to.equal(30);
        expect(await anyErc20.balanceOf(neapolitanMinion.address)).to.equal(
          470
        );
      });

      it("Enables to change owner and make a proposal on new moloch", async function () {
        const action_1 = neapolitanMinion.interface.encodeFunctionData(
          "changeOwner",
          [moloch2.address]
        );

        await neapolitanMinion.proposeAction(
          [neapolitanMinion.address],
          [0],
          [action_1],
          anyErc20.address,
          0,
          "test",
          false
        );

        await doProposal(true, 0, moloch)
        await neapolitanMinion.executeAction(
          0,
          [neapolitanMinion.address],
          [0],
          [action_1]
        );

        expect(await neapolitanMinion.moloch()).to.equal(moloch2.address);

        const action_2 = anyErc20.interface.encodeFunctionData("transfer", [
          aliceAddress,
          10,
        ]);
        const action_3 = anyErc20.interface.encodeFunctionData("transfer", [
          aliceAddress,
          20,
        ]);
        await neapolitanMinion.proposeAction(
          [anyErc20.address, anyErc20.address],
          [0, 0],
          [action_2, action_3],
          anyErc20.address,
          0,
          "test",
          false
        );

        await fastForwardBlocks(1);
        await moloch2.sponsorProposal(0);

        await fastForwardBlocks(5);
        await moloch2.submitVote(0, 1);

        await fastForwardBlocks(5);

        // execute before proposal is processed

        await neapolitanMinion.executeAction(
          0,
          [anyErc20.address, anyErc20.address],
          [0, 0],
          [action_2, action_3]
        );

        expect(await anyErc20.balanceOf(aliceAddress)).to.equal(30);
        expect(await anyErc20.balanceOf(neapolitanMinion.address)).to.equal(
          470
        );
      });

      it("Enables actions to be executed early when minQuorum is met", async function () {
        const action_1 = anyErc20.interface.encodeFunctionData("transfer", [
          aliceAddress,
          10,
        ]);
        const action_2 = anyErc20.interface.encodeFunctionData("transfer", [
          aliceAddress,
          20,
        ]);
        await neapolitanMinion.proposeAction(
          [anyErc20.address, anyErc20.address],
          [0, 0],
          [action_1, action_2],
          anyErc20.address,
          10,
          "test",
          false
        );

        await fastForwardBlocks(1);
        await moloch.sponsorProposal(0);

        await fastForwardBlocks(5);
        await moloch.submitVote(0, 1);

        await fastForwardBlocks(5);

        // execute before proposal is processed

        await neapolitanMinion.executeAction(
          0,
          [anyErc20.address, anyErc20.address],
          [0, 0],
          [action_1, action_2]
        );

        expect(await anyErc20.balanceOf(aliceAddress)).to.equal(30);
        expect(await anyErc20.balanceOf(neapolitanMinion.address)).to.equal(
          470
        );
      });

      it("Fail actions when executed early and minQuorum is not met", async function () {
        const action_1 = anyErc20.interface.encodeFunctionData("transfer", [
          aliceAddress,
          10,
        ]);
        const action_2 = anyErc20.interface.encodeFunctionData("transfer", [
          aliceAddress,
          20,
        ]);

        await neapolitanMinion.proposeAction(
          [anyErc20.address, anyErc20.address],
          [0, 0],
          [action_1, action_2],
          anyErc20.address,
          10,
          "test",
          false
        );

        await fastForwardBlocks(1);
        await moloch.sponsorProposal(0);

        await fastForwardBlocks(5);
        // do not vote on proposal

        // execute before proposal is processed

        expect(
          neapolitanMinion.executeAction(
            0,
            [anyErc20.address, anyErc20.address],
            [0, 0],
            [action_1, action_2]
          )
        ).to.be.revertedWith("Minion::proposal execution requirements not met");
      });

      it("It withdraws tokens from treasury when part of the proposal", async function () {
        const action_1 = anyErc20.interface.encodeFunctionData("approve", [
          aliceAddress,
          10,
        ]);

        // withdraw 10 anytoken on execute
        await neapolitanMinion.proposeAction(
          [anyErc20.address],
          [0],
          [action_1],
          anyErc20.address,
          10,
          "test",
          false
        );

        await fastForwardBlocks(1);
        await moloch.sponsorProposal(0);

        await fastForwardBlocks(5);
        await moloch.submitVote(0, 1);

        await fastForwardBlocks(31);

        await moloch.processProposal(0);
        expect(await anyErc20.balanceOf(neapolitanMinion.address)).to.equal(
          500
        );
        await neapolitanMinion.executeAction(
          0,
          [anyErc20.address],
          [0],
          [action_1]
        );
        expect(await anyErc20.balanceOf(neapolitanMinion.address)).to.equal(
          510
        );
      });

      it("Fails if an executed action is different from a proposed action", async function () {
        const action_1 = anyErc20.interface.encodeFunctionData("transfer", [
          aliceAddress,
          10,
        ]);
        const action_2 = anyErc20.interface.encodeFunctionData("transfer", [
          aliceAddress,
          20,
        ]);

        const invalid_action = anyErc20.interface.encodeFunctionData(
          "transfer",
          [aliceAddress, 30]
        );

        await neapolitanMinion.proposeAction(
          [anyErc20.address, anyErc20.address],
          [0, 0],
          [action_1, action_2],
          anyErc20.address,
          0,
          "test",
          false
        );

        await doProposal(true, 0, moloch)

        expect(
          neapolitanMinion.executeAction(
            0,
            [anyErc20.address, anyErc20.address],
            [0, 0],
            [action_1, invalid_action]
          )
        ).to.be.revertedWith("Minion::not a valid operation");
      });

      it("Fails when first actions condition is not meet", async function () {
        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        const action_1 = helper.interface.encodeFunctionData("isAfter", [
          Math.floor(tomorrow.getTime()  / 1000), // tomorrows data, remove ms
        ]);
        const action_2 = anyErc20.interface.encodeFunctionData("transfer", [
          aliceAddress,
          20,
        ]);

        await neapolitanMinion.proposeAction(
          [helper.address, anyErc20.address],
          [0, 0],
          [action_1, action_2],
          anyErc20.address,
          0,
          "test",
          false
        );

        await doProposal(true, 0, moloch)

        expect(
          neapolitanMinion.executeAction(
            0,
            [helper.address, anyErc20.address],
            [0, 0],
            [action_1, action_2]
          )
        ).to.be.revertedWith("Minion::call failure");

        
      });

      it("Passes when first actions condition is meet", async function () {
        const today = new Date()
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)
        const action_1 = helper.interface.encodeFunctionData("isAfter", [
          Math.floor(yesterday.getTime() / 1000), // yesterdays date
        ]);
        const action_2 = anyErc20.interface.encodeFunctionData("transfer", [
          aliceAddress,
          20,
        ]);

        await neapolitanMinion.proposeAction(
          [helper.address, anyErc20.address],
          [0, 0],
          [action_1, action_2],
          anyErc20.address,
          0,
          "test",
          false
        );

        await doProposal(true, 0, moloch)

        await neapolitanMinion.executeAction(
            0,
            [helper.address, anyErc20.address],
            [0, 0],
            [action_1, action_2]
          )

        expect(await anyErc20.balanceOf(aliceAddress)).to.equal(20);
        
      });

      it("Enables Buyout proposal type condition", async function () {
        const action_1 = helper.interface.encodeFunctionData("isNotDaoMember", [
          aliceAddress,
          moloch.address
        ]);
        const action_2 = anyErc20.interface.encodeFunctionData("transfer", [
          aliceAddress,
          20,
        ]);

        await neapolitanMinion.proposeAction(
          [helper.address, anyErc20.address],
          [0, 0],
          [action_1, action_2],
          anyErc20.address,
          0,
          "test",
          false
        );

        await doProposal(true, 0, moloch)

        // should fail before ragequit
        expect(
          neapolitanMinion.executeAction(
            0,
            [helper.address, anyErc20.address],
            [0, 0],
            [action_1, action_2]
          )
        ).to.be.revertedWith("Minion::call failure");
        
        await molochAsAlice.ragequit(50,0);
        // now it should complete successfully
        await neapolitanMinion.executeAction(
          0,
          [helper.address, anyErc20.address],
          [0, 0],
          [action_1, action_2]
        )

        expect(await anyErc20.balanceOf(aliceAddress)).to.equal(20);
        
      });

      it("Enables to set module and module can execute action", async function () {
        const action_1 = neapolitanMinion.interface.encodeFunctionData(
          "enableModule",
          [aliceAddress]
        );

        await neapolitanMinion.proposeAction(
          [neapolitanMinion.address],
          [0],
          [action_1],
          anyErc20.address,
          0,
          "test",
          false
        );

        await doProposal(true, 0, moloch)
        await neapolitanMinion.executeAction(
          0,
          [neapolitanMinion.address],
          [0],
          [action_1]
        );
        

        expect(await neapolitanMinion.isModuleEnabled(aliceAddress)).to.equal(true);

        const action_2 = anyErc20.interface.encodeFunctionData("transfer", [
          aliceAddress,
          10,
        ]);
        const action_3 = anyErc20.interface.encodeFunctionData("transfer", [
          aliceAddress,
          20,
        ]);
        await neapolitanMinion.proposeAction(
          [anyErc20.address, anyErc20.address],
          [0, 0],
          [action_2, action_3],
          anyErc20.address,
          0,
          "test",
          false
        );

        await fastForwardBlocks(1);
        await moloch.sponsorProposal(1);

        await fastForwardBlocks(10);

        // execute before proposal is processed

        await neapolitanMinionAsAlice.executeAction(
          1,
          [anyErc20.address, anyErc20.address],
          [0, 0],
          [action_2, action_3]
        );

        expect(await anyErc20.balanceOf(aliceAddress)).to.equal(30);
        expect(await anyErc20.balanceOf(neapolitanMinion.address)).to.equal(
          470
        );
      });

      it("Enables to set whitelist module and module can execute action", async function () {
        const action_1 = neapolitanMinion.interface.encodeFunctionData(
          "enableModule",
          [moduleHelper.address]
        );

        await neapolitanMinion.proposeAction(
          [neapolitanMinion.address],
          [0],
          [action_1],
          anyErc20.address,
          0,
          "test",
          false
        );

        await doProposal(true, 0, moloch)
        await neapolitanMinion.executeAction(
          0,
          [neapolitanMinion.address],
          [0],
          [action_1]
        );

        expect(await neapolitanMinion.isModuleEnabled(moduleHelper.address)).to.equal(true);

        const action_2 = anyErc20.interface.encodeFunctionData("transfer", [
          aliceAddress,
          10,
        ]);
        const action_3 = anyErc20.interface.encodeFunctionData("transfer", [
          aliceAddress,
          20,
        ]);
        await neapolitanMinion.proposeAction(
          [anyErc20.address, anyErc20.address],
          [0, 0],
          [action_2, action_3],
          anyErc20.address,
          0,
          "test",
          false
        );

        await fastForwardBlocks(1);
        await moloch.sponsorProposal(1);

        await fastForwardBlocks(10);

        // execute before proposal is processed from whitelist module

        // Bob is not whitelisted
        expect(
          moduleHelperAsBob.executeAction(
            1,
            [anyErc20.address, anyErc20.address],
            [0, 0],
            [action_2, action_3]
          )
        ).to.be.revertedWith("Whitelist Module::Not whitelisted");
        // alice is whitelisted
        await moduleHelperAsAlice.executeAction(
          1,
          [anyErc20.address, anyErc20.address],
          [0, 0],
          [action_2, action_3]
        );

        expect(await anyErc20.balanceOf(aliceAddress)).to.equal(30);
        expect(await anyErc20.balanceOf(neapolitanMinion.address)).to.equal(
          470
        );
      });
      
    });
  });
});
