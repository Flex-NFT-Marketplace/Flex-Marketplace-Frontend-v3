import FormatAddress from "../FormatAddress";
import { useAccount } from "@starknet-react/core";
import { MdContentCopy } from "react-icons/md";
import { useEffect, useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { getCollectionDetailStaging } from "@/services/api/collection/useGetCollectionDetailsStaging";
import { useGetProfile } from "@/services/api/useGetProfile";
import Button from "@/packages/@ui-kit/Button";
import ImageKit from "@/packages/@ui-kit/Image";

interface SocialCardCollectionProps {
  openEdition?: any;
}

const SocialCardCollection: React.FC<SocialCardCollectionProps> = ({
  openEdition,
}) => {
  const { address } = useAccount();
  const [copied, setCopied] = useState(false); // State for copy status
  const [collectionDetail, setCollectionDetail] = useState<any>();
  const [owner, setOwner] = useState<any>();
  const getProfile = useGetProfile();

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText((address as string) || "");
      setCopied(true); // Update copied state for feedback
    } catch (err) {
      console.error("Failed to copy address:", err);
      // Handle error gracefully (optional: display error message)
    } finally {
      setTimeout(() => setCopied(false), 2000); // Reset copied state after delay
    }
  };

  const convertTimestampToDateTime = (timestamp: number): string => {
    if (!timestamp) return "";
    const date = new Date(timestamp);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedDate = `${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month}/${year}`;
    const formattedTime = `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`;

    return `${formattedDate} ${formattedTime}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (openEdition) {
          const collection = await getCollectionDetailStaging(
            openEdition?.nftCollection?.nftContract
          );
          setCollectionDetail(collection?.data);
          // if (collection?.data?.owner?.address) {
          //   const profileOwner = await getProfile.mutate(
          //     collection?.data?.owner?.address
          //   );
          //   setOwner(profileOwner);
          // }
        }
      } catch (error) {
        console.error("Failed to fetch collection details:", error);
      }
    };
    fetchData();
  }, [openEdition]);

  return (
    <div
      className="flex min-w-96 cursor-pointer gap-3 rounded-md border border-stroke p-4 hover:border-white sm:w-[448px]"
      onClick={() => {
        window.open(
          "https://beta-open-editions.hyperflex.market/open-edition/" +
            openEdition?.nftCollection?.nftContract,
          "_self"
        );
      }}
    >
      <ImageKit
        src={
          openEdition?.nftCollection?.avatar ||
          "https://starknet.id/api/identicons/0"
        }
        alt=""
        className="aspect-square h-[52px] w-[52px] rounded-md"
      />
      <div className="flex flex-1 flex-col gap-5">
        <div className="flex h-[52px] flex-col justify-center">
          <p className="text-2xl font-bold">
            {openEdition?.nftCollection?.name}
          </p>
          <div className="flex lg:items-center lg:gap-4">
            <div className="flex items-center">
              <FormatAddress
                address={collectionDetail?.data?.owner?.address}
                convertName
              />
              <MdContentCopy
                className="ml-2 cursor-pointer text-sm text-grays"
                onClick={copyAddress}
              />
              <p className="ml-2 text-xs"> {copied ? "Copied!" : ""}</p>
            </div>
            <div className="hidden h-4 w-[1px] bg-stroke lg:block"></div>
            <div className="flex flex-nowrap gap-2">
              <p className="text-sm text-grays">Items</p>
              <p className="ml-2 text-sm">-k</p>
            </div>
          </div>
        </div>
        <ImageKit
          src={
            openEdition?.nftCollection?.avatar ||
            "https://starknet.id/api/identicons/0"
          }
          alt=""
          className="aspect-square w-full rounded-sm object-contain"
        />
        <div className="flex justify-between gap-4">
          <p className="line-clamp-1 text-xl font-bold uppercase">
            {openEdition?.nftCollection?.name}
          </p>
          <div className="flex gap-2 text-xs">
            {openEdition?.quests?.length > 0 && (
              <Button
                title="Free Claim"
                variant="outline"
                className="!h-8 !border-[#64D2FF] !text-[#64D2FF]"
              />
            )}

            <Button
              title="Mint"
              variant="outline"
              className="!h-8 !border-[#FF8AD0] !text-[#FF8AD0]"
            />
          </div>
        </div>
        <div>
          <p className="line-clamp-3 text-[14px]">
            {openEdition?.nftCollection?.description}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-grays">
          <CiCalendar />
          <p>{convertTimestampToDateTime(openEdition?.startTime)}</p>
          <p>-</p>
          <p>{convertTimestampToDateTime(openEdition?.endTime)}</p>
        </div>
      </div>
    </div>
  );
};

export default SocialCardCollection;
