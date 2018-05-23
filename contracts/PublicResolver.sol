pragma solidity ^0.4.24;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";


contract PublicResolver is Ownable {
  event AddrSet(bytes32 indexed node, address addr, bytes32 tag);

  mapping (bytes32 => mapping (bytes32 => address)) records;

  constructor() public {}

  function setAddr(bytes32 node, address addr) public onlyOwner {
    setAddr(node, addr, defaultTag());
  }

  function setAddr(bytes32 node, address addr, bytes32 tag) public onlyOwner {
    require(node != 0, "Node must be set");
    require(addr != 0, "Address must be set");
    require(tag != 0, "Tag must be set");
    records[node][tag] = addr;
    emit AddrSet(node, addr, tag);
  }

  function addr(bytes32 node) public view returns (address) {
    return addr(node, defaultTag());
  }

  function addr(bytes32 node, bytes32 tag) public view returns (address) {
    return records[node][tag];
  }

  function defaultTag() private pure returns (bytes32) {
    return bytes32("default");
  }
}
