# ens-tagged-resolver

Simple resolver implementation that allows the owner of a contract to configure how set name should resolve to specific address.

## Resolver's interface

### setAddr(bytes32 node, address addr)
Sets a new address of a specified node. This method sets a `default` tag for given node. Every call of this function overwrites previous address. Only the current owner may call this function.

### setAddrForTag(bytes32 node, address addr, bytes32 tag)
Sets a new address of a specified node and tag. Only the current owner may call this function.

### addr(bytes32 node)
This method allows user to get a current address for specified node and under `default` tag.

### addrForTag(bytes32 node, bytes32 tag)
This method allows user to get a current address for specified node and tag.

## Usage

Before we start, let’s download `tagged-resolver-utils-testnet.js` which contains a few ABIs and helper functions that will make the process more straightforward.

```
loadScript('./tagged-resolver-utils-testnet.js')
```

To assign address to a node with `default` tag you can use the `setAddr` method. If you want to specify custom tag use the `setAddrForTag` method.

```
taggedResolverUtils.setAddr('0xb558248fc73bbad84ccf394d734cb12de2641ac1', 'test.eth', '0x969d74cbffb2ccca12876cd2150199b7866637f5');
taggedResolverUtils.setAddrForTag('0xb558248fc73bbad84ccf394d734cb12de2641ac1', 'test.eth', '0x969d74cbffb2ccca12876cd2150199b7866637f5', 'test');
```

To fetch address use the `getAddr` method or `getAddrForTag` if custom tag has been specified.

```
taggedResolverUtils.getAddr('0xb558248fc73bbad84ccf394d734cb12de2641ac1', 'test.eth');
taggedResolverUtils.getAddrForTag('0xb558248fc73bbad84ccf394d734cb12de2641ac1', 'test.eth', 'test');
```

## Contributing to repository
Any kind of contribution is welcomed.

# Found a bug? Have a question?

1. Create a new issue, assuming one does not already exist.
2. Clearly describe the problem including steps to reproduce when it is a bug.
3. If possible provide a Pull Request.
