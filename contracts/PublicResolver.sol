pragma solidity ^0.4.24;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";

contract PublicResolver is Ownable {
    event AddrSet(bytes32 indexed node, address a, bytes32 tag);

    mapping (bytes32 => mapping (bytes32 => address)) records;

    constructor() public {}

    function setAddr(bytes32 node, address addr) public onlyOwner {
        setAddr(node, addr, 'latest');
    }

    function setAddr(bytes32 node, address addr, bytes32 tag) public onlyOwner {
        records[node][tag] = addr;
        emit AddrSet(node, addr, tag);
    }

    function addr(bytes32 node, bytes32 tag) public view returns (address) {
        return records[node][tag];
    }
}
