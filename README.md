# Tagged Public Resolver

Tagged Public Resolver is a smart contract on Ethereum blockchain that points unique domain names to addresses. You can use it to simplify managing and synchronizing addresses within the project. This simple implementation of a resolver allows you to set names together with tags as well.

## Why it's useful?

Have you ever experienced a problem with managing addresses within multiple environments (dev/test/staging/production)? Have you had a problem with synchronizing them within the team of developers? Does your infrastructure consist of smart contracts and oracles? If so, Tagged Public Resolver can be useful for you.

You can deploy this contract on your own and specify names that point to specific addresses in Ethereum network. Each of address can be additionally tagged ('v1', 'test', 'dev', etc.).

The contract is also compatible with [ENS (Ethereum Name Service)](https://docs.ens.domains/en/latest/implementers.html#writing-a-resolver), however during rapid development time, you don't need to register the domain, since our Utils script (described in 'Usage' section below) allows to explicitly point to resolver's address (without relying on official ENS). Once you decide that you want to register the domain, you can point your ENS domain to this resolver.

## Resolver's public interface

### setAddr(bytes32 node, address addr)
Sets a new address of a specified node. This method sets a `default` tag for given node. Every call of this function overwrites previous address. Only the current owner may call this function.

### setAddrForTag(bytes32 node, address addr, bytes32 tag)
Sets a new address of a specified node and tag. Only the current owner may call this function.

### addr(bytes32 node)
This method allows user to get a current address for specified node and under `default` tag.

### addrForTag(bytes32 node, bytes32 tag)
This method allows user to get a current address for specified node and tag.

## Usage

We prepared a set of helpers that make the process more straightforward.

First, you have to download the `tagged-resolver-utils.js` file from this github repository which contains ABI of the contract and helper functions.

Than you have to load the file. In `geth` console you can do as follows:

```
loadScript('./tagged-resolver-utils.js')
```

In nodeJS you can require the module:

```js
const { taggedResolverUtils } = require("tagged-resolver-utils");
```

Now you can assign an address to any domain by `setAddr(resolverAddress, address, domain)` function. The address will be tagged as `default`. The `resolverAddress` argument is the address of deployed `PublicResolver` contract.


```js
taggedResolverUtils.setAddr('0xb558248fc73bbad84ccf394d734cb12de2641ac1', 'my-awesome-contract.test.eth', '0x969d74cbffb2ccca12876cd2150199b7866637f5');
```

To check the address use the `getAddr(resolverAddress, domain)` function. It will return an address for `defualt` tag.

```js
taggedResolverUtils.getAddr('0xb558248fc73bbad84ccf394d734cb12de2641ac1', 'my-awesome-contract.test.eth');
```

You can also specify any other tag by `setAddrForTag(resolverAddress, address, domain, tag)` function

```js
taggedResolverUtils.setAddrForTag('0xb558248fc73bbad84ccf394d734cb12de2641ac1', 'my-awesome-contract.test.eth', '0x969d74cbffb2ccca12876cd2150199b7866637f5', 'production');
```

To check the address for specific tag you have to use `getAddrForTag(resolverAddress, tag)` function.

```js
taggedResolverUtils.getAddrForTag('0xb558248fc73bbad84ccf394d734cb12de2641ac1', 'my-awesome-contract.test.eth', 'production');
```

There is a possibility to set existing tag as default by `setTagAsDefault(resolverAddress, tag)` function.

```js
taggedResolverUtils.setTagAsDefault('0xb558248fc73bbad84ccf394d734cb12de2641ac1', 'my-awesome-contract.test.eth', 'v1');
```

## Deployment

You can simply deploy

```
$ truffle migrate --network ganache
```

You can find configuration for `ganache`, `ropsten`, `rinkeby`, and `kovan` networks in `truffle.js`.


## Contributing to repository

Any kind of contribution is welcomed.

## Found a bug? Have a question?

1. Create a new issue, assuming one does not already exist.
2. Clearly describe the problem including steps to reproduce when it is a bug.
3. If possible provide a Pull Request.
