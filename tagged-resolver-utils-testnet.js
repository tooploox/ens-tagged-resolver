var taggedResolverUtils = {
  namehash: function namehash(name) {
    var node = '0x0000000000000000000000000000000000000000000000000000000000000000';
    if (name !== '') {
      var labels = name.split(".");
      for (var i = labels.length - 1; i >= 0; i--) {
        node = web3.sha3(node + web3.sha3(labels[i]).slice(2), { encoding: 'hex' });
      }
    }
    return node.toString();
  },
  PublicResolver: web3.eth.contract([
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "node",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "name": "addr",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "tag",
          "type": "bytes32"
        }
      ],
      "name": "AddrSet",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "node",
          "type": "bytes32"
        },
        {
          "name": "addr",
          "type": "address"
        }
      ],
      "name": "setAddr",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "node",
          "type": "bytes32"
        },
        {
          "name": "addr",
          "type": "address"
        },
        {
          "name": "tag",
          "type": "bytes32"
        }
      ],
      "name": "setAddrForTag",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "node",
          "type": "bytes32"
        }
      ],
      "name": "addr",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "node",
          "type": "bytes32"
        },
        {
          "name": "tag",
          "type": "bytes32"
        }
      ],
      "name": "addrForTag",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]),
  setAddr: function setAddr(resolverAddress, domain, address) {
    var node = this.namehash(domain);
    var resolver = this.PublicResolver.at(resolverAddress);

    return resolver.setAddr(node, address, { from: web3.eth.accounts[0] });
  },
  setAddrForTag: function setAddr(resolverAddress, domain, address, tag) {
    var node = this.namehash(domain);
    var resolver = this.PublicResolver.at(resolverAddress);

    return resolver.setAddrForTag(node, address, tag, { from: web3.eth.accounts[0] });
  },
  getAddr: function getAddr(resolverAddress, domain) {
    var node = this.namehash(domain);
    var resolver = this.PublicResolver.at(resolverAddress);

    return resolver.addr(node, { from: web3.eth.accounts[0] });
  },
  getAddrForTag: function getAddr(resolverAddress, domain, tag) {
    var node = this.namehash(domain);
    var resolver = this.PublicResolver.at(resolverAddress);

    return resolver.addrForTag(node, tag, { from: web3.eth.accounts[0] });
  }
};
