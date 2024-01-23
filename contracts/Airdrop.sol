// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract Airdrop {
    IERC20 public token;
    address public owner;
    event AirdropStarted(uint256 totalAmount);

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor(address _tokenAddress) {
        token = IERC20(_tokenAddress);
        owner = msg.sender;
    }

    function airdrop(address[] calldata recipients, uint256 amount) external onlyOwner {
        uint256 totalAmount = recipients.length * amount;

        emit AirdropStarted(totalAmount);

        require(token.balanceOf(address(this)) >= totalAmount, "Not enough funds");

        for (uint i = 0; i < recipients.length; i++) {
            require(token.transfer(recipients[i], amount), "Transfer failed");
        }
    }

    function transferOwnership(address newOwner) external onlyOwner {
        owner = newOwner;
    }
}