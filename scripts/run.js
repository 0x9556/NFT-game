// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");

const heroParams = {
  name: ["Alakazam", "Arbok", "Arcanine"],
  imgUrl: [
    "https://i.seadn.io/gae/Q4Yo1ACgMn8tkKxA0zXYqwW8DbMSyiscahzhVk_GC__tv7GfW3ABK5DvZeXfyEez4_p7k0AAsCIUcJG2eFcD2lzM-k0FTePN_pNe?auto=format&w=750",
    "https://i.seadn.io/gae/A7hr6UcOJLrzgm2AncG07x3ky9Dei_w1Fcg8vOlLxB0Fxf-B3in5pBs0ImjCWxij8VX-JOeL_gBry2GzuNwFs_EhkReYxrcKee3D5iQ?auto=format&w=750",
    "https://i.seadn.io/gae/169nKV2U2kwhUzMrWCdIN7EfPqpwyKd4PFA0qKtth9uAlSliQYcA7-1-AS-pxm3NkNlUc7kvXn_EYDvW2_Ed71w7zHxB39pWX-Wu?auto=format&w=750"
  ],
  maxHp: [100, 150, 200],
  attackDmg: [50, 30, 20]
}


const bossParams = {
  name: ["Blastoise", "Bulbasaur", "Charizard"],
  imgUrl: [
    "https://i.seadn.io/gae/ZcR-LG5S2NthqJ71u9y-CQtdEPpS9zZ7iYy2NXVCdZERu7KaEp0xR4QGpsJ6pdBao4aO4iHLF0W0fzKuDvxWDt-DovxonNB0w-bd?auto=format&w=384",
    "https://i.seadn.io/gae/__w_2sso2VYnNdA62ONJdiKr-hRYj8SoInhkzKne__SXyPLZ3XqPBs9i3O380vqAqKY28Dct2YuASBJZi7_xRv6O7vd013Lynxmb2gw?auto=format&w=384",
    "https://i.seadn.io/gae/cI59MN0MmKvgwGZQk6-JRx95EK9VxT3yek185IKJ4PYZjXQnFdSv4a8-Z2H3QpXvXT9tz1A9b83cO7zgfZist-E3KX8pOLwmh6nBZQ?auto=format&w=384"
  ],
  maxHp: [500, 750, 1000],
  attackDmg: [10, 6, 4]
}

async function deploy() {
  const contractFactory = await ethers.getContractFactory("MyNftGame")
  const contract = await contractFactory.deploy(
    heroParams.name,
    heroParams.imgUrl,
    heroParams.maxHp,
    heroParams.attackDmg,
    bossParams.name,
    bossParams.imgUrl,
    bossParams.maxHp,
    bossParams.attackDmg
  )
  await contract.deployed()
  console.log("Contract deployed to:", contract.address)
  return contract
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
async function main() {
  const contract = await deploy()
  let tx = await contract.creatCharacter(0)
  await tx.wait()

  tx = await contract.attackBoss(0)
  await tx.wait()
  tx = await contract.attackBoss(0)
  await tx.wait()
  tx = await contract.checkIfUserHasNft()
  console.log(tx)

}

// deploy().catch(error => {
//   console.log(error)
//   process.exit(1)
// })
main().catch(error => {
  console.log(error)
  process.exit(1)
})