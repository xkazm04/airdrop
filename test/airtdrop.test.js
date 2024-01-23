const { ethers } = require("hardhat");
const { expect } = require("chai");


describe("Airdrop", function () {
  let airdrop, token, accounts;

  beforeEach(async function () {
    accounts = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Token"); // Replace with your actual token contract
    token = await Token.deploy();
    await token.deployed();

    const Airdrop = await ethers.getContractFactory("Airdrop");
    airdrop = await Airdrop.deploy(token.address);
    await airdrop.deployed();
  });

  it("should airdrop tokens to one receiver", async function () {
    // Arrange
    const amount = ethers.utils.parseEther("1");
    const receiver = accounts[1].address;

    // Act
    await token.approve(airdrop.address, amount);
    await airdrop.airdrop(receiver, amount);

    // Assert
    const receiverBalance = await token.balanceOf(receiver);
    expect(receiverBalance).to.equal(amount);
  });
});