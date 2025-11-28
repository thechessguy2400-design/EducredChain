const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EduCredToken", function () {
  let EduCredToken;
  let token;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    EduCredToken = await ethers.getContractFactory("EduCredToken");
    token = await EduCredToken.deploy();
    await token.waitForDeployment();
  });

  it("Should deploy with correct name and symbol", async function () {
    expect(await token.name()).to.equal("EduCred Token");
    expect(await token.symbol()).to.equal("EDUCT");
  });

  it("Should allow owner to mint credentials", async function () {
    const tx = await token.mintCredential(
      addr1.address,
      "Computer Science Degree",
      "Bachelor of Science in Computer Science",
      "Prestigious University",
      "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco"
    );

    await expect(tx)
      .to.emit(token, "CredentialMinted")
      .withArgs(0, addr1.address, "Computer Science Degree", "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco");
  });

  it("Should not allow non-owners to mint credentials", async function () {
    await expect(
      token.connect(addr1).mintCredential(
        addr1.address,
        "Fake Degree",
        "This should fail",
        "Fake University",
        "QmFha2VIYXNo"
      )
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("Should allow owner to revoke credentials", async function () {
    await token.mintCredential(
      addr1.address,
      "Revocable Degree",
      "This will be revoked",
      "Test University",
      "QmRevocableHash"
    );

    await expect(token.revokeCredential(0, "Degree revoked due to misconduct"))
      .to.emit(token, "CredentialRevoked")
      .withArgs(0, "Degree revoked due to misconduct");

    const [, , , , , isRevoked] = await token.getCredential(0);
    expect(isRevoked).to.be.true;
  });
});
