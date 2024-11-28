import { ICollection } from "@/types/ICollection";
import { INft } from "@/types/INft";
import { IStagingCollection } from "@/types/IStagingCollection";
import { IStagingNft } from "@/types/IStagingNft";

export const convertStagingCollectionTypeToICollectionType = (staginCollection: IStagingCollection): ICollection => {
  
    const collectionConverted: ICollection = {
      contract_address: staginCollection?.nftContract,

      schema: staginCollection?.standard,
    
      name: staginCollection?.name,
    
      description: staginCollection?.description,
    
      symbol: staginCollection?.symbol,
    
      external_url: "",
    
      image_url: staginCollection?.avatar,
    
      banner_url: staginCollection?.cover,

      stats: {
        collection_best_offer: 0,
        nft_count: 0,
        owner_count: 0,
        asset_count: 0,
        total_volume: 0,
        total_listing_count: 0,
        collection_floor_price: 0,
        stats1D: {
          sale_count: 0,
          volume: 0,  
          avg_price: 0,
        }
      },
        status: {
          is_active: true,
          is_banner: false,
          is_verified: false,
          is_new_collection: false,
          is_trending: false,
          is_18: false,
          banner_prioritize: 0,
        }
    }

    return collectionConverted;
}

export const convertStagingNftTypeToINft = (nft: IStagingNft): INft => {
    return {
        signatures: undefined, // don't have
        _id: nft?._id,
        nft_id: "", // don't have
        contract_address: nft?.nftContract,
        token_id: nft?.tokenId,
        name: nft?.name,
        description: nft?.description,
        external_url: "", // don't have
        attributes: nft?.attributes,
        image_url: nft?.image,
        image_small_url: "", // don't have
        image_medium_url: "", // don't have
        animation_url: "",
        minted_by_address: "",
        minted_at_transaction_hash: "",
        minted_at_timestamp: "",
        balance: [],
    }
}

