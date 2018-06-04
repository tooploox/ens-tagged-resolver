var express = require('express');
var router = express.Router();
var { web3 } = require("../web3");
var { taggedResolverUtils } = require('../../../tagged-resolver-utils');

router.get('/:resolverAddress/:domain/:tag', async function(req, res, next) {
  var address = await taggedResolverUtils(web3).getAddrForTag(req.params.resolverAddress, req.params.domain, req.params.tag);
  res.send(`Domain ${req.params.domain} resolved with address ${address} for tag ${req.params.tag}`);
});

module.exports = router;
