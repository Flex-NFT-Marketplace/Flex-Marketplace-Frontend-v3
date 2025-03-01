import { getBackgroundColor } from "@/app/create-drop/step2";
import Button from "@/packages/@ui-kit/Button";
import ImageKit from "@/packages/@ui-kit/Image";
import { useGetTotalLike } from "@/services/api/flexhaus/dropDetail/useGetTotalLike";
import { useDropDetail } from "@/services/providers/DropDetailProvider";
import { ICollectibleState, IdropDetail } from "@/types/Idrop";
import { strShortAddress } from "@/utils/string";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdOutlineLocalFireDepartment } from "react-icons/md";

interface DistributedCardProps {
  dropDistributed: ICollectibleState;
}

const DistributedCard: React.FC<DistributedCardProps> = ({
  dropDistributed,
}) => {
  const [totalLike, setTotalLike] = useState<number>(0);
  const { claim } = useDropDetail();

  const _getTotalLike = useGetTotalLike();
  const getTotalLike = async (collectionAddress: string) => {
    const totalLike = await _getTotalLike.mutateAsync(collectionAddress);
    setTotalLike(totalLike);
  };

  useEffect(() => {
    if (dropDistributed) {
      console.log(dropDistributed);

      getTotalLike(dropDistributed.collectible.nftContract);
    }
  }, [dropDistributed]);

  return (
    <Link
      href={`/drop-detail/${dropDistributed?.collectible?.nftContract}`}
      className="flex flex-col gap-5 border border-dashed border-line bg-hover/50 hover:bg-hover p-4 transition-all rounded-lg"
    >
      <div className="relative">
        <ImageKit
          src={dropDistributed?.collectible?.avatar}
          alt=""
          className="rounded-lg w-full aspect-square"
        />
        <div
          style={{
            backgroundColor: getBackgroundColor(
              dropDistributed?.collectible.rarity || ""
            ),
          }}
          className="absolute right-2 bottom-0 translate-y-1/2 flex items-center gap-2 px-2 py-1 rounded"
        >
          <p className="uppercase font-bold text-black">
            {dropDistributed?.collectible.rarity}
          </p>
        </div>
      </div>
      <div>
        <p className="font-bold uppercase line-clamp-1">
          {dropDistributed?.collectible?.name}
        </p>
        <p className="mt-1">
          {strShortAddress(dropDistributed?.user?.address || "0x0000.000")}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div
          onClick={(e) => {
            e.preventDefault();
            claim(dropDistributed?.collectible.nftContract);
          }}
        >
          <Button
            title={dropDistributed.isClaimed ? "Claimed" : "Claim"}
            className="!h-6 !px-6"
          ></Button>
        </div>

        <div className="flex items-center gap-1 text-grays">
          <MdOutlineLocalFireDepartment className="text-danger" />
          <p>{totalLike}</p>
        </div>
      </div>
    </Link>
  );
};

export default DistributedCard;
