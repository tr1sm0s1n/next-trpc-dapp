import { writeFile } from "fs";
import { ethers } from "hardhat";

async function main() {
  const Cert = await ethers.getContractFactory("Cert");
  const cert = await Cert.deploy();

  await cert.deployed();

  const details = {
    deployer: cert.deployTransaction.from,
    contract: cert.address,
  };

  console.log(`${details.deployer} deployed ${details.contract}`);

  writeFile("../src/utils/details.json", JSON.stringify(details, null, 2), (err) => {
    if (err) {
      return console.log(err);
    }
    return console.log("Details are saved!!");
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
