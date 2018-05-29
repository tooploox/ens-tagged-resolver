pragma solidity 0.4.24;

import "truffle/Assert.sol";
import "../contracts/PublicResolver.sol";


contract PublicResolverTest {
  PublicResolver publicResolver;
  address constant ADDR = 0x627306090abaB3A6e1400e9345bC60c78a8BEf57;
  address constant ZERO = 0x0000000000000000000000000000000000000000;

  bytes4 constant setAddrSelector = bytes4(keccak256("setAddr(bytes32,address)"));
  bytes4 constant setAddrForTagSelector = bytes4(keccak256("setAddrForTag(bytes32,address,bytes32)"));

  function testSettingOwner() public {
    Assert.equal(publicResolver.owner(), address(this), "an owner's address is invalid");
  }

  function beforeEach() public {
    publicResolver = new PublicResolver();
  }

  function testAddingNewDefaultAddress() public {
    bytes32 node = bytes32("test");
    bytes32 defaultTag = bytes32("default");
    publicResolver.setAddr(node, ADDR);
    Assert.equal(publicResolver.addr(node), ADDR, "the address doesn't exist after it was set");
    Assert.equal(publicResolver.addrForTag(node, defaultTag), ADDR, "the address doesn't exist after it was set");
    Assert.equal(publicResolver.addrForTag(node, bytes32("foo")), ZERO, "address returned for not exisitng tag");
  }

  function testAddingNewDefaultAddressWithCustomTag() public {
    bytes32 node = bytes32("test");
    bytes32 customTag = bytes32("custom-tag");
    publicResolver.setAddrForTag(node, ADDR, customTag);
    Assert.equal(publicResolver.addrForTag(node, customTag), ADDR, "the address doesn't exist after it was set");
    Assert.equal(publicResolver.addr(node), ZERO, "address returned but default tag wasn't set");
  }

  function testPreventingFromAddingAddressWithMissingNode() public {
    bool result = address(publicResolver).call(setAddrSelector, bytes32(""), ADDR);
    Assert.equal(result, false, "it doesn't fail when setting an empty node");
  }

  function testPreventingFromAddingAddressWithMissingAddress() public {
    bool result = address(publicResolver).call(setAddrSelector, bytes32("test"), "");
    Assert.equal(result, false, "it doesn't fail when setting an empty address");
  }

  function testPreventingFromAddingAddressWithMissingCustomTag() public {
    bool result = address(publicResolver).call(setAddrForTagSelector, bytes32("test"), ADDR, bytes32(""));
    Assert.equal(result, false, "it doesn't fail when setting an empty tag");
  }

  function testSupportingInterface() public {
    Assert.equal(publicResolver.supportsInterface(0x01ffc9a7), true, "it doesn't support INTERFACE_META_ID interface");
    Assert.equal(publicResolver.supportsInterface(0x3b3b57de), true, "it doesn't support ADDR_INTERFACE_ID interface");
    Assert.equal(publicResolver.supportsInterface(0x11111111), false, "it supports invalid interface");
  }
}
