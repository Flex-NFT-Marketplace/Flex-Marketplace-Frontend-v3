import CardNFTSkeleton from "@/app/(skeletonLoading)/share/CardNftSkeleton";
import CardNFT from "@/components/CardNFT";
import { INftAccountResponse } from "@/services/api/account/useGetNftsByOwner";
import { useAccountContext } from "@/services/providers/AccountProvider";
import { useAccount } from "@starknet-react/core";
import { useParams } from "next/navigation";

const Inventory = () => {
  const { address } = useParams();
  const { address: accountAddress } = useAccount();
  const { nfts, setAddress, onReload, loading } = useAccountContext();

  return (
    <div className="p-4 pb-32">
      <div className="flex flex-wrap justify-start">
        {loading &&
          Array.from({ length: 10 }).map((_, index) => (
            <CardNFTSkeleton key={index} />
          ))}
        {nfts?.length == 0 && !loading && (
          <p className="text-white">No NFTs found</p>
        )}
        {nfts?.map((nft: INftAccountResponse, index) => (
          <CardNFT
            key={index}
            nft={nft.nft}
            bestAsk={nft.orderData.bestAsk}
            isOwner={address == accountAddress}
            onReload={() => onReload(nft.nft)}
            collection={nft.collection}
          />
        ))}
      </div>
    </div>
  );
};

export default Inventory;
