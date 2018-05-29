pragma solidity 0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "./TaggedResolverInterface.sol";


contract PublicResolver is TaggedResolverInterface, Ownable {
  bytes4 constant INTERFACE_META_ID = 0x01ffc9a7;
  bytes4 constant ADDR_INTERFACE_ID = 0x3b3b57de;

  event AddrChanged(bytes32 indexed node, address a);
  event AddrChangedForTag(bytes32 indexed node, address a, bytes32 tag);

  mapping (bytes32 => mapping (bytes32 => address)) records;

  constructor() public {}

  function setAddr(bytes32 _node, address _addr) public onlyOwner {
    doSetAddrForTag(_node, _addr, defaultTag());
    emit AddrChanged(_node, _addr);
  }

  function setAddrForTag(bytes32 _node, address _addr, bytes32 _tag) public onlyOwner {
    doSetAddrForTag(_node, _addr, _tag);
  }

  function doSetAddrForTag(bytes32 _node, address _addr, bytes32 _tag) private {
    require(_node != 0, "node is required");
    require(_addr != 0, "address is required");
    require(_tag != 0, "tag is required");
    records[_node][_tag] = _addr;
    emit AddrChangedForTag(_node, _addr, _tag);
  }

  function addr(bytes32 _node) public view returns (address) {
    return addrForTag(_node, defaultTag());
  }

  function addrForTag(bytes32 _node, bytes32 _tag) public view returns (address) {
    return records[_node][_tag];
  }

  function supportsInterface(bytes4 _interfaceID) public pure returns (bool) {
    return _interfaceID == ADDR_INTERFACE_ID ||
           _interfaceID == INTERFACE_META_ID;
  }

  function defaultTag() private pure returns (bytes32) {
    return bytes32("default");
  }
}
