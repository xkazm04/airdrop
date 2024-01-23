import { ethers } from "hardhat";

async function main() {
  const Airdrop = await ethers.getContractFactory("Airdrop");
  const airdrop = await Airdrop.deploy("0xf0870565451d30B50A092CA96392cCbcf2E54aF1"); // testnet MIN address

  await airdrop.waitForDeployment();

  console.log("Airdrop deployed to:", airdrop);
  // 0xf0a06dba5a0b541ce257ac79b75d5e98c4a3d7cc
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
