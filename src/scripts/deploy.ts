import { ethers } from "hardhat";
import { SafeMinion } from "../types/SafeMinion";
import { SafeMinionSummoner } from "../types/SafeMinionSummoner";
import {
  kovan,
  mainnet,
  polygon,
  rinkeby,
  xdai,
  goerli,
  arbitrum
  kovanOptimism, 
  optimism,
} from "../util/contractAddresses";


async function main() {
  const accounts = await ethers.getSigners();

  console.log(
    "Accounts:",
    accounts.map((a) => a.address)
  );

  // const contractAddresses = polygon
  // const contractAddresses = mainnet
  const contractAddresses = optimism
  // const contractAddresses = arbitrum
  // const contractAddresses = mainnet
  // const contractAddresses = optimism
  // const contractAddresses = xdai;
  // const contractAddresses = rinkeby;
  // const contractAddresses = goerli;
  // const contractAddresses = kovan;

  const SafeMinion = await ethers.getContractFactory("SafeMinion");
  const SafeMinionSummoner = await ethers.getContractFactory(
    "SafeMinionSummoner"
  );

  // const ConditionalMinionTemplate = await ethers.getContractFactory('ConditionalMinion')
  // const ConditionalMinionSummoner = await ethers.getContractFactory('ConditionalMinionFactory')
  // const ERC1271MinionTemplate = await ethers.getContractFactory('ERC1271Minion')
  // const ERC1271MinionSummoner = await ethers.getContractFactory('ERC1271MinionFactory')
  console.log("ready for deploy");

  // setting gas limits on arbitrum will not work
  // const safeMinionTemplate = (await SafeMinion.deploy()) as SafeMinion;
  // console.log({ safeMinionTemplate });
  // await safeMinionTemplate.deployTransaction.wait();
  console.log("safe deployed");
  const safeMinionSummoner = (await SafeMinionSummoner.deploy(
    "0x51498dddd2a8cdec82932e08a37ebaf346c38efd",
    contractAddresses.gnosisSingleton,
    contractAddresses.gnosisFallback,
    contractAddresses.gnosisMultisend,
    contractAddresses.gnosisSafeProxyFactory,
    contractAddresses.gnosisModuleProxyFactory
  )) as SafeMinionSummoner;

  // const conditionalMinionTemplate = (await ConditionalMinionTemplate.deploy()) as ConditionalMinion
  // const conditionalMinionFactory = await ConditionalMinionSummoner.deploy(conditionalMinionTemplate.address)

  // const erc1271MinionTemplate = (await ERC1271MinionTemplate.deploy()) as Erc1271Minion
  // const erc1271MinionFactory = await ERC1271MinionSummoner.deploy(erc1271MinionTemplate.address)

  console.log("waiting for deployment");

  console.log({
    safeMinionSummoner: safeMinionSummoner.address,
    safeMinionTemplate: "0x51498dddd2a8cdec82932e08a37ebaf346c38efd",
    // conditionalMinionFactory: conditionalMinionFactory.address,
    // erc1271MinionFactory: erc1271MinionFactory.address,
  });

  console.log('deploy params', "0x51498dddd2a8cdec82932e08a37ebaf346c38efd",
  contractAddresses.gnosisSingleton,
  contractAddresses.gnosisFallback,
  contractAddresses.gnosisMultisend,
  contractAddresses.gnosisSafeProxyFactory,
  contractAddresses.gnosisModuleProxyFactory);
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
