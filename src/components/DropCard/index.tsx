import { getBackgroundColor } from "@/app/create-drop/step2";
import ImageKit from "@/packages/@ui-kit/Image";
import { useGetTotalLike } from "@/services/api/flexhaus/dropDetail/useGetTotalLike";
import { IdropDetail } from "@/types/Idrop";
import { strShortAddress, timeElapsedFromTimestamp } from "@/utils/string";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdOutlineLocalFireDepartment } from "react-icons/md";

interface DropCardProps {
  drop: IdropDetail;
}

const DropCard: React.FC<DropCardProps> = ({ drop }) => {
  const [timeLeft, setTimeLeft] = useState<string>("-");

  const [totalLike, setTotalLike] = useState<number>(0);

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
    if (drop) {
      console.log(drop);

      getTotalLike(drop.collectible.nftContract);

      const intervalId = setInterval(() => {
        if (new Date().getTime() < drop.set?.startTime) {
          setTimeLeft(
            "Starts in " + timeElapsedFromTimestamp(drop.set?.startTime / 1000)
          );
        } else if (new Date().getTime() < drop.set?.expiryTime) {
          setTimeLeft(
            "Ends in " + timeElapsedFromTimestamp(drop.set?.expiryTime / 1000)
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
      className="flex flex-col gap-5 border border-dashed border-line bg-hover/50 hover:bg-hover p-4 transition-all rounded-lg"
    >
      <div className="relative">
        <ImageKit
          src={drop?.collectible?.avatar}
          alt=""
          className="rounded-lg w-full aspect-square"
        />
        <div className="absolute right-2 top-2 flex items-center gap-2 bg-hover/75 px-2 py-1 rounded">
          <div
            style={{ backgroundColor: getColorStatus(drop) }}
            className="h-1 w-1 rounded-full"
          ></div>
          <p className="font-bold">{timeLeft}</p>
        </div>
        <div
          style={{
            backgroundColor: getBackgroundColor(drop?.collectible.rarity || ""),
          }}
          className="absolute right-2 bottom-0 translate-y-1/2 flex items-center gap-2 px-2 py-1 rounded"
        >
          <p className="uppercase font-bold text-black">
            {drop?.collectible.rarity}
          </p>
        </div>
      </div>
      <div>
        <p className="font-bold uppercase line-clamp-1">
          {drop?.collectible?.name}
        </p>
        <p className="mt-1">
          {strShortAddress(drop?.creator?.address || "0x0000.000")}
        </p>
      </div>
      <div className="flex items-center justify-between">
        {drop?.dropType == "protected" && (
          <div className="relative grid place-items-center h-6 rounded-md border border-border">
            <div className="bg-dark-black/70 px-4">
              <p className="text-[14px] font-bold">
                Protect - {drop?.secureAmount}
              </p>
            </div>
          </div>
        )}
        <div className="flex items-center gap-1 text-grays">
          <MdOutlineLocalFireDepartment className="text-danger" />
          <p>{totalLike}</p>
        </div>
      </div>
    </Link>
  );
};

export default DropCard;
