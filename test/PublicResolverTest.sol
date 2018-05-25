pragma solidity 0.4.24;

import "truffle/Assert.sol";
import "../contracts/PublicResolver.sol";


contract PublicResolverTest {
  PublicResolver publicResolver;
  address constant ADDR = 0x627306090abaB3A6e1400e9345bC60c78a8BEf57;

  function testSettingOwner() public {
    Assert.equal(publicResolver.owner(), address(this), "an owner's address is invalid");
  }

  function beforeEach() {
    publicResolver = new PublicResolver();
  }

  function testAddingNewDefaultAddress() public {
    bytes32 node = bytes32("test");
    bytes32 defaultTag = bytes32("default");
    publicResolver.setAddr(node, ADDR);
    Assert.equal(publicResolver.addr(node), ADDR, "the address doesn't exist after it was set");
    Assert.equal(publicResolver.addrForTag(node, defaultTag), ADDR, "the address doesn't exist after it was set");
    Assert.notEqual(publicResolver.addrForTag(node, bytes32("foo")), ADDR, "the address exists for custom tag even though it was set or the default tag");
  }

  function testAddingNewDefaultAddressWithCustomTag() public {
    bytes32 node = bytes32("test");
    bytes32 customTag = bytes32("custom-tag");
    publicResolver.setAddrForTag(node, ADDR, customTag);
    Assert.equal(publicResolver.addrForTag(node, customTag), ADDR, "the address doesn't exist after it was set");
    Assert.notEqual(publicResolver.addr(node), ADDR, "the address exists for default tag even though it was set or a custom tag");
  }

  function testPreventingFromAddingAddressWithMissingNode() public {
    bool result = address(publicResolver).call(bytes4(keccak256("setAddr(bytes32,address)")), bytes32(""), ADDR);
    Assert.equal(result, false, "it doesn't fail when setting a node");
  }

  function testPreventingFromAddingAddressWithMissingAddress() public {
    bool result = address(publicResolver).call(bytes4(keccak256("setAddr(bytes32,address)")), bytes32("test"), "");
    Assert.equal(result, false, "it doesn't fail when setting an address");
  }

  function testPreventingFromAddingAddressWithMissingCustomTag() public {
    bool result = address(publicResolver).call(bytes4(keccak256("setAddrForTag(bytes32,address,bytes32)")), bytes32("test"), ADDR, bytes32(""));
    Assert.equal(result, false, "it doesn't fail when setting a custom tag");
  }
}
