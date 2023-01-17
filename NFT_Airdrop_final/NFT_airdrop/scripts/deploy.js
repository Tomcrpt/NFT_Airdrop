const hre = require("hardhat");
// To be modified
const pin1 = ""

async function main() {
  const NFAirdrop = await hre.ethers.getContractFactory("NFTAirdrop");
  const nftAirdrop = await NFTAirdrop.deploy(pin1);

  await nftAirdrop.deployed();

  console.log("Collection deployed to: ", nftAirdrop.address);

}

main()
  .then(() => process.exit(0)) 
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
