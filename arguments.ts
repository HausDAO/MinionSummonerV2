// for verifying SafeMinionSummoner on etherescan.io
import { goerli } from './src/util/contractAddresses';

// arguments for the --constructor-args flag
module.exports = [
  '', // safeMinionTemplate address
  goerli.gnosisSingleton, // gnosisSingleton address
  goerli.gnosisFallback, // gnosisFallback address
  goerli.gnosisMultisend // gnosisMultisend address
];

// sample cli command:
// > npx hardhat verify --network optimism 'DEPOLYED_SAFE_MINNION_ADDRESS'
//
// Compiling 1 file with 0.8.0
// Successfully submitted source code for contract
// contracts/SafeMinion.sol:SafeMinionSummoner at DEPOLYED_SAFE_MINNION_ADDRESS
// for verification on Etherscan. Waiting for verification result...

// Successfully verified contract SafeMinionSummoner on Etherscan.
// https://kovan-optimistic.etherscan.io/address/DEPOLYED_SAFE_MINNION_ADDRESS#code

// then verify the summoner with the --constructor-args flag passing it this file.
// > npx hardhat verify --network optimism 'DEPOLYED_SAFE_MINNION_SUMMONER_ADDRESS' --constructor-args arguments.js
//
// Compiling 1 file with 0.8.0
// Successfully submitted source code for contract
// contracts/SafeMinion.sol:SafeMinionSummoner at DEPOLYED_SAFE_MINNION_SUMMONER_ADDRESS
// for verification on Etherscan. Waiting for verification result...

// Successfully verified contract SafeMinionSummoner on Etherscan.
// https://kovan-optimistic.etherscan.io/address/DEPOLYED_SAFE_MINNION_SUMMONER_ADDRESS#code
