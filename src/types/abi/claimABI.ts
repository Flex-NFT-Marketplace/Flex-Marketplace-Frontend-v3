export const claimABI = [
  {
    name: "INFTHolderAirdropImpl",
    type: "impl",
    interface_name: "contracts::NFTHolderAirdrop::INFTHolderAirdrop",
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
    name: "contracts::NFTHolderAirdrop::INFTHolderAirdrop",
    type: "interface",
    items: [
      {
        name: "is_claimed_rewards",
        type: "function",
        inputs: [
          {
            name: "_token_id",
            type: "core::integer::u256",
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
        name: "get_rewards_per_nft",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "initialize",
        type: "function",
        inputs: [
          {
            name: "_owner",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "_reward_token",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "_eligible_nft",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "_rewards_per_nft",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "withdraw_reward_tokens",
        type: "function",
        inputs: [
          {
            name: "_amount",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "set_reward_per_nft",
        type: "function",
        inputs: [
          {
            name: "_rewards_per_nft",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "claim_rewards",
        type: "function",
        inputs: [
          {
            name: "_token_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
    ],
  },
  {
    kind: "struct",
    name: "contracts::NFTHolderAirdrop::NFTHolderAirdrop::RewardTokensDepositedByAdmin",
    type: "event",
    members: [
      {
        kind: "data",
        name: "amount",
        type: "core::integer::u256",
      },
    ],
  },
  {
    kind: "struct",
    name: "contracts::NFTHolderAirdrop::NFTHolderAirdrop::RewardTokensWithdrawnByAdmin",
    type: "event",
    members: [
      {
        kind: "data",
        name: "amount",
        type: "core::integer::u256",
      },
    ],
  },
  {
    kind: "struct",
    name: "contracts::NFTHolderAirdrop::NFTHolderAirdrop::UpdatedRewardsPerNft",
    type: "event",
    members: [
      {
        kind: "data",
        name: "oldRewardsPerNft",
        type: "core::integer::u256",
      },
      {
        kind: "data",
        name: "newRewardsPerNft",
        type: "core::integer::u256",
      },
    ],
  },
  {
    kind: "struct",
    name: "contracts::NFTHolderAirdrop::NFTHolderAirdrop::RewardsClaimed",
    type: "event",
    members: [
      {
        kind: "key",
        name: "tokenId",
        type: "core::integer::u256",
      },
      {
        kind: "data",
        name: "recipient",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "rewardAmount",
        type: "core::integer::u256",
      },
    ],
  },
  {
    kind: "enum",
    name: "contracts::NFTHolderAirdrop::NFTHolderAirdrop::Event",
    type: "event",
    variants: [
      {
        kind: "nested",
        name: "RewardTokensDepositedByAdmin",
        type: "contracts::NFTHolderAirdrop::NFTHolderAirdrop::RewardTokensDepositedByAdmin",
      },
      {
        kind: "nested",
        name: "RewardTokensWithdrawnByAdmin",
        type: "contracts::NFTHolderAirdrop::NFTHolderAirdrop::RewardTokensWithdrawnByAdmin",
      },
      {
        kind: "nested",
        name: "UpdatedRewardsPerNft",
        type: "contracts::NFTHolderAirdrop::NFTHolderAirdrop::UpdatedRewardsPerNft",
      },
      {
        kind: "nested",
        name: "RewardsClaimed",
        type: "contracts::NFTHolderAirdrop::NFTHolderAirdrop::RewardsClaimed",
      },
    ],
  },
];
