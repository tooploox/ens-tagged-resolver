pragma solidity ^0.4.24;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";


contract PublicResolver is Ownable {
  bytes4 constant INTERFACE_META_ID = 0x01ffc9a7;
  bytes4 constant ADDR_INTERFACE_ID = 0x3b3b57de;

  event AddrSet(bytes32 indexed node, address addr, bytes32 tag);

  mapping (bytes32 => mapping (bytes32 => address)) records;

  constructor() public {}

  function setAddr(bytes32 node, address addr) public onlyOwner {
    setAddrForTag(node, addr, defaultTag());
  }

  function setAddrForTag(bytes32 node, address addr, bytes32 tag) public onlyOwner {
    require(node != 0, "node(bytes32) param is required");
    require(addr != 0, "address(address) param is required");
    require(tag != 0, "tag(bytes32) param is required");
    records[node][tag] = addr;
    emit AddrSet(node, addr, tag);
  }

  function addr(bytes32 node) public view returns (address) {
    return addrForTag(node, defaultTag());
  }

  function addrForTag(bytes32 node, bytes32 tag) public view returns (address) {
    return records[node][tag];
  }

  function supportsInterface(bytes4 interfaceID) public view returns (bool) {
    return interfaceID == ADDR_INTERFACE_ID || interfaceID == INTERFACE_META_ID;
  }

  function defaultTag() private pure returns (bytes32) {
    return bytes32("default");
  }
}
