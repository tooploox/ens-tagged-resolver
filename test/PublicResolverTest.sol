pragma solidity 0.4.24;

import "truffle/Assert.sol";
import "../contracts/PublicResolver.sol";


contract PublicResolverTest {
  PublicResolver publicResolver = new PublicResolver();
  address constant ADDR = 0x627306090abaB3A6e1400e9345bC60c78a8BEf57;

  function testSettingOwner() public {
    Assert.equal(publicResolver.owner(), address(this), "owner address is invalid");
  }

  function testAddingNewDefaultAddress() public {
    bytes32 node = bytes32("test");
    bytes32 defaultTag = bytes32("default");
    publicResolver.setAddr(node, ADDR);
    Assert.equal(publicResolver.addr(node), ADDR, "address doesn't exists after it was set");
    Assert.equal(publicResolver.addr(node, defaultTag), ADDR, "address doesn't exists after it was set");
  }

  function testAddingNewDefaultAddressWithCustomTag() public {
    bytes32 node = bytes32("test");
    bytes32 customTag = bytes32("custom-tag");
    publicResolver.setAddr(node, ADDR, customTag);
    Assert.equal(publicResolver.addr(node, customTag), ADDR, "address doesn't exists after it was set");
  }

  function testPreventingFromAddingAddressWithMissingNode() public {
    bool result = address(publicResolver).call(bytes4(keccak256("setAddr(bytes32,address)")), bytes32(""), ADDR);
    Assert.equal(result, false, "its doesn't fail when setting node");
  }

  function testPreventingFromAddingAddressWithMissingAddress() public {
    bool result = address(publicResolver).call(bytes4(keccak256("setAddr(bytes32,address)")), bytes32("test"), "");
    Assert.equal(result, false, "its doesn't fail when setting address");
  }

  function testPreventingFromAddingAddressWithMissingCustomTag() public {
    bool result = address(publicResolver).call(bytes4(keccak256("setAddr(bytes32,address,bytes32)")), bytes32("test"), ADDR, bytes32(""));
    Assert.equal(result, false, "its doesn't fail when setting custom Tag");
  }
}
