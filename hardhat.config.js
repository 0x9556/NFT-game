require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
/** @type import('hardhat/config').HardhatUserConfig */


const accounts = [
  process.env.ACCOUNT1,
  process.env.ACCOUNT2,
  process.env.ACCOUNT3,
  process.env.ACCOUNT4,
  process.env.ACCOUNT5,
  process.env.ACCOUNT6,
  process.env.ACCOUNT7,
  process.env.ACCOUNT8,
  process.env.ACCOUNT9,
  process.env.ACCOUNT10
]

task("balance", "Prints an account's balance").setAction(async () => {

})


module.exports = {
  solidity: "0.8.17",
  networks: {
    ethereum: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_API}`,
      accounts: accounts
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_API}`,
      accounts: accounts
    }
  },
  // defaultNetwork: "localhost",
  paths: {
    artifacts: "./contracts/artifacts"
  },
  mocha: {}
};
