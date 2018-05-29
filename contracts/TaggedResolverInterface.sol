pragma solidity 0.4.24;


interface TaggedResolverInterface {
  function addr(bytes32 _node) external view returns (address);
  function setAddr(bytes32 _node, address _addr) external;
  function setAddrForTag(bytes32 _node, address _addr, bytes32 _tag) external;
}
