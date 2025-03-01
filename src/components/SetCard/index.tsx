import Button from "@/packages/@ui-kit/Button";
import ImageKit from "@/packages/@ui-kit/Image";
import { ISet } from "@/types/Idrop";
import { strShortAddress, timeElapsedFromTimestamp } from "@/utils/string";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdOutlineBrokenImage } from "react-icons/md";

interface SetCardProps {
  set: ISet;
}

const SetCard: React.FC<SetCardProps> = ({ set }) => {
  const [timeLeft, setTimeLeft] = useState<string>("-");
  const list = [1, 2, 3, 4, 5];

  const getColorStatus = (set: ISet | null) => {
    if (!set) return "#FF648A";
    if (new Date().getTime() < set?.startTime) {
      // primary
      return "#FFE720";
    } else if (new Date().getTime() < set?.expiryTime) {
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
    const intervalId = setInterval(() => {
      if (new Date().getTime() < set?.startTime) {
        setTimeLeft(
          "Starts in " + timeElapsedFromTimestamp(set?.startTime / 1000)
        );
      } else if (new Date().getTime() < set?.expiryTime) {
        setTimeLeft(
          "Ends in " + timeElapsedFromTimestamp(set?.expiryTime / 1000)
        );
      } else {
        setTimeLeft("Expired");
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [set]);

  return (
    <Link
      href={`/set/${set._id}`}
      className="flex flex-col gap-5 border border-dashed border-line bg-hover/50 hover:bg-hover p-4 transition-all rounded-lg group"
    >
      <div className="relative">
        <ImageKit
          src={set?.collectibles[0]?.avatar}
          alt=""
          className="rounded-lg w-full aspect-square"
        />
        <div className="absolute right-2 top-2 flex items-center gap-2 bg-hover/75 px-2 py-1">
          <div
            style={{ backgroundColor: getColorStatus(set) }}
            className="h-1 w-1 rounded-full"
          ></div>
          <p className="font-bold">{timeLeft}</p>
        </div>
      </div>
      <div>
        <p className="font-bold uppercase line-clamp-1">
          {set?.collectibles[0]?.name}
        </p>
        <p className="mt-1">
          {strShortAddress(set?.creator?.address || "0x00000000")}
        </p>
      </div>
      <div className="flex items-center justify-between px-2 bg-background rounded-lg h-8 overflow-hidden">
        <div className="flex gap-2 items-center">
          <MdOutlineBrokenImage />
          <p>
            {set?.collectibles?.length} Drop
            {set?.collectibles?.length > 1 && "s"}
          </p>
        </div>
        <div className="relative flex-1 flex justify-end">
          <div className="flex gap-1 h-full group-hover:-translate-y-[150%] transition-all duration-150">
            {set?.collectibles?.map((collectible, index) => {
              return (
                index <= 2 && (
                  <div
                    style={{
                      borderColor: getColorBorder(index),
                    }}
                    className="border rounded-sm"
                  >
                    <ImageKit
                      src={collectible?.avatar}
                      className="h-5 w-5 rounded-[1px]"
                    />
                  </div>
                )
              );
            })}
            {set?.collectibles?.length > 3 && (
              <div className="h-5 w-5 relative">
                {set?.collectibles?.length - 4 > 0 && (
                  <div className="w-full h-full absolute bg-black/20 top-0 left-0 grid place-items-center">
                    <p className="text-xs">+{set?.collectibles?.length - 3}</p>
                  </div>
                )}

                <div className="border border-transparent rounded-sm">
                  <ImageKit
                    src={set?.collectibles?.[3]?.avatar}
                    className="h-5 w-5 rounded-[1px]"
                  />
                </div>
              </div>
            )}
          </div>
          <Button
            title="Open Set"
            variant="outline"
            className="top-1/2 group-hover:-translate-y-1/2 translate-y-full absolute !h-6 !duration-150"
          />
        </div>
      </div>
    </Link>
  );
};

export default SetCard;
