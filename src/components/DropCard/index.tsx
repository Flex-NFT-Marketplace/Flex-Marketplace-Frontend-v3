import ImageKit from "@/packages/@ui-kit/Image";
import { useGetCollectionDetail } from "@/services/api/collection/useGetCollectionDetail";
import { useGetTotalLike } from "@/services/api/flexhaus/dropDetail/useGetTotalLike";
import { IdropDetail } from "@/types/Idrop";
import { IStagingCollection } from "@/types/IStagingCollection";
import { strShortAddress, timeElapsedFromTimestamp } from "@/utils/string";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdOutlineLocalFireDepartment } from "react-icons/md";

interface DropCardProps {
  drop: IdropDetail;
}

const DropCard: React.FC<DropCardProps> = ({ drop }) => {
  const [collectionDetail, setCollectionDetail] =
    useState<IStagingCollection | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>("-");

  const _getCollectionDetail = useGetCollectionDetail();
  const getCollectionDetail = async (contractAddress: string) => {
    const collectionDetail =
      await _getCollectionDetail.mutateAsync(contractAddress);
    console.log(collectionDetail);
  };
  const [totalLike, setTotalLike] = useState<number>(0);

  const _getTotalLike = useGetTotalLike();
  const getTotalLike = async (collectionAddress: string) => {
    const totalLike = await _getTotalLike.mutateAsync(collectionAddress);
    setTotalLike(totalLike);
  };

  const getColorStatus = () => {
    if (new Date().getTime() < drop.set.startTime) {
      // primary
      return "#FFE720";
    } else if (new Date().getTime() < drop.set.expiryTime) {
      // green
      return "#30D158";
    } else {
      // cancel
      return "#FF648A";
    }
  };

  useEffect(() => {
    if (drop) {
      getTotalLike(drop.collectible.nftContract);
      if (drop.collectible.nftContract) {
        getCollectionDetail(drop?.collectible?.nftContract);
      }

      const intervalId = setInterval(() => {
        if (new Date().getTime() < drop.set.startTime) {
          setTimeLeft(
            "Starts in " + timeElapsedFromTimestamp(drop.set.startTime / 1000)
          );
        } else if (new Date().getTime() < drop.set.expiryTime) {
          setTimeLeft(
            "Ends in " + timeElapsedFromTimestamp(drop.set.expiryTime / 1000)
          );
        } else {
          setTimeLeft("Expired");
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [drop]);

  return (
    <Link
      href={`/drop-detail/${drop?.collectible?.nftContract}`}
      className="flex flex-col gap-5 border border-dashed border-line bg-dark-black p-4"
    >
      <div className="relative">
        <ImageKit src="" alt="drop" />
        <div className="absolute right-2 top-2 flex items-center gap-2 bg-hover/75 px-2 py-1">
          <div
            style={{ backgroundColor: getColorStatus() }}
            className="h-1 w-1 rounded-full"
          ></div>
          <p className="font-bold">{timeLeft}</p>
        </div>
      </div>
      <div>
        <p className="font-bold uppercase">{drop?.collectible?.name}</p>
        <p className="mt-1">{strShortAddress(drop?.creator?.address)}</p>
      </div>
      <div className="flex items-center justify-between">
        {drop.dropType == "protected" && (
          <div className="relative bg-gradient-to-tr from-white/20 to-white/50 p-[1px]">
            <div className="bg-dark-black/70 px-4">
              <p>Protect - {drop.secureAmount}</p>
            </div>
          </div>
        )}
        <div className="flex items-center gap-1 text-grays">
          <MdOutlineLocalFireDepartment />
          <p>{totalLike}</p>
        </div>
      </div>
    </Link>
  );
};

export default DropCard;
