// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");
const hre = require("hardhat");

const main = async () => {
  let TokenContract = await hre.ethers.getContractFactory('Token')
  let token = await TokenContract.deploy()

  let LandRegistrationContract = await hre.ethers.getContractFactory('LandRegistration')

  let landRegistration = await LandRegistrationContract.deploy(token.address)

  await landRegistration.deployed()

  console.log("LandRegistration contract deployed to:", landRegistration.address);
  

}
 
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });