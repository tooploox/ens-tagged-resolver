const chai = require("chai");
const { expect } = chai;

const PublicResolver = artifacts.require("../contracts/PublicResolver.sol");
const { taggedResolverUtils } = require("../tagged-resolver-utils-testnet");

contract("PublicResolver", (accounts) => {
  describe("taggedResolverUtils", () => {
    let publicResolver;

    before(async () => {
      publicResolver = await PublicResolver.new();
    });

    const node = web3.fromUtf8("test-node");
    const addr = accounts[0];
    const tag = web3.fromUtf8("123456789");

    describe("setAddrForTag", () => {
      it("sets an address for given tag", async () => {
        expect(await taggedResolverUtils.getAddrForTag(publicResolver.address, node, tag)).not.to.equal(addr);
        await taggedResolverUtils.setAddrForTag(publicResolver.address, node, addr, tag);
        expect(await taggedResolverUtils.getAddrForTag(publicResolver.address, node, tag)).to.equal(addr);
      });
    });

    describe("setAddr", () => {
      it("sets an address for default tag", async () => {
        expect(await taggedResolverUtils.getAddrForTag(publicResolver.address, node, 'default')).not.to.equal(addr);
        expect(await taggedResolverUtils.getAddr(publicResolver.address, node)).not.to.equal(addr);
        await taggedResolverUtils.setAddr(publicResolver.address, node, addr);
        expect(await taggedResolverUtils.getAddrForTag(publicResolver.address, node, 'default')).to.equal(addr);
        expect(await taggedResolverUtils.getAddr(publicResolver.address, node)).to.equal(addr);
      });
    });
  });
});
