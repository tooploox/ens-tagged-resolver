const chai = require("chai");
const { expect } = chai;

const PublicResolver = artifacts.require("../contracts/PublicResolver.sol");

contract("PublicResolverTest", (accounts) => {
  const [owner] = accounts;
  const node = web3.fromUtf8("test-node");
  const addr = accounts[0];
  const tag  = web3.fromUtf8("123456789");

  let publicResolver;

  before(async () => {
    publicResolver = await PublicResolver.new();
  });

  describe("setAddr", () => {
    it("emits event when setting custom tag", async () => {
      const tx = await publicResolver.setAddr(node, addr, tag);
      const [AddrSet] = tx.logs;

      expect(AddrSet.event).to.equal("AddrSet");
      expect(AddrSet.args).to.deep.equal({
        node: web3.padRight(node, 66),
        addr: addr,
        tag: web3.padRight(tag, 66)
      });
    });
  });
});
