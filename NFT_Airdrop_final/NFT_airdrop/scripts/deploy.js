const hre = require("hardhat");
// To be modified
const pin1 = ""

async function main() {
  const HDAirdrop = await hre.ethers.getContractFactory("HDAirdrop");
  const hdAirdrop = await HDAirdrop.deploy(pin1);

  await hdAirdrop.deployed();

  console.log("Collection deployed to: ", hdAirdrop.address);

}

main()
  .then(() => process.exit(0)) 
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
