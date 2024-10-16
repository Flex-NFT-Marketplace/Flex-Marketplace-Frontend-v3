export const storefrontErc721 =
{
    abi: [
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
                    "name": "role",
                    "type": "felt"
                },
                {
                    "name": "account",
                    "type": "felt"
                },
                {
                    "name": "sender",
                    "type": "felt"
                }
            ],
            "keys": [],
            "name": "RoleGranted",
            "type": "event"
        },
        {
            "data": [
                {
                    "name": "role",
                    "type": "felt"
                },
                {
                    "name": "account",
                    "type": "felt"
                },
                {
                    "name": "sender",
                    "type": "felt"
                }
            ],
            "keys": [],
            "name": "RoleRevoked",
            "type": "event"
        },
        {
            "data": [
                {
                    "name": "role",
                    "type": "felt"
                },
                {
                    "name": "previousAdminRole",
                    "type": "felt"
                },
                {
                    "name": "newAdminRole",
                    "type": "felt"
                }
            ],
            "keys": [],
            "name": "RoleAdminChanged",
            "type": "event"
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
                    "name": "tokenId",
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
                    "name": "approved",
                    "type": "felt"
                },
                {
                    "name": "tokenId",
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
                    "name": "owner",
                    "type": "felt"
                },
                {
                    "name": "operator",
                    "type": "felt"
                },
                {
                    "name": "approved",
                    "type": "felt"
                }
            ],
            "keys": [],
            "name": "ApprovalForAll",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "name": "owner",
                    "type": "felt"
                }
            ],
            "name": "initializer",
            "outputs": [],
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "interfaceId",
                    "type": "felt"
                }
            ],
            "name": "supportsInterface",
            "outputs": [
                {
                    "name": "success",
                    "type": "felt"
                }
            ],
            "stateMutability": "view",
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
            "inputs": [
                {
                    "name": "owner",
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
                    "name": "tokenId",
                    "type": "Uint256"
                }
            ],
            "name": "ownerOf",
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
                    "name": "tokenId",
                    "type": "Uint256"
                }
            ],
            "name": "getApproved",
            "outputs": [
                {
                    "name": "approved",
                    "type": "felt"
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
                    "name": "operator",
                    "type": "felt"
                }
            ],
            "name": "isApprovedForAll",
            "outputs": [
                {
                    "name": "isApproved",
                    "type": "felt"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "contractURI",
            "outputs": [
                {
                    "name": "contract_uri_len",
                    "type": "felt"
                },
                {
                    "name": "contract_uri",
                    "type": "felt*"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "tokenId",
                    "type": "Uint256"
                }
            ],
            "name": "tokenURI",
            "outputs": [
                {
                    "name": "tokenURI_len",
                    "type": "felt"
                },
                {
                    "name": "tokenURI",
                    "type": "felt*"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "tokenId",
                    "type": "Uint256"
                },
                {
                    "name": "salePrice",
                    "type": "Uint256"
                }
            ],
            "name": "royaltyInfo",
            "outputs": [
                {
                    "name": "receiver",
                    "type": "felt"
                },
                {
                    "name": "royaltyAmount",
                    "type": "Uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getDefaultRoyalty",
            "outputs": [
                {
                    "name": "receiver",
                    "type": "felt"
                },
                {
                    "name": "feeBasisPoints",
                    "type": "felt"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "role",
                    "type": "felt"
                },
                {
                    "name": "account",
                    "type": "felt"
                }
            ],
            "name": "hasRole",
            "outputs": [
                {
                    "name": "res",
                    "type": "felt"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "role",
                    "type": "felt"
                }
            ],
            "name": "getRoleAdmin",
            "outputs": [
                {
                    "name": "role_admin",
                    "type": "felt"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getMinterRole",
            "outputs": [
                {
                    "name": "res",
                    "type": "felt"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getBurnerRole",
            "outputs": [
                {
                    "name": "res",
                    "type": "felt"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getMintPrice",
            "outputs": [
                {
                    "name": "mint_price_amount",
                    "type": "Uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getFeeRecipient",
            "outputs": [
                {
                    "name": "fee_recipient",
                    "type": "felt"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "to",
                    "type": "felt"
                },
                {
                    "name": "tokenId",
                    "type": "Uint256"
                }
            ],
            "name": "approve",
            "outputs": [],
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "operator",
                    "type": "felt"
                },
                {
                    "name": "approved",
                    "type": "felt"
                }
            ],
            "name": "setApprovalForAll",
            "outputs": [],
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "from_",
                    "type": "felt"
                },
                {
                    "name": "to",
                    "type": "felt"
                },
                {
                    "name": "tokenId",
                    "type": "Uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [],
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "from_",
                    "type": "felt"
                },
                {
                    "name": "to",
                    "type": "felt"
                },
                {
                    "name": "tokenId",
                    "type": "Uint256"
                },
                {
                    "name": "data_len",
                    "type": "felt"
                },
                {
                    "name": "data",
                    "type": "felt*"
                }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "base_token_uri_len",
                    "type": "felt"
                },
                {
                    "name": "base_token_uri",
                    "type": "felt*"
                }
            ],
            "name": "setBaseURI",
            "outputs": [],
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "tokenId",
                    "type": "Uint256"
                },
                {
                    "name": "tokenURI_len",
                    "type": "felt"
                },
                {
                    "name": "tokenURI",
                    "type": "felt*"
                }
            ],
            "name": "setTokenURI",
            "outputs": [],
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "tokenId",
                    "type": "Uint256"
                }
            ],
            "name": "resetTokenURI",
            "outputs": [],
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "contract_uri_len",
                    "type": "felt"
                },
                {
                    "name": "contract_uri",
                    "type": "felt*"
                }
            ],
            "name": "setContractURI",
            "outputs": [],
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "receiver",
                    "type": "felt"
                },
                {
                    "name": "feeBasisPoints",
                    "type": "felt"
                }
            ],
            "name": "setDefaultRoyalty",
            "outputs": [],
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "tokenId",
                    "type": "Uint256"
                },
                {
                    "name": "receiver",
                    "type": "felt"
                },
                {
                    "name": "feeBasisPoints",
                    "type": "felt"
                }
            ],
            "name": "setTokenRoyalty",
            "outputs": [],
            "type": "function"
        },
        {
            "inputs": [],
            "name": "resetDefaultRoyalty",
            "outputs": [],
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "tokenId",
                    "type": "Uint256"
                }
            ],
            "name": "resetTokenRoyalty",
            "outputs": [],
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "tokenURI_len",
                    "type": "felt"
                },
                {
                    "name": "tokenURI",
                    "type": "felt*"
                }
            ],
            "name": "mint",
            "outputs": [],
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "toAccount",
                    "type": "felt"
                },
                {
                    "name": "tokenURI_len",
                    "type": "felt"
                },
                {
                    "name": "tokenURI",
                    "type": "felt*"
                }
            ],
            "name": "permissionedMint",
            "outputs": [],
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "tokenId",
                    "type": "Uint256"
                }
            ],
            "name": "permissionedBurn",
            "outputs": [],
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "role",
                    "type": "felt"
                },
                {
                    "name": "account",
                    "type": "felt"
                }
            ],
            "name": "grantRole",
            "outputs": [],
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "role",
                    "type": "felt"
                },
                {
                    "name": "account",
                    "type": "felt"
                }
            ],
            "name": "revokeRole",
            "outputs": [],
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "role",
                    "type": "felt"
                },
                {
                    "name": "account",
                    "type": "felt"
                }
            ],
            "name": "renounceRole",
            "outputs": [],
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "new_price",
                    "type": "Uint256"
                }
            ],
            "name": "setMintPrice",
            "outputs": [],
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "new_recipient",
                    "type": "felt"
                }
            ],
            "name": "setFeeRecipient",
            "outputs": [],
            "type": "function"
        }
    ]
};