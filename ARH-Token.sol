// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ARHToken is ERC20 {
    address public liquidityWallet;
    uint256 public constant TOTAL_SUPPLY = 700000 * 10**18;
    uint256 public constant LIQUIDITY_ALLOCATION = 210000 * 10**18; // 30% of total

    constructor(address _liquidityWallet) ERC20("ARH Token", "ARH") {
        require(_liquidityWallet != address(0), "Invalid liquidity wallet");
        
        liquidityWallet = _liquidityWallet;
        
        // Mint 30% to liquidity wallet
        _mint(liquidityWallet, LIQUIDITY_ALLOCATION);
        
        // Mint remaining 70% to deployer
        _mint(msg.sender, TOTAL_SUPPLY - LIQUIDITY_ALLOCATION);
    }
}