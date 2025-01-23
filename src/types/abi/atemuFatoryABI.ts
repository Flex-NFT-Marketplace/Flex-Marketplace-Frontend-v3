export const atemuFatoryABI = [
    {
      "name": "CardCollectionFactoryImpl",
      "type": "impl",
      "interface_name": "contracts::AtemuCollectionFactory::ICardCollectionFactory"
    },
    {
      "name": "core::byte_array::ByteArray",
      "type": "struct",
      "members": [
        {
          "name": "data",
          "type": "core::array::Array::<core::bytes_31::bytes31>"
        },
        {
          "name": "pending_word",
          "type": "core::felt252"
        },
        {
          "name": "pending_word_len",
          "type": "core::integer::u32"
        }
      ]
    },
    {
      "name": "core::integer::u256",
      "type": "struct",
      "members": [
        {
          "name": "low",
          "type": "core::integer::u128"
        },
        {
          "name": "high",
          "type": "core::integer::u128"
        }
      ]
    },
    {
      "name": "contracts::AtemuCollectionFactory::CardsDistribution",
      "type": "struct",
      "members": [
        {
          "name": "token_id",
          "type": "core::integer::u256"
        },
        {
          "name": "rarity_rate",
          "type": "core::integer::u256"
        }
      ]
    },
    {
      "name": "contracts::AtemuCollectionFactory::CollectionPackInfo",
      "type": "struct",
      "members": [
        {
          "name": "collection_address",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "name": "pack_address",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "name": "amount_cards_in_pack",
          "type": "core::integer::u32"
        }
      ]
    },
    {
      "name": "contracts::AtemuCollectionFactory::ICardCollectionFactory",
      "type": "interface",
      "items": [
        {
          "name": "create_collection",
          "type": "function",
          "inputs": [
            {
              "name": "base_uri",
              "type": "core::byte_array::ByteArray"
            },
            {
              "name": "pack_address",
              "type": "core::starknet::contract_address::ContractAddress"
            },
            {
              "name": "amount_cards_in_pack",
              "type": "core::integer::u32"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "name": "update_collection",
          "type": "function",
          "inputs": [
            {
              "name": "collection",
              "type": "core::starknet::contract_address::ContractAddress"
            },
            {
              "name": "pack_address",
              "type": "core::starknet::contract_address::ContractAddress"
            },
            {
              "name": "amount_cards_in_pack",
              "type": "core::integer::u32"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "name": "set_collection_class_hash",
          "type": "function",
          "inputs": [
            {
              "name": "new_class_hash",
              "type": "core::starknet::class_hash::ClassHash"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "name": "set_cards_distribution",
          "type": "function",
          "inputs": [
            {
              "name": "collection",
              "type": "core::starknet::contract_address::ContractAddress"
            },
            {
              "name": "cards",
              "type": "core::array::Array::<contracts::AtemuCollectionFactory::CardsDistribution>"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "name": "update_cards_distribution",
          "type": "function",
          "inputs": [
            {
              "name": "collection",
              "type": "core::starknet::contract_address::ContractAddress"
            },
            {
              "name": "cards",
              "type": "core::array::Array::<contracts::AtemuCollectionFactory::CardsDistribution>"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "name": "open_pack",
          "type": "function",
          "inputs": [
            {
              "name": "pack_address",
              "type": "core::starknet::contract_address::ContractAddress"
            },
            {
              "name": "token_id",
              "type": "core::integer::u256"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "name": "get_collection",
          "type": "function",
          "inputs": [
            {
              "name": "collection",
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "outputs": [
            {
              "type": "contracts::AtemuCollectionFactory::CollectionPackInfo"
            }
          ],
          "state_mutability": "view"
        },
        {
          "name": "get_pack",
          "type": "function",
          "inputs": [
            {
              "name": "pack",
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "outputs": [
            {
              "type": "contracts::AtemuCollectionFactory::CollectionPackInfo"
            }
          ],
          "state_mutability": "view"
        },
        {
          "name": "get_collection_class_hash",
          "type": "function",
          "inputs": [],
          "outputs": [
            {
              "type": "core::starknet::class_hash::ClassHash"
            }
          ],
          "state_mutability": "view"
        },
        {
          "name": "get_all_collection_addresses",
          "type": "function",
          "inputs": [],
          "outputs": [
            {
              "type": "core::array::Array::<core::starknet::contract_address::ContractAddress>"
            }
          ],
          "state_mutability": "view"
        },
        {
          "name": "get_all_pack_addresses",
          "type": "function",
          "inputs": [],
          "outputs": [
            {
              "type": "core::array::Array::<core::starknet::contract_address::ContractAddress>"
            }
          ],
          "state_mutability": "view"
        },
        {
          "name": "get_cards_distribution",
          "type": "function",
          "inputs": [
            {
              "name": "collection",
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "outputs": [
            {
              "type": "core::array::Array::<contracts::AtemuCollectionFactory::CardsDistribution>"
            }
          ],
          "state_mutability": "view"
        }
      ]
    },
    {
      "name": "UpgradeableImpl",
      "type": "impl",
      "interface_name": "openzeppelin_upgrades::interface::IUpgradeable"
    },
    {
      "name": "openzeppelin_upgrades::interface::IUpgradeable",
      "type": "interface",
      "items": [
        {
          "name": "upgrade",
          "type": "function",
          "inputs": [
            {
              "name": "new_class_hash",
              "type": "core::starknet::class_hash::ClassHash"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        }
      ]
    },
    {
      "name": "OwnableMixinImpl",
      "type": "impl",
      "interface_name": "openzeppelin_access::ownable::interface::OwnableABI"
    },
    {
      "name": "openzeppelin_access::ownable::interface::OwnableABI",
      "type": "interface",
      "items": [
        {
          "name": "owner",
          "type": "function",
          "inputs": [],
          "outputs": [
            {
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "state_mutability": "view"
        },
        {
          "name": "transfer_ownership",
          "type": "function",
          "inputs": [
            {
              "name": "new_owner",
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "name": "renounce_ownership",
          "type": "function",
          "inputs": [],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "name": "transferOwnership",
          "type": "function",
          "inputs": [
            {
              "name": "newOwner",
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "name": "renounceOwnership",
          "type": "function",
          "inputs": [],
          "outputs": [],
          "state_mutability": "external"
        }
      ]
    },
    {
      "name": "constructor",
      "type": "constructor",
      "inputs": [
        {
          "name": "owner",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "name": "collection_class_hash",
          "type": "core::starknet::class_hash::ClassHash"
        },
        {
          "name": "random_oracleless_address",
          "type": "core::starknet::contract_address::ContractAddress"
        }
      ]
    },
    {
      "kind": "struct",
      "name": "contracts::AtemuCollectionFactory::AtemuCollectionFactory::CollectionCreated",
      "type": "event",
      "members": [
        {
          "kind": "key",
          "name": "owner",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "kind": "data",
          "name": "collection_address",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "kind": "data",
          "name": "pack_address",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "kind": "data",
          "name": "amount_cards_in_pack",
          "type": "core::integer::u32"
        }
      ]
    },
    {
      "kind": "struct",
      "name": "contracts::AtemuCollectionFactory::AtemuCollectionFactory::CollectionUpdated",
      "type": "event",
      "members": [
        {
          "kind": "key",
          "name": "owner",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "kind": "data",
          "name": "collection_address",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "kind": "data",
          "name": "pack_address",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "kind": "data",
          "name": "amount_cards_in_pack",
          "type": "core::integer::u32"
        }
      ]
    },
    {
      "kind": "struct",
      "name": "contracts::AtemuCollectionFactory::AtemuCollectionFactory::PackOpened",
      "type": "event",
      "members": [
        {
          "kind": "key",
          "name": "caller",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "kind": "data",
          "name": "collection_address",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "kind": "data",
          "name": "pack_address",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "kind": "data",
          "name": "token_id",
          "type": "core::integer::u256"
        }
      ]
    },
    {
      "kind": "struct",
      "name": "contracts::AtemuCollectionFactory::AtemuCollectionFactory::CardsDistributionSet",
      "type": "event",
      "members": [
        {
          "kind": "data",
          "name": "collection",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "kind": "data",
          "name": "total_cards",
          "type": "core::integer::u32"
        }
      ]
    },
    {
      "kind": "struct",
      "name": "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred",
      "type": "event",
      "members": [
        {
          "kind": "key",
          "name": "previous_owner",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "kind": "key",
          "name": "new_owner",
          "type": "core::starknet::contract_address::ContractAddress"
        }
      ]
    },
    {
      "kind": "struct",
      "name": "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
      "type": "event",
      "members": [
        {
          "kind": "key",
          "name": "previous_owner",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "kind": "key",
          "name": "new_owner",
          "type": "core::starknet::contract_address::ContractAddress"
        }
      ]
    },
    {
      "kind": "enum",
      "name": "openzeppelin_access::ownable::ownable::OwnableComponent::Event",
      "type": "event",
      "variants": [
        {
          "kind": "nested",
          "name": "OwnershipTransferred",
          "type": "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred"
        },
        {
          "kind": "nested",
          "name": "OwnershipTransferStarted",
          "type": "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted"
        }
      ]
    },
    {
      "kind": "enum",
      "name": "openzeppelin_security::reentrancyguard::ReentrancyGuardComponent::Event",
      "type": "event",
      "variants": []
    },
    {
      "kind": "struct",
      "name": "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Upgraded",
      "type": "event",
      "members": [
        {
          "kind": "data",
          "name": "class_hash",
          "type": "core::starknet::class_hash::ClassHash"
        }
      ]
    },
    {
      "kind": "enum",
      "name": "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Event",
      "type": "event",
      "variants": [
        {
          "kind": "nested",
          "name": "Upgraded",
          "type": "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Upgraded"
        }
      ]
    },
    {
      "kind": "enum",
      "name": "contracts::AtemuCollectionFactory::AtemuCollectionFactory::Event",
      "type": "event",
      "variants": [
        {
          "kind": "nested",
          "name": "CollectionCreated",
          "type": "contracts::AtemuCollectionFactory::AtemuCollectionFactory::CollectionCreated"
        },
        {
          "kind": "nested",
          "name": "CollectionUpdated",
          "type": "contracts::AtemuCollectionFactory::AtemuCollectionFactory::CollectionUpdated"
        },
        {
          "kind": "nested",
          "name": "PackOpened",
          "type": "contracts::AtemuCollectionFactory::AtemuCollectionFactory::PackOpened"
        },
        {
          "kind": "nested",
          "name": "CardsDistributionSet",
          "type": "contracts::AtemuCollectionFactory::AtemuCollectionFactory::CardsDistributionSet"
        },
        {
          "kind": "flat",
          "name": "OwnableEvent",
          "type": "openzeppelin_access::ownable::ownable::OwnableComponent::Event"
        },
        {
          "kind": "flat",
          "name": "ReentrancyGuardEvent",
          "type": "openzeppelin_security::reentrancyguard::ReentrancyGuardComponent::Event"
        },
        {
          "kind": "flat",
          "name": "UpgradeableEvent",
          "type": "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Event"
        }
      ]
    }
  ]