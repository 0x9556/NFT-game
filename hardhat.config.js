require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  // networks: {
  //   ethereum: {
  //     url:`https://mainnet.infura.io/v3/${process.env.INFURA_API}`
  //   },
  //   goerli: {
  //     url:`https://goerli.infura.io/v3/${process.env.INFURA_API}`
  //   }
  // },
  // defaultNetwork:"localhost",
  paths: {
    artifacts:"./contracts/artifacts"
  },
  mocha:{}
};
