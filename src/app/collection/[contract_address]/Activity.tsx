import ActivityItemSkeleton from "@/app/(skeletonLoading)/collectionsSkeleton/ActivityItemSkeleton";
import ActionNFT from "@/components/ActionNFT";
import FormatAddress from "@/components/FormatAddress";
import FormatPrice from "@/components/FormatPrice";
import Button from "@/lib/@core/Button";
import Checkbox from "@/lib/@core/Checkbox";

import Input from "@/lib/@core/Input";
import ImageKit from "@/packages/@ui-kit/Image";
import { useGetNFTActivity } from "@/services/api/useGetNFTActivity";
import { useActivityContext } from "@/services/providers/ActivityProvider";
import { INft } from "@/types/INft";
import { ISignature } from "@/types/ISignature";
import { IStagingNft } from "@/types/IStagingNft";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface IActivityProps {
  signature: ISignature;
  nft: IStagingNft;
}

const ActivityItem: React.FC<IActivityProps> = (props) => {
  const { signature, nft } = props;

  const router = useRouter();

  const onNavigate = (path: string) => {
    router.push(path);
  };

  const onNavigateDetail = () => {
    onNavigate("/starknet/asset/" + nft.nftContract + "/" + nft.tokenId);
  };

  return (
    <div
      className="flex cursor-pointer hover:bg-dark-black"
      onClick={onNavigateDetail}
    >
      <ImageKit src={nft?.image} alt="" className="h-[72px] w-[72px]" />

      <div className="ml-2 flex flex-col justify-between overflow-hidden max-sm:flex-1">
        <div>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap font-normal text-grays">
            #{nft?.tokenId}
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <ActionNFT status={signature?.status} />
          <FormatPrice
            price={signature?.price}
            currency={signature?.currency}
          />
        </div>
        <div className="flex items-center gap-2 text-sm">
          <p className=" text-grays">By</p>
          <FormatAddress address={signature?.signer} />
        </div>
      </div>
    </div>
  );
};

const Activity = () => {
  const { signatures, isLoading, fetchNextPage, hasNextPage } =
    useActivityContext();
  const [loading, setLoading] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);
  const handleScroll = useCallback(
    (e: any) => {
      const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

      if (scrollTop + clientHeight >= scrollHeight - 1) {
        if (!isLoading && hasNextPage) {
          fetchNextPage();
          setLoading(true);
        }
      }
    },
    [isLoading, fetchNextPage]
  );

  useEffect(() => {
    if (!scrollRef.current) return;
    // const scrollContainer = document.getElementById("scroll-container");
    scrollRef.current.addEventListener("scroll", handleScroll);

    if (!isLoading) {
      setLoading(false);
    }
  }, [isLoading]);

  return (
    <div className="fixed-height-avtivity sticky top-[52px] flex min-w-[260px] flex-col gap-4 border-stroke pl-4 pr-8 pt-4 max-sm:w-[100vw]">
      <div className="flex flex-col">
        <div>
          <p className="text-xl font-bold">ACTIVITY</p>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex flex-1 flex-col gap-4 overflow-auto pb-4 max-sm:w-full"
      >
        {signatures?.map((_, i) => (
          <ActivityItem key={i} signature={_} nft={_.nft} />
        ))}

        {!loading &&
          [...Array(10)].map((_, index) => (
            <ActivityItemSkeleton key={index} />
          ))}
      </div>
    </div>
  );
};

export default Activity;
