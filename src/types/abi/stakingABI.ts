export const stakingABI = [
  {
    name: "FlexStakingPoolImpl",
    type: "impl",
    interface_name:
      "flex::marketplace::interfaces::IFlexStakingPool::IFlexStakingPool",
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
    name: "flex::marketplace::interfaces::IFlexStakingPool::IFlexStakingPool",
    type: "interface",
    items: [
      {
        name: "stakeNFT",
        type: "function",
        inputs: [
          {
            name: "collection",
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
        name: "unstakeNFT",
        type: "function",
        inputs: [
          {
            name: "collection",
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
        name: "getUserPointByItem",
        type: "function",
        inputs: [
          {
            name: "user",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "nftCollection",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "tokenId",
            type: "core::integer::u256",
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
        name: "getUserTotalPoint",
        type: "function",
        inputs: [
          {
            name: "user",
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
    ],
  },
  {
    name: "flex::marketplace::stakingpool::FlexStakingPool::FlexStakingPool::Stake",
    type: "struct",
    members: [
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "stakedAt",
        type: "core::integer::u64",
      },
    ],
  },
  {
    name: "getStakedStatus",
    type: "function",
    inputs: [
      {
        name: "collection",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "tokenId",
        type: "core::integer::u256",
      },
    ],
    outputs: [
      {
        type: "flex::marketplace::stakingpool::FlexStakingPool::FlexStakingPool::Stake",
      },
    ],
    state_mutability: "view",
  },
  {
    name: "flex::marketplace::stakingpool::FlexStakingPool::FlexStakingPool::Item",
    type: "struct",
    members: [
      {
        name: "collection",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "tokenId",
        type: "core::integer::u256",
      },
    ],
  },
  {
    name: "getItemStaked",
    type: "function",
    inputs: [
      {
        name: "user",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
    outputs: [
      {
        type: "core::array::Array::<flex::marketplace::stakingpool::FlexStakingPool::FlexStakingPool::Item>",
      },
    ],
    state_mutability: "view",
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
    name: "setAllowedCollection",
    type: "function",
    inputs: [
      {
        name: "collection",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "allowed",
        type: "core::bool",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
  {
    name: "setTimeUnit",
    type: "function",
    inputs: [
      {
        name: "collection",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "timeUnit",
        type: "core::integer::u64",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
  {
    name: "setRewardPerUnitTime",
    type: "function",
    inputs: [
      {
        name: "collection",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "reward",
        type: "core::integer::u256",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
  {
    name: "isEligibleCollection",
    type: "function",
    inputs: [
      {
        name: "collection",
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
    name: "totalStaked",
    type: "function",
    inputs: [
      {
        name: "collection",
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
    name: "getTimeUnit",
    type: "function",
    inputs: [
      {
        name: "collection",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
    outputs: [
      {
        type: "core::integer::u64",
      },
    ],
    state_mutability: "view",
  },
  {
    name: "getRewardPerUnitTime",
    type: "function",
    inputs: [
      {
        name: "collection",
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
    ],
  },
  {
    kind: "struct",
    name: "flex::marketplace::stakingpool::FlexStakingPool::FlexStakingPool::ItemStaked",
    type: "event",
    members: [
      {
        kind: "key",
        name: "collection",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "key",
        name: "tokenId",
        type: "core::integer::u256",
      },
      {
        kind: "data",
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "stakedAt",
        type: "core::integer::u64",
      },
    ],
  },
  {
    kind: "struct",
    name: "flex::marketplace::stakingpool::FlexStakingPool::FlexStakingPool::ItemUnstaked",
    type: "event",
    members: [
      {
        kind: "key",
        name: "collection",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "key",
        name: "tokenId",
        type: "core::integer::u256",
      },
      {
        kind: "data",
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "unstakedAt",
        type: "core::integer::u64",
      },
    ],
  },
  {
    kind: "struct",
    name: "flex::marketplace::stakingpool::FlexStakingPool::FlexStakingPool::ClaimPoint",
    type: "event",
    members: [
      {
        kind: "key",
        name: "user",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "point",
        type: "core::integer::u256",
      },
    ],
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
    name: "flex::marketplace::stakingpool::FlexStakingPool::FlexStakingPool::Event",
    type: "event",
    variants: [
      {
        kind: "nested",
        name: "ItemStaked",
        type: "flex::marketplace::stakingpool::FlexStakingPool::FlexStakingPool::ItemStaked",
      },
      {
        kind: "nested",
        name: "ItemUnstaked",
        type: "flex::marketplace::stakingpool::FlexStakingPool::FlexStakingPool::ItemUnstaked",
      },
      {
        kind: "nested",
        name: "ClaimPoint",
        type: "flex::marketplace::stakingpool::FlexStakingPool::FlexStakingPool::ClaimPoint",
      },
      {
        kind: "flat",
        name: "OwnableEvent",
        type: "openzeppelin::access::ownable::ownable::OwnableComponent::Event",
      },
      {
        kind: "flat",
        name: "ReentrancyEvent",
        type: "openzeppelin::security::reentrancyguard::ReentrancyGuardComponent::Event",
      },
    ],
  },
];
