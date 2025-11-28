const hre = require("hardhat");

async function main() {
  const EduCredToken = await hre.ethers.getContractFactory("EduCredToken");
  const token = await EduCredToken.deploy();
  
  await token.waitForDeployment();
  
  console.log(`EduCredToken deployed to: ${await token.getAddress()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
