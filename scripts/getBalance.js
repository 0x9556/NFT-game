const { ethers } = require("hardhat")
async function getAllAccountBalance() {

    const signers = await ethers.getSigners()
    signers.forEach(async (singer) => {
        const balance = ethers.utils.formatEther(await singer.getBalance())
        console.log(singer.address, balance)
    })
}

getAllAccountBalance()