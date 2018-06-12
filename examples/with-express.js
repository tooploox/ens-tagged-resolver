const express = require("express");
const bodyParser = require("body-parser");
const Web3 = require("web3");

const { taggedResolverUtils } = require("../tagged-resolver-utils");

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
const resolver = taggedResolverUtils(web3);

const RESOLVER = "0x43c26d5a8ac0b72f4688648f979c8d4ef27d782d";
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/addresses/:domain/:tag", (req, res) => {
  const addr = resolver.getAddrForTag(RESOLVER, req.params.domain, req.params.tag);
  res.send({ addr });
});

// An example request to the end-point:
//
// curl -X POST \
//         http://localhost:3000/addresses \
//           -H 'content-type: application/json' \
//           -d '{
//                 "domain": "libellum.eth",
//                 "address": "0xF56547A13c8d62bCE5359C20f33bA570D864f01B",
//                 "tag": "default"
//               }'

app.post("/addresses", (req, res) => {
  const txhash = resolver.setAddrForTag(RESOLVER, req.body.domain, req.body.address, req.body.tag);
  res.send({ txhash });
});

app.listen(3000);
