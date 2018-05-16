# ens-tagged-resolver

## Goals

* ENS rules are not optimal for rapid development. Test domain expires after 28 days, and .eth requires an auction.
* You can specify a tag or version for your address.
* TaggedResolver is ENS-compatible and implements [ResolverInterface](https://github.com/ensdomains/ens/blob/master/contracts/ResolverInterface.sol).
* The utility does not depend on web3 or works with both web3 0.2x.x and 1.0 (TBD)
