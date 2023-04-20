import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Cert", function () {
  async function deployCertFixture() {
    const [admin, other] = await ethers.getSigners();

    const Cert = await ethers.getContractFactory("Cert");
    const cert = await Cert.deploy();

    return { cert, admin, other };
  }

  it("Should set the right admin", async function () {
    const { cert, admin } = await loadFixture(deployCertFixture);

    expect(cert.deployTransaction.from).to.equal(admin.address);
  });

  it("Should issue the certificate", async function () {
    const { cert } = await loadFixture(deployCertFixture);

    await expect(cert.issue(1024, "Caitlyn", "Piltover", "S", "1996-06-12"))
      .to.emit(cert, "Issued")
      .withArgs(1024, "Piltover", "S");
  });

  it("Should read the certificate", async function () {
    const { cert } = await loadFixture(deployCertFixture);

    await cert.issue(1024, "Caitlyn", "Piltover", "S", "1996-06-12");

    const certificate = await cert.Certificates(1024);

    expect(certificate[0]).to.equal("Caitlyn");
    expect(certificate[1]).to.equal("Piltover");
    expect(certificate[2]).to.equal("S");
    expect(certificate[3]).to.equal("1996-06-12");
  });

  it("Should revert the issuing", async function () {
    const { cert, other } = await loadFixture(deployCertFixture);

    await expect(
      cert.connect(other).issue(1024, "Jinx", "Zaun", "S", "2004-03-24")
    ).to.be.revertedWith("Access Denied");
  });
});
