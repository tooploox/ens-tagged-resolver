const chai = require("chai");
const { expect } = chai;

const PublicResolver = artifacts.require("../contracts/PublicResolver.sol");
const { taggedResolverUtils } = require("../tagged-resolver-utils");

contract("PublicResolver", (accounts) => {
  describe("taggedResolverUtils", () => {
    let publicResolver;

    beforeEach(async () => {
      publicResolver = await PublicResolver.new();
    });

    const addr = accounts[0];
    const domain = web3.fromUtf8("test-domain.eth");
    const tag = web3.fromUtf8("123456789");

    describe("setAddrForTag", () => {
      it("sets an address for given tag", async () => {
        expect(await taggedResolverUtils.getAddrForTag(publicResolver.address, domain, tag)).not.to.equal(addr);
        await taggedResolverUtils.setAddrForTag(publicResolver.address, domain, addr, tag);
        expect(await taggedResolverUtils.getAddrForTag(publicResolver.address, domain, tag)).to.equal(addr);
      });
    });

    describe("setAddr", () => {
      it("sets an address for default tag", async () => {
        expect(await taggedResolverUtils.getAddrForTag(publicResolver.address, domain, "default")).not.to.equal(addr);
        expect(await taggedResolverUtils.getAddr(publicResolver.address, domain)).not.to.equal(addr);
        await taggedResolverUtils.setAddr(publicResolver.address, domain, addr);
        expect(await taggedResolverUtils.getAddrForTag(publicResolver.address, domain, "default")).to.equal(addr);
        expect(await taggedResolverUtils.getAddr(publicResolver.address, domain)).to.equal(addr);
      });
    });

    describe("setTagAsDefault", () => {
      it("sets a tag as default tag", async () => {
        await taggedResolverUtils.setAddrForTag(publicResolver.address, domain, addr, "v1");
        expect(await taggedResolverUtils.getAddrForTag(publicResolver.address, domain, "default")).not.to.equal(addr);
        expect(await taggedResolverUtils.getAddr(publicResolver.address, domain)).not.to.equal(addr);
        await taggedResolverUtils.setTagAsDefault(publicResolver.address, domain, "v1");
        expect(await taggedResolverUtils.getAddrForTag(publicResolver.address, domain, "default")).to.equal(addr);
        expect(await taggedResolverUtils.getAddr(publicResolver.address, domain)).to.equal(addr);
      });
    });
  });
});
