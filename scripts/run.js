// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const {ethers} = require("hardhat");

const params = {
  name: ["Alakazam","Arbok","Arcanine"],
  imgUrl: [
    "https://i.seadn.io/gae/Q4Yo1ACgMn8tkKxA0zXYqwW8DbMSyiscahzhVk_GC__tv7GfW3ABK5DvZeXfyEez4_p7k0AAsCIUcJG2eFcD2lzM-k0FTePN_pNe?auto=format&w=750",
    "https://i.seadn.io/gae/A7hr6UcOJLrzgm2AncG07x3ky9Dei_w1Fcg8vOlLxB0Fxf-B3in5pBs0ImjCWxij8VX-JOeL_gBry2GzuNwFs_EhkReYxrcKee3D5iQ?auto=format&w=750",
    "https://i.seadn.io/gae/169nKV2U2kwhUzMrWCdIN7EfPqpwyKd4PFA0qKtth9uAlSliQYcA7-1-AS-pxm3NkNlUc7kvXn_EYDvW2_Ed71w7zHxB39pWX-Wu?auto=format&w=750"
  ],
  maxHp: [100, 150, 200],
  attackDmg:[50,30,20]
}

async function deploy() {
  const contractFactory = await ethers.getContractFactory("MyNftGame")
  const contract = await contractFactory.deploy(
    params.name,
    params.imgUrl,
    params.maxHp,
    params.attackDmg
  )
  await contract.deployed()
  console.log("Contract deployed to:", contract.address)
  return contract
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
async function main() {
  const contract = await deploy()
  const tx = await contract.creatCharacter(1)
  await tx.wait()
  const tokenURI = await contract.tokenURI(1)
  console.log(tokenURI)
}

main().catch(error=>{
  console.log(error)
  process.exit(1)
})