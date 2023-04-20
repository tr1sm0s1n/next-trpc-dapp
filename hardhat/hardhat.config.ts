import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  // defaultNetwork: "ganache",
  solidity: "0.8.18",
  networks: {
    ganache: {
      url: "http://127.0.0.1:8545",
    },
  },
  paths: {
    artifacts: "../src/utils"
  }
};

export default config;
