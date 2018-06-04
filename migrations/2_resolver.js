var PublicResolver = artifacts.require("./PublicResolver.sol");

module.exports = function(deployer) {
  deployer.deploy(PublicResolver);
};
