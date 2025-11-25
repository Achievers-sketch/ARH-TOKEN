# ARH Token

A simple ERC20 token implementation built on Ethereum with predetermined supply allocation for liquidity provision.

## Overview

ARH Token is a standard ERC20 token contract that implements a fixed supply distribution model. Upon deployment, the contract automatically allocates 30% of the total supply to a designated liquidity wallet, with the remaining 70% sent to the contract deployer.

## Token Details

- **Token Name:** ARH Token
- **Token Symbol:** ARH
- **Total Supply:** 700,000 ARH
- **Decimals:** 18 (standard ERC20)
- **Solidity Version:** ^0.8.19
- **License:** MIT

## Supply Distribution

The token supply is distributed as follows during contract deployment:

| Allocation | Amount | Percentage | Recipient |
|------------|--------|------------|-----------|
| Liquidity Pool | 210,000 ARH | 30% | Liquidity Wallet |
| Initial Distribution | 490,000 ARH | 70% | Contract Deployer |

## Features

- **Fixed Supply:** Total supply is minted at deployment with no additional minting capability
- **Automated Distribution:** Supply allocation happens automatically during contract creation
- **OpenZeppelin Standard:** Built using OpenZeppelin's audited ERC20 implementation
- **Immutable Allocation:** Liquidity wallet address is set once during deployment

## Smart Contract Architecture

### Constructor Parameters

```solidity
constructor(address _liquidityWallet)
```

- `_liquidityWallet`: Address that will receive 30% of total supply for liquidity provision

### State Variables

- `liquidityWallet` (public): Address of the liquidity wallet
- `TOTAL_SUPPLY` (constant): 700,000 tokens (18 decimals)
- `LIQUIDITY_ALLOCATION` (constant): 210,000 tokens (30% of total)

### Key Functions

Inherits all standard ERC20 functions from OpenZeppelin:
- `transfer()`
- `approve()`
- `transferFrom()`
- `balanceOf()`
- `allowance()`
- And other standard ERC20 methods

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Hardhat or Truffle (for deployment)
- MetaMask or similar Web3 wallet

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd arh-token

# Install dependencies
npm install

# Install OpenZeppelin contracts
npm install @openzeppelin/contracts
```

## Deployment

### Using Hardhat

1. Create a deployment script (`scripts/deploy.js`):

```javascript
const hre = require("hardhat");

async function main() {
  const liquidityWallet = "0xYourLiquidityWalletAddress";
  
  const ARHToken = await hre.ethers.getContractFactory("ARHToken");
  const arhToken = await ARHToken.deploy(liquidityWallet);
  
  await arhToken.deployed();
  
  console.log("ARH Token deployed to:", arhToken.address);
  console.log("Liquidity Wallet:", liquidityWallet);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

2. Deploy the contract:

```bash
npx hardhat run scripts/deploy.js --network <network-name>
```

### Using Remix IDE

1. Copy the contract code into Remix
2. Ensure OpenZeppelin contracts are imported
3. Compile with Solidity compiler version 0.8.19 or higher
4. Deploy with the liquidity wallet address as constructor parameter

## Usage Example

```javascript
// Using ethers.js
const { ethers } = require("ethers");

// Connect to contract
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
const tokenContract = new ethers.Contract(
  TOKEN_ADDRESS,
  TOKEN_ABI,
  provider
);

// Check balance
const balance = await tokenContract.balanceOf(address);
console.log("Balance:", ethers.utils.formatEther(balance));

// Transfer tokens
const tx = await tokenContract.transfer(recipientAddress, amount);
await tx.wait();
```

## Security Considerations

- **Constructor Validation:** Ensures liquidity wallet address is not zero address
- **Fixed Supply:** No minting function prevents supply inflation
- **OpenZeppelin Base:** Uses battle-tested ERC20 implementation
- **Immutable Distribution:** Supply allocation cannot be changed after deployment

### Recommended Actions Before Mainnet Deployment

1. Complete professional smart contract audit
2. Verify liquidity wallet address is correct and secure
3. Test thoroughly on testnet (Sepolia, Goerli, etc.)
4. Verify contract source code on Etherscan
5. Implement multi-sig wallet for liquidity wallet if possible

## Testing

```bash
# Run tests
npx hardhat test

# Check coverage
npx hardhat coverage
```

## Verification

After deployment, verify your contract on Etherscan:

```bash
npx hardhat verify --network <network> <contract-address> <liquidity-wallet-address>
```

## License

This project is licensed under the MIT License.

## Dependencies

- OpenZeppelin Contracts: ^4.9.0 or higher

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## Contact & Support

For questions or issues, please open an issue in the repository or contact the development team.
