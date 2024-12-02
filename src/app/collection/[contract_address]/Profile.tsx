import FormatAddress from "@/components/FormatAddress";
import { useCollectionDetailContext } from "@/services/providers/CollectionDetailProvider";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdContentCopy } from "react-icons/md";
import EthSVG from "@/assets/EthereumBadge.svg";
import ImageKit from "@/packages/@ui-kit/Image";

const Profile = () => {
  const { collection, collectionEconomic, collectionCount } =
    useCollectionDetailContext();
  const [copied, setCopied] = useState(false); // State for copy status

  useEffect(() => {
    console.log(collection);
  }, [collection]);
  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(collection?.nftContract || "");
      setCopied(true); // Update copied state for feedback
    } catch (err) {
      console.error("Failed to copy address:", err);
      // Handle error gracefully (optional: display error message)
    } finally {
      setTimeout(() => setCopied(false), 2000); // Reset copied state after delay
    }
  };

  return (
    <>
      <div className="relative">
        <div className="absolute z-[1] h-full w-full bg-gradient-to-b from-transparent via-black/30 to-black"></div>
        <ImageKit
          src={collection?.cover}
          alt=""
          className="max-h-[350px] w-full object-contain"
        />
      </div>
      <div className="absolute bottom-0 z-[2] flex w-full flex-wrap items-center justify-between gap-y-4 border-b border-stroke px-8 py-3 max-md:px-5">
        <div className="flex gap-2 sm:gap-3">
          <ImageKit
            src={collection?.avatar}
            alt=""
            className="h-[52px] w-[52px] rounded-sm"
          />

          <div className="flex flex-col justify-center gap-1">
            <p className="text-xl font-bold sm:text-2xl">{collection?.name}</p>

            <div className="flex flex-wrap items-center text-xs sm:text-sm">
              <FormatAddress address={collection?.nftContract} />
              <MdContentCopy
                className="ml-2 cursor-pointer"
                onClick={copyAddress}
              />
              <p className="ml-2">{copied ? "Copied!" : ""}</p>
              <div className="mx-2 h-4 w-[1px] bg-stroke sm:mx-4"></div>
              <p className="text-grays">Items</p>
              <p className="ml-2">{collectionCount?.supply || "-"}</p>
              <p className="ml-4 text-grays sm:ml-5">Creator Earnings</p>
              <p className="ml-2">-%</p>
            </div>
          </div>
        </div>

        <div className="max-w-full overflow-auto max-md:hidden">
          <div className="flex min-w-[600px] basis-[600px] gap-7 font-normal">
            <div>
              <p className="flex items-center gap-1 font-bold">
                {collectionEconomic?.totalVol
                  ? (Number(collectionEconomic?.totalVol) / 1e18).toFixed(3)
                  : "-"}{" "}
                <span>
                  <Image src={EthSVG} alt="" className="h-4 w-4" />
                </span>
              </p>
              <p className="text-sm text-grays">Total Volume</p>
            </div>
            <div>
              <p className="font-bold">
                {collection?.nftCollectionStats?.floorPrice?.toFixed(3) || "-"}{" "}
                ETH
              </p>
              <p className="text-sm text-grays">Floor Price</p>
            </div>
            <div>
              <p className="font-bold">
                {collection?.nftCollectionStats?.bestOffer?.toFixed(3) || "-"}{" "}
                ETH
              </p>
              <p className="text-sm text-grays">Best Offer</p>
            </div>
            <div>
              {collectionEconomic?.oneDayChange &&
              collectionEconomic?.oneDayChange > 0 ? (
                <p className="text-shadow-max text-buy">
                  {collectionEconomic?.oneDayChange?.toFixed(2)}%
                </p>
              ) : (
                <p className="text-shadow-min text-cancel">
                  {collectionEconomic?.oneDayChange?.toFixed(2)}%
                </p>
              )}
              <p className="text-sm text-grays">1D Change</p>
            </div>
            {/* <div>
            <p className="text-sm">5%</p>
            <p className="text-sm text-grays">7D Change</p>
          </div> */}
            <div>
              <p className="font-bold">{collectionEconomic?.oneDayVol} ETH</p>
              <p className="text-sm text-grays">1D Volume</p>
            </div>
            {/* <div>
            <p className="text-sm">5%</p>
            <p className="text-sm text-grays">7D Volume</p>
          </div> */}
            <div>
              <p className="font-bold">
                {collection?.nftCollectionStats?.totalListingCount || "-"}
              </p>
              <p className="text-sm text-grays">Listed</p>
            </div>
            <div>
              <p className="font-bold">{collectionCount?.owners}</p>
              <p className="text-sm text-grays">Owners</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
