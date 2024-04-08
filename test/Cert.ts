import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers';
import chai from 'chai';
import hre from 'hardhat';

const { expect } = chai;

describe('Cert', function () {
  async function deployCertFixture() {
    const [admin, other] = await hre.ethers.getSigners();

    const Cert = await hre.ethers.getContractFactory('Cert');
    const cert = await Cert.deploy();

    return { cert, admin, other };
  }

  it('Should set the right admin', async function () {
    const { cert, admin } = await loadFixture(deployCertFixture);

    expect(cert.deploymentTransaction()?.from).to.equal(admin.address);
  });

  it('Should issue the certificate', async function () {
    const { cert } = await loadFixture(deployCertFixture);

    await expect(cert.issue(720, 'Cabarnet', 'MBCC', 'S', '04-04-2024'))
      .to.emit(cert, 'Issued')
      .withArgs(720, 'MBCC', 'S');
  });

  it('Should read the certificate', async function () {
    const { cert } = await loadFixture(deployCertFixture);

    await cert.issue(720, 'Cabarnet', 'MBCC', 'S', '04-04-2024');

    const certificate = await cert.Certificates(720);

    expect(certificate[0]).to.equal('Cabarnet');
    expect(certificate[1]).to.equal('MBCC');
    expect(certificate[2]).to.equal('S');
    expect(certificate[3]).to.equal('04-04-2024');
  });

  it('Should revert the issuing', async function () {
    const { cert, other } = await loadFixture(deployCertFixture);

    await expect(
      cert.connect(other).issue(690, 'Enfer', 'MBCC', 'S', '04-04-2024'),
    ).to.be.revertedWith('Access Denied');
  });
});
