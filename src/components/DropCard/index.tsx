import ImageKit from "@/packages/@ui-kit/Image";
import { useGetCollectionDetail } from "@/services/api/collection/useGetCollectionDetail";
import { useGetDropDetail } from "@/services/api/flexhaus/dropDetail/useGetDropDetail";
import { useGetTotalLike } from "@/services/api/flexhaus/dropDetail/useGetTotalLike";
import { IdropDetail } from "@/types/Idrop";
import { IStagingCollection } from "@/types/IStagingCollection";
import { strShortAddress, timeElapsedFromTimestamp } from "@/utils/string";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdOutlineLocalFireDepartment } from "react-icons/md";

interface DropCardProps {
  contractAddress: string;
}

const DropCard: React.FC<DropCardProps> = ({ contractAddress }) => {
  const [collectionDetail, setCollectionDetail] =
    useState<IStagingCollection | null>(null);
  const [dropDetail, setDropDetail] = useState<IdropDetail | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>("-");

  const [totalLike, setTotalLike] = useState<number>(0);

  const _getDropDetail = useGetDropDetail();
  const getDropDetail = async (dropId: string) => {
    const dropDetail = await _getDropDetail.mutateAsync(dropId);
    setDropDetail(dropDetail);
  };

  const _getCollectionDetail = useGetCollectionDetail();
  const getCollectionDetail = async (contractAddress: string) => {
    const collectionDetail =
      await _getCollectionDetail.mutateAsync(contractAddress);
    setCollectionDetail(collectionDetail);
  };

  const _getTotalLike = useGetTotalLike();
  const getTotalLike = async (collectionAddress: string) => {
    const totalLike = await _getTotalLike.mutateAsync(collectionAddress);
    setTotalLike(totalLike);
  };

  const getColorStatus = (dropDetail: IdropDetail | null) => {
    if (!dropDetail) return "#FF648A";
    if (new Date().getTime() < dropDetail.set?.startTime) {
      // primary
      return "#FFE720";
    } else if (new Date().getTime() < dropDetail.set?.expiryTime) {
      // green
      return "#30D158";
    } else {
      // cancel
      return "#FF648A";
    }
  };

  useEffect(() => {
    if (dropDetail) {
      getTotalLike(dropDetail.collectible.nftContract);
      if (dropDetail.collectible.nftContract) {
        getCollectionDetail(dropDetail?.collectible?.nftContract);
      }

      const intervalId = setInterval(() => {
        if (new Date().getTime() < dropDetail.set?.startTime) {
          setTimeLeft(
            "Starts in " +
              timeElapsedFromTimestamp(dropDetail.set?.startTime / 1000)
          );
        } else if (new Date().getTime() < dropDetail.set?.expiryTime) {
          setTimeLeft(
            "Ends in " +
              timeElapsedFromTimestamp(dropDetail.set?.expiryTime / 1000)
          );
        } else {
          setTimeLeft("Expired");
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [dropDetail]);

  useEffect(() => {
    if (contractAddress) {
      getDropDetail(contractAddress);
      getCollectionDetail(contractAddress);
    }
  }, [contractAddress]);

  return (
    <Link
      href={`/drop-detail/${dropDetail?.collectible?.nftContract}`}
      className="flex flex-col gap-5 border border-dashed border-line bg-hover/50 hover:bg-hover p-4 transition-all rounded-lg"
    >
      <div className="relative">
        <ImageKit
          src={collectionDetail?.avatar}
          alt=""
          className="rounded-lg"
        />
        <div className="absolute right-2 top-2 flex items-center gap-2 bg-hover/75 px-2 py-1">
          <div
            style={{ backgroundColor: getColorStatus(dropDetail) }}
            className="h-1 w-1 rounded-full"
          ></div>
          <p className="font-bold">{timeLeft}</p>
        </div>
      </div>
      <div>
        <p className="font-bold uppercase">{dropDetail?.collectible?.name}</p>
        <p className="mt-1">
          {strShortAddress(dropDetail?.creator?.address || "0x0000.000")}
        </p>
      </div>
      <div className="flex items-center justify-between">
        {dropDetail?.dropType == "protected" && (
          <div className="relative grid place-items-center h-6 rounded-md border border-border">
            <div className="bg-dark-black/70 px-4">
              <p className="text-[14px] font-bold">
                Protect - {dropDetail.secureAmount}
              </p>
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
