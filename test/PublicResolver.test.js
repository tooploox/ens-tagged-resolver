const chai = require("chai");
const { expect } = chai;

const PublicResolver = artifacts.require("../contracts/PublicResolver.sol");

contract("PublicResolverTest", (accounts) => {
  const addr = accounts[0];
  const node = web3.fromUtf8("test-node");
  const customTag = web3.fromUtf8("123456789");
  const defaultTag  = web3.fromUtf8("default");

  let publicResolver;

  before(async () => {
    publicResolver = await PublicResolver.new();
  });

  describe("setAddr", () => {
    it("emits AddrChanged and AddrChangedForTag when setting the address", async () => {
      const tx = await publicResolver.setAddr(node, addr);

      expect(tx.logs.length).to.equal(2);

      const [AddrChangedForTag, AddrChanged] = tx.logs;

      expect(AddrChangedForTag.event).to.equal("AddrChangedForTag");
      expect(AddrChangedForTag.args).to.deep.equal({
        node: web3.padRight(node, 66),
        a: addr,
        tag: web3.padRight(defaultTag, 66)
      });

      expect(AddrChanged.event).to.equal("AddrChanged");
      expect(AddrChanged.args).to.deep.equal({
        node: web3.padRight(node, 66),
        a: addr,
      });
    });
  });

  describe("setAddForTag", () => {
    it("emits AddrChangedForTag when setting the address for a custom tag", async () => {
      const tx = await publicResolver.setAddrForTag(node, addr, customTag);

      expect(tx.logs.length).to.equal(1);

      const [AddrChangedForTag] = tx.logs;

      expect(AddrChangedForTag.event).to.equal("AddrChangedForTag");
      expect(AddrChangedForTag.args).to.deep.equal({
        node: web3.padRight(node, 66),
        a: addr,
        tag: web3.padRight(customTag, 66)
      });
    });
  });
});
