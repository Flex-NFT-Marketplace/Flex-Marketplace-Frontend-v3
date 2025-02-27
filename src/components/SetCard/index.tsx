import Button from "@/packages/@ui-kit/Button";
import ImageKit from "@/packages/@ui-kit/Image";
import { useGetDropDetail } from "@/services/api/flexhaus/dropDetail/useGetDropDetail";
import { useGetTotalLike } from "@/services/api/flexhaus/dropDetail/useGetTotalLike";
import { IdropDetail } from "@/types/Idrop";
import { strShortAddress, timeElapsedFromTimestamp } from "@/utils/string";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  MdOutlineBrokenImage,
  MdOutlineLocalFireDepartment,
} from "react-icons/md";

interface SetCardProps {
  contractAddress: string;
}

const SetCard: React.FC<SetCardProps> = ({ contractAddress }) => {
  const [dropDetail, setDropDetail] = useState<IdropDetail | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>("-");
  const list = [1, 2, 3, 4, 5];

  const [totalLike, setTotalLike] = useState<number>(0);

  const _getDropDetail = useGetDropDetail();
  const getDropDetail = async (dropId: string) => {
    const dropDetail = await _getDropDetail.mutateAsync(dropId);
    setDropDetail(dropDetail);
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

  const getColorBorder = (index: number) => {
    switch (index) {
      case 0:
        return "#64D2FF";
      case 1:
        return "#FF2D55";
      case 2:
        return "#FF9F0A";
      default:
        return "#64D2FF";
    }
  };

  useEffect(() => {
    if (dropDetail) {
      getTotalLike(dropDetail.collectible.nftContract);

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
    }
  }, [contractAddress]);

  return (
    <Link
      href={`/drop-detail/${dropDetail?.collectible?.nftContract}`}
      className="flex flex-col gap-5 border border-dashed border-line bg-hover/50 hover:bg-hover p-4 transition-all rounded-lg group"
    >
      <div className="relative">
        <ImageKit
          src={dropDetail?.collectible?.avatar}
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
      <div className="flex items-center justify-between px-2 bg-background rounded-lg h-8 overflow-hidden">
        <div className="flex gap-2 items-center">
          <MdOutlineBrokenImage />
          <p>5 Drops</p>
        </div>
        <div className="relative flex-1 flex justify-end">
          <div className="flex gap-1 h-full group-hover:-translate-y-[150%] transition-all">
            {list.map((_, index) => {
              return (
                index <= 2 && (
                  <div
                    style={{
                      borderColor: getColorBorder(index),
                    }}
                    className="border rounded-sm"
                  >
                    <ImageKit className="h-5 w-5 rounded-sm" />
                  </div>
                )
              );
            })}
            {list.length > 3 && (
              <div className="h-5 w-5 relative">
                {list.length - 4 > 0 && (
                  <div className="w-full h-full absolute bg-black/20 top-0 left-0 grid place-items-center">
                    <p className="text-xs">+{list.length - 3}</p>
                  </div>
                )}

                <div className="border border-transparent rounded-sm">
                  <ImageKit className="h-5 w-5 rounded-sm" />
                </div>
              </div>
            )}
          </div>
          <Button
            title="Open Set"
            variant="outline"
            className="top-1/2 group-hover:-translate-y-1/2 translate-y-full absolute !h-6 duration-300"
          />
        </div>
      </div>
    </Link>
  );
};

export default SetCard;
