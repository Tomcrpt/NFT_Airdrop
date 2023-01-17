const hre = require("hardhat");
const { Contract } = require("hardhat/internal/hardhat-network/stack-traces/model");


async function main() {

  // To be modified => enter your adresses
  const airdropAddresses = ['','',''];

  // To be modified => enter your pins
  const pins = ["", "", ""];

  // To be modified => enter your groups
  const groups = ["","",""];

  // Deployment of the contract
  const HDAirdrop = await hre.ethers.getContractFactory("HDAirdrop");
  const hdAirdrop = await HDAirdrop.deploy();

  await hdAirdrop.deployed();
  console.log("Deployment of the URI: ", hdAirdrop.baseURI);

  console.log("Contract deployed to: ", hdAirdrop.address);
 

  // Mint NFTs
  for (let i = 0; i< airdropAddresses.length; i++){
    tx = await hdAirdrop.setBaseURI(pins[i]);
    await tx.wait();
    tx1 = await hdAirdrop.mint(groups[i],airdropAddresses[i]);
    await tx1.wait();
    console.log("NFT airdropped successfully !")
  }

}

main()
  .then(() => process.exit(0)) 
  .catch((error) => {
    console.error(error);
    process.exit(1);
});