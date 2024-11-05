export const abiTestnet = [
  {
    name: "NonFungibleFlexDropTokenImpl",
    type: "impl",
    interface_name: "openedition::interfaces::IAtemuPackToken::IAtemuPackToken",
  },
  {
    name: "core::bool",
    type: "enum",
    variants: [
      {
        name: "False",
        type: "()",
      },
      {
        name: "True",
        type: "()",
      },
    ],
  },
  {
    name: "openedition::interfaces::IAtemuPackToken::IAtemuPackToken",
    type: "interface",
    items: [
      {
        name: "change_phase",
        type: "function",
        inputs: [
          {
            name: "phase_id",
            type: "core::integer::u64",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "add_gtd_wallets",
        type: "function",
        inputs: [
          {
            name: "wallets",
            type: "core::array::Array::<core::starknet::contract_address::ContractAddress>",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "remove_gtd_wallets",
        type: "function",
        inputs: [
          {
            name: "wallets",
            type: "core::array::Array::<core::starknet::contract_address::ContractAddress>",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "add_whitelisted_wallets",
        type: "function",
        inputs: [
          {
            name: "wallets",
            type: "core::array::Array::<core::starknet::contract_address::ContractAddress>",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "remove_whitelisted_wallets",
        type: "function",
        inputs: [
          {
            name: "wallets",
            type: "core::array::Array::<core::starknet::contract_address::ContractAddress>",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "permission_mint",
        type: "function",
        inputs: [
          {
            name: "to",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "mint_internal",
        type: "function",
        inputs: [],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "mint_gtd",
        type: "function",
        inputs: [],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "mint_whitelisted",
        type: "function",
        inputs: [],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "mint_public",
        type: "function",
        inputs: [],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "is_wallet_gtd",
        type: "function",
        inputs: [
          {
            name: "wallet",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "is_wallet_whitelisted",
        type: "function",
        inputs: [
          {
            name: "wallet",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "is_wallet_gtd_minted",
        type: "function",
        inputs: [
          {
            name: "wallet",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "is_wallet_whitelisted_minted",
        type: "function",
        inputs: [
          {
            name: "wallet",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "is_wallet_public_minted",
        type: "function",
        inputs: [
          {
            name: "wallet",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "view",
      },
    ],
  },
  {
    name: "ERC721Impl",
    type: "impl",
    interface_name: "openedition::interfaces::IERC721::IERC721",
  },
  {
    name: "core::integer::u256",
    type: "struct",
    members: [
      {
        name: "low",
        type: "core::integer::u128",
      },
      {
        name: "high",
        type: "core::integer::u128",
      },
    ],
  },
  {
    name: "core::array::Span::<core::felt252>",
    type: "struct",
    members: [
      {
        name: "snapshot",
        type: "@core::array::Array::<core::felt252>",
      },
    ],
  },
  {
    name: "openedition::interfaces::IERC721::IERC721",
    type: "interface",
    items: [
      {
        name: "balance_of",
        type: "function",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "owner_of",
        type: "function",
        inputs: [
          {
            name: "token_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "safe_transfer_from",
        type: "function",
        inputs: [
          {
            name: "from",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "to",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "token_id",
            type: "core::integer::u256",
          },
          {
            name: "data",
            type: "core::array::Span::<core::felt252>",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "transfer_from",
        type: "function",
        inputs: [
          {
            name: "from",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "to",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "token_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "approve",
        type: "function",
        inputs: [
          {
            name: "to",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "token_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "set_approval_for_all",
        type: "function",
        inputs: [
          {
            name: "operator",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "approved",
            type: "core::bool",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "get_approved",
        type: "function",
        inputs: [
          {
            name: "token_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "is_approved_for_all",
        type: "function",
        inputs: [
          {
            name: "owner",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "operator",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "view",
      },
    ],
  },
  {
    name: "ERC721CamelImpl",
    type: "impl",
    interface_name: "openedition::interfaces::IERC721::IERC721CamelOnly",
  },
  {
    name: "openedition::interfaces::IERC721::IERC721CamelOnly",
    type: "interface",
    items: [
      {
        name: "balanceOf",
        type: "function",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "ownerOf",
        type: "function",
        inputs: [
          {
            name: "tokenId",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "safeTransferFrom",
        type: "function",
        inputs: [
          {
            name: "from",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "to",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "tokenId",
            type: "core::integer::u256",
          },
          {
            name: "data",
            type: "core::array::Span::<core::felt252>",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "transferFrom",
        type: "function",
        inputs: [
          {
            name: "from",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "to",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "tokenId",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "setApprovalForAll",
        type: "function",
        inputs: [
          {
            name: "operator",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "approved",
            type: "core::bool",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "getApproved",
        type: "function",
        inputs: [
          {
            name: "tokenId",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "isApprovedForAll",
        type: "function",
        inputs: [
          {
            name: "owner",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "operator",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "view",
      },
    ],
  },
  {
    name: "ERC721MetadataImpl",
    type: "impl",
    interface_name: "openedition::interfaces::IERC721::IERC721Metadata",
  },
  {
    name: "core::byte_array::ByteArray",
    type: "struct",
    members: [
      {
        name: "data",
        type: "core::array::Array::<core::bytes_31::bytes31>",
      },
      {
        name: "pending_word",
        type: "core::felt252",
      },
      {
        name: "pending_word_len",
        type: "core::integer::u32",
      },
    ],
  },
  {
    name: "openedition::interfaces::IERC721::IERC721Metadata",
    type: "interface",
    items: [
      {
        name: "name",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::byte_array::ByteArray",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "symbol",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::byte_array::ByteArray",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "total_supply",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u64",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "token_uri",
        type: "function",
        inputs: [
          {
            name: "token_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::byte_array::ByteArray",
          },
        ],
        state_mutability: "view",
      },
    ],
  },
  {
    name: "ERC721MetadataCamelImpl",
    type: "impl",
    interface_name:
      "openedition::interfaces::IERC721::IERC721MetadataCamelOnly",
  },
  {
    name: "openedition::interfaces::IERC721::IERC721MetadataCamelOnly",
    type: "interface",
    items: [
      {
        name: "totalSupply",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u64",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "tokenURI",
        type: "function",
        inputs: [
          {
            name: "tokenId",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::byte_array::ByteArray",
          },
        ],
        state_mutability: "view",
      },
    ],
  },
  {
    name: "FlexDropContractMetadataImpl",
    type: "impl",
    interface_name:
      "openedition::interfaces::IFlexDropContractMetadata::IFlexDropContractMetadata",
  },
  {
    name: "openedition::interfaces::IFlexDropContractMetadata::IFlexDropContractMetadata",
    type: "interface",
    items: [
      {
        name: "set_base_uri",
        type: "function",
        inputs: [
          {
            name: "new_token_uri",
            type: "core::byte_array::ByteArray",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "set_contract_uri",
        type: "function",
        inputs: [
          {
            name: "new_contract_uri",
            type: "core::byte_array::ByteArray",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "get_base_uri",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::byte_array::ByteArray",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_contract_uri",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::byte_array::ByteArray",
          },
        ],
        state_mutability: "view",
      },
    ],
  },
  {
    name: "SRC5Impl",
    type: "impl",
    interface_name: "openzeppelin::introspection::interface::ISRC5",
  },
  {
    name: "openzeppelin::introspection::interface::ISRC5",
    type: "interface",
    items: [
      {
        name: "supports_interface",
        type: "function",
        inputs: [
          {
            name: "interface_id",
            type: "core::felt252",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "view",
      },
    ],
  },
  {
    name: "SRC5CamelImple",
    type: "impl",
    interface_name: "openzeppelin::introspection::interface::ISRC5Camel",
  },
  {
    name: "openzeppelin::introspection::interface::ISRC5Camel",
    type: "interface",
    items: [
      {
        name: "supportsInterface",
        type: "function",
        inputs: [
          {
            name: "interfaceId",
            type: "core::felt252",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "view",
      },
    ],
  },
  {
    name: "OwnableImpl",
    type: "impl",
    interface_name: "openzeppelin::access::ownable::interface::IOwnable",
  },
  {
    name: "openzeppelin::access::ownable::interface::IOwnable",
    type: "interface",
    items: [
      {
        name: "owner",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "transfer_ownership",
        type: "function",
        inputs: [
          {
            name: "new_owner",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "renounce_ownership",
        type: "function",
        inputs: [],
        outputs: [],
        state_mutability: "external",
      },
    ],
  },
  {
    name: "constructor",
    type: "constructor",
    inputs: [
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "name",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "symbol",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "token_uri",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "max_supply",
        type: "core::integer::u64",
      },
      {
        name: "limit_internal_mint_id",
        type: "core::integer::u64",
      },
      {
        name: "limit_gtd_mint_id",
        type: "core::integer::u64",
      },
      {
        name: "limit_whitelisted_mint_id",
        type: "core::integer::u64",
      },
      {
        name: "limit_public_mint_id",
        type: "core::integer::u64",
      },
    ],
  },
  {
    kind: "struct",
    name: "openedition::erc721::ERC721::ERC721Component::Transfer",
    type: "event",
    members: [
      {
        kind: "key",
        name: "from",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "key",
        name: "to",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "key",
        name: "token_id",
        type: "core::integer::u256",
      },
    ],
  },
  {
    kind: "struct",
    name: "openedition::erc721::ERC721::ERC721Component::Approval",
    type: "event",
    members: [
      {
        kind: "key",
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "key",
        name: "approved",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "key",
        name: "token_id",
        type: "core::integer::u256",
      },
    ],
  },
  {
    kind: "struct",
    name: "openedition::erc721::ERC721::ERC721Component::ApprovalForAll",
    type: "event",
    members: [
      {
        kind: "key",
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "key",
        name: "operator",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "approved",
        type: "core::bool",
      },
    ],
  },
  {
    kind: "enum",
    name: "openedition::erc721::ERC721::ERC721Component::Event",
    type: "event",
    variants: [
      {
        kind: "nested",
        name: "Transfer",
        type: "openedition::erc721::ERC721::ERC721Component::Transfer",
      },
      {
        kind: "nested",
        name: "Approval",
        type: "openedition::erc721::ERC721::ERC721Component::Approval",
      },
      {
        kind: "nested",
        name: "ApprovalForAll",
        type: "openedition::erc721::ERC721::ERC721Component::ApprovalForAll",
      },
    ],
  },
  {
    kind: "enum",
    name: "openzeppelin::introspection::src5::SRC5Component::Event",
    type: "event",
    variants: [],
  },
  {
    kind: "struct",
    name: "openzeppelin::access::ownable::ownable::OwnableComponent::OwnershipTransferred",
    type: "event",
    members: [
      {
        kind: "key",
        name: "previous_owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "key",
        name: "new_owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
  },
  {
    kind: "struct",
    name: "openzeppelin::access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
    type: "event",
    members: [
      {
        kind: "key",
        name: "previous_owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "key",
        name: "new_owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
  },
  {
    kind: "enum",
    name: "openzeppelin::access::ownable::ownable::OwnableComponent::Event",
    type: "event",
    variants: [
      {
        kind: "nested",
        name: "OwnershipTransferred",
        type: "openzeppelin::access::ownable::ownable::OwnableComponent::OwnershipTransferred",
      },
      {
        kind: "nested",
        name: "OwnershipTransferStarted",
        type: "openzeppelin::access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
      },
    ],
  },
  {
    kind: "enum",
    name: "openzeppelin::security::reentrancyguard::ReentrancyGuardComponent::Event",
    type: "event",
    variants: [],
  },
  {
    kind: "enum",
    name: "openedition::ERC721_atemu_packs_edition::ERC721AtemuPacksEdition::Event",
    type: "event",
    variants: [
      {
        kind: "flat",
        name: "ERC721Event",
        type: "openedition::erc721::ERC721::ERC721Component::Event",
      },
      {
        kind: "flat",
        name: "SRC5Event",
        type: "openzeppelin::introspection::src5::SRC5Component::Event",
      },
      {
        kind: "flat",
        name: "OwnableEvent",
        type: "openzeppelin::access::ownable::ownable::OwnableComponent::Event",
      },
      {
        kind: "flat",
        name: "ReentrancyGuardEvent",
        type: "openzeppelin::security::reentrancyguard::ReentrancyGuardComponent::Event",
      },
    ],
  },
];
