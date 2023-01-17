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
  const NFTAirdrop = await hre.ethers.getContractFactory("NFTAirdrop");
  const nftAirdrop = await NFTAirdrop.deploy();

  await nftAirdrop.deployed();
  console.log("Deployment of the URI: ", nftAirdrop.baseURI);

  console.log("Contract deployed to: ", nftAirdrop.address);
 

  // Mint NFTs
  for (let i = 0; i< airdropAddresses.length; i++){
    tx = await nftAirdrop.setBaseURI(pins[i]);
    await tx.wait();
    tx1 = await nftAirdrop.mint(groups[i],airdropAddresses[i]);
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