const Web3 = require("web3");
const PrivateKeyProvider = require("truffle-privatekey-provider");
const isNil = require("lodash/fp/isNil");

const provider = new PrivateKeyProvider(
  process.env.ADDRESS_MANAGER_WALLET_PK,
  process.env.ADDRESS_MANAGER_PROVIDER,
);

const web3 = new Web3(provider);

function keccak256(...args) {
  return web3.utils.soliditySha3(...args.filter(v => !isNil(v))) || "0x00";
}

module.exports.web3 = web3;
module.exports.keccak256 = keccak256;
