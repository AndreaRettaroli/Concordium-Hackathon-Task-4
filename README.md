# Concordium-Hackathon-Task-4
# Concordium Mainnet Wallet 414U2CaxhTALCRgjPDBA4x3Q9pezXSJxKkpAGyi5sigq87oi9p
# Concordium Liquid Staking Application
The project allow users to do Liquid Staking with Concordium token CCD. 
Stake CCD tokens to receive wCCD tokens. 
Unstake wCCD to get back your CCD tokens.
# Prerequisites
The Concordium browser wallet extension must be installed in Google Chrome and connected to testnet, in order to view smart contract details or submit transactions.
# Installing

## Frontend

- Go in frontend folder
  ````
  cd ./frontend/
  ````
- Install:
   ````
   npm install
   ````
- Run:
  ````
  npm run dev
  ````

Open URL logged in console (typically http://localhost:5173/)

## Wiring Frontend with Smart Contracts

- To stake CCD:
  - Call `deposit` function in `liq_pool` smart contract
  - Call `contract_stake` function in `lqccd` smart contract
    - `sender` - CCD Address
    - `receiver` - lqCCD Address
    - `receiver` != `sender`
- To unstake lqCCD:
  - Call `withdraw` function in `liq_pool` smart contract
  - Call `contract_unstake` function in `lqccd` smart contract

