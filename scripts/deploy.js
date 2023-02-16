const { ethers } = require("hardhat");

async function main() {
  const MyToken = await ethers.getContractFactory("StudentContract");
  const myToken = await MyToken.deploy();

  console.log("MyToken deployed to:", myToken.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
