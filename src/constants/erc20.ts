const erc20 = {
  "abi": [
    {
      "members": [
        {
          "name": "low",
          "offset": 0,
          "type": "felt"
        },
        {
          "name": "high",
          "offset": 1,
          "type": "felt"
        }
      ],
      "name": "Uint256",
      "size": 2,
      "type": "struct"
    },
    {
      "data": [
        {
          "name": "from_",
          "type": "felt"
        },
        {
          "name": "to",
          "type": "felt"
        },
        {
          "name": "value",
          "type": "Uint256"
        }
      ],
      "keys": [],
      "name": "Transfer",
      "type": "event"
    },
    {
      "data": [
        {
          "name": "owner",
          "type": "felt"
        },
        {
          "name": "spender",
          "type": "felt"
        },
        {
          "name": "value",
          "type": "Uint256"
        }
      ],
      "keys": [],
      "name": "Approval",
      "type": "event"
    },
    {
      "data": [
        {
          "name": "account",
          "type": "felt"
        }
      ],
      "keys": [],
      "name": "Paused",
      "type": "event"
    },
    {
      "data": [
        {
          "name": "account",
          "type": "felt"
        }
      ],
      "keys": [],
      "name": "Unpaused",
      "type": "event"
    },
    {
      "data": [
        {
          "name": "previousOwner",
          "type": "felt"
        },
        {
          "name": "newOwner",
          "type": "felt"
        }
      ],
      "keys": [],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "data": [
        {
          "name": "implementation",
          "type": "felt"
        }
      ],
      "keys": [],
      "name": "Upgraded",
      "type": "event"
    },
    {
      "data": [
        {
          "name": "previousAdmin",
          "type": "felt"
        },
        {
          "name": "newAdmin",
          "type": "felt"
        }
      ],
      "keys": [],
      "name": "AdminChanged",
      "type": "event"
    },
    {
      "inputs": [
        {
          "name": "owner",
          "type": "felt"
        },
        {
          "name": "recipient",
          "type": "felt"
        },
        {
          "name": "proxy_admin",
          "type": "felt"
        }
      ],
      "name": "initializer",
      "outputs": [],
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "name": "name",
          "type": "felt"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "name": "symbol",
          "type": "felt"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "name": "totalSupply",
          "type": "Uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "name": "decimals",
          "type": "felt"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "account",
          "type": "felt"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "balance",
          "type": "Uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "owner",
          "type": "felt"
        },
        {
          "name": "spender",
          "type": "felt"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "name": "remaining",
          "type": "Uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "paused",
      "outputs": [
        {
          "name": "paused",
          "type": "felt"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "owner",
          "type": "felt"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "recipient",
          "type": "felt"
        },
        {
          "name": "amount",
          "type": "Uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "name": "success",
          "type": "felt"
        }
      ],
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "sender",
          "type": "felt"
        },
        {
          "name": "recipient",
          "type": "felt"
        },
        {
          "name": "amount",
          "type": "Uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "name": "success",
          "type": "felt"
        }
      ],
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "spender",
          "type": "felt"
        },
        {
          "name": "amount",
          "type": "Uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "name": "success",
          "type": "felt"
        }
      ],
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "spender",
          "type": "felt"
        },
        {
          "name": "added_value",
          "type": "Uint256"
        }
      ],
      "name": "increaseAllowance",
      "outputs": [
        {
          "name": "success",
          "type": "felt"
        }
      ],
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "spender",
          "type": "felt"
        },
        {
          "name": "subtracted_value",
          "type": "Uint256"
        }
      ],
      "name": "decreaseAllowance",
      "outputs": [
        {
          "name": "success",
          "type": "felt"
        }
      ],
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "newOwner",
          "type": "felt"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "type": "function"
    },
    {
      "inputs": [],
      "name": "pause",
      "outputs": [],
      "type": "function"
    },
    {
      "inputs": [],
      "name": "unpause",
      "outputs": [],
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "new_implementation",
          "type": "felt"
        }
      ],
      "name": "upgrade",
      "outputs": [],
      "type": "function"
    }
  ],
};
export const erc20Abi = erc20.abi;
