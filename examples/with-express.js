const express = require("express");
const Web3 = require("web3");

const { taggedResolverUtils } = require("../tagged-resolver-utils");

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
const resolver = taggedResolverUtils(web3);

const RESOLVER = "0x345ca3e014aaf5dca488057592ee47305d9b3e10";
const app = express();

app.get("/getAddr", (req, res) => {
  const addr = resolver.getAddr(RESOLVER, "libellum.eth");
  res.send({ addr });
});

app.post("/setAddr", (req, res) => {
  const txhash = resolver.setAddr(RESOLVER, "libellum.eth", "0xF56547A13c8d62bCE5359C20f33bA570D864f01B");
  res.send({ txhash });
});

app.listen(3000);
