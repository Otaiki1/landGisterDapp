// require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-waffle");
// /** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  paths: {
    artifacts: './components/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337
    }
  }
};
