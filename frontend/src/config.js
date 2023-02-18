const TESTNET_GENESIS_BLOCK_HASH = "";
const MAINNET_GENESIS_BLOCK_HASH = "";

export const TESTNET = {
  name: "testnet",
  genesisHash: TESTNET_GENESIS_BLOCK_HASH,
  jsonRpcUrl: "https://json-rpc.testnet.concordium.com",
  ccdScanBaseUrl: "https://testnet.ccdscan.io",
};
export const MAINNET = {
  name: "mainnet",
  genesisHash: MAINNET_GENESIS_BLOCK_HASH,
  jsonRpcUrl: "https://json-rpc.mainnet.concordium.software",
  ccdScanBaseUrl: "https://ccdscan.io",
};
