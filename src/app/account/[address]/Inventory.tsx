import CardNFTSkeleton from "@/app/(skeletonLoading)/share/CardNftSkeleton";
import CardNFT from "@/components/CardNFT";
import { useAccountContext } from "@/services/providers/AccountProvider";
import { INft } from "@/types/INft";
import { useAccount } from "@starknet-react/core";
import { useParams } from "next/navigation";

const Inventory = () => {
  const { address } = useParams();
  const { address: accountAddress } = useAccount();
  const { loading, nfts } = useAccountContext();

  return (
    <div className="p-4 pb-32">
      <div className="flex flex-wrap justify-start">
        {nfts?.length == 0 &&
          loading &&
          Array.from({ length: 10 }).map((_, index) => (
            <CardNFTSkeleton key={index} />
          ))}
        {nfts?.length == 0 && !loading && (
          <p className="text-white">No NFTs found</p>
        )}
        {nfts?.map((nft: INft, index) => (
          <CardNFT
            key={index}
            nft={nft}
            isOwner={address == accountAddress}
            onReload={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default Inventory;
