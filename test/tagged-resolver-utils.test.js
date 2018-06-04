const chai = require("chai");
const { expect } = chai;

const PublicResolver = artifacts.require("../contracts/PublicResolver.sol");
const { taggedResolverUtils } = require("../tagged-resolver-utils");

contract("PublicResolver", (accounts) => {
  describe("taggedResolverUtils", () => {
    let resolver, utils;

    beforeEach(async () => {
      resolver = (await PublicResolver.new()).address;
      utils = taggedResolverUtils(web3);
    });

    const addr = accounts[0];
    const domain = web3.fromUtf8("test-domain.eth");
    const tag = web3.fromUtf8("123456789");

    describe("setAddrForTag", () => {
      it("sets an address for given tag", async () => {
        expect(await utils.getAddrForTag(resolver, domain, tag)).not.to.equal(addr);
        await utils.setAddrForTag(resolver, domain, addr, tag);
        expect(await utils.getAddrForTag(resolver, domain, tag)).to.equal(addr);
      });
    });

    describe("setAddr", () => {
      it("sets an address for default tag", async () => {
        expect(await utils.getAddrForTag(resolver, domain, "default")).not.to.equal(addr);
        expect(await utils.getAddr(resolver, domain)).not.to.equal(addr);
        await utils.setAddr(resolver, domain, addr);
        expect(await utils.getAddrForTag(resolver, domain, "default")).to.equal(addr);
        expect(await utils.getAddr(resolver, domain)).to.equal(addr);
      });
    });

    describe("setTagAsDefault", () => {
      it("sets a tag as default tag", async () => {
        await utils.setAddrForTag(resolver, domain, addr, "v1");
        expect(await utils.getAddrForTag(resolver, domain, "default")).not.to.equal(addr);
        expect(await utils.getAddr(resolver, domain)).not.to.equal(addr);
        await utils.setTagAsDefault(resolver, domain, "v1");
        expect(await utils.getAddrForTag(resolver, domain, "default")).to.equal(addr);
        expect(await utils.getAddr(resolver, domain)).to.equal(addr);
      });
    });
  });
});
