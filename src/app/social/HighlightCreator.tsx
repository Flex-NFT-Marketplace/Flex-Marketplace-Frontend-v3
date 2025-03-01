import Button from "@/packages/@ui-kit/Button";
import ImageKit from "@/packages/@ui-kit/Image";
import { MdContentCopy } from "react-icons/md";
import badge_check from "@/assets/badge-check.svg";
import FormatAddress from "@/components/FormatAddress";
import { useSocial } from "@/services/providers/SocialProvider";
import { useEffect, useState } from "react";
import { IdropDetail } from "@/types/Idrop";
import useGetDrops from "@/services/api/flexhaus/social/useGetDrops";
import { IProfileStaging } from "@/types/IStagingNft";
import { useAccountContext } from "@/services/providers/AccountProvider";
import { useAccount } from "@starknet-react/core";
import { copyToClipboard, formattedContractAddress } from "@/utils/string";
import { toast } from "react-toastify";
import Link from "next/link";
import avtDefault from "@/assets/avtDefault.webp";

const CreatorCard: React.FC<{ creator: IProfileStaging }> = ({ creator }) => {
  const [drops, setDrops] = useState<IdropDetail[]>([]);
  const { toggleSubcribe, handleCheckSubcribed } = useAccountContext();
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data: dropsByCreator, isPending: isPendingDrops } = useGetDrops({
    creator: creator.address,
  });

  useEffect(() => {
    const dropsArr =
      dropsByCreator?.pages.flatMap((page) => page.data.items) || [];
    setDrops(dropsArr);
  }, [dropsByCreator]);

  const subScribe = async () => {
    try {
      setIsLoading(true);
      const res = await toggleSubcribe(creator.address as string);
      setIsSubscribed(res);
    } catch (error) {
      toast("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyAddress = () => {
    try {
      copyToClipboard(creator.address as string);
      toast("Copy address successfully");
    } catch (error) {
      toast("Something went wrong");
    }
  };

  useEffect(() => {
    const checkSubcribed = async () => {
      const isSubscribed = await handleCheckSubcribed(creator.address);
      setIsSubscribed(isSubscribed);
    };

    checkSubcribed();
  }, [creator, address]);

  return (
    <div className="p-4 flex border-border bg-dark-black rounded-lg flex-col">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="aspect-square h-[56px]">
            <ImageKit
              src={creator.avatar || avtDefault.src}
              alt=""
              className="h-full w-full rounded-md"
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <Link href={`/drophaus/${creator.address}`}>
                <FormatAddress address={creator.address} />
              </Link>
              <ImageKit src={badge_check.src} alt="" className="h-5 w-5" />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-wrap font-normal items-center ">
                <FormatAddress address={creator.address} />
                <MdContentCopy
                  className="ml-2 cursor-pointer"
                  onClick={handleCopyAddress}
                />
                {/* <p className="ml-2">{copied ? "Copied!" : ""}</p> */}
              </div>
            </div>
          </div>
        </div>

        {formattedContractAddress(creator.address) !==
          formattedContractAddress(address) && (
          <Button
            loading={isLoading}
            onClick={subScribe}
            title={isSubscribed ? "Unsubcribe" : "Subcribe"}
            variant={isSubscribed ? "outline" : "primary"}
            className="flex-1"
          />
        )}
      </div>
      <p className="mt-4 mb-8 font-normal line-clamp-2 text-base min-h-[48px]">
        {creator?.about || "No description"}
      </p>
      <div className="grid grid-cols-5 gap-3 max-w-full">
        {drops.slice(0, 5).map((drop, index) => {
          return (
            <ImageKit
              key={index}
              src={drop.collectible.avatar}
              alt=""
              className=""
            />
          );
        })}

        {!isPendingDrops && drops.length === 0 && (
          <div className="text-center text-text">
            <p>No drops found</p>
          </div>
        )}
      </div>
    </div>
  );
};

const HighlightCreator = () => {
  const { highlightCreator } = useSocial();

  return (
    <div className="w-full font-bold mx-auto  max-w-[1440px] flex flex-col gap-8">
      <p className="text-2xl uppercase text-shadow-white">Highlight creators</p>
      <div className="flex gap-5 overflow-auto">
        {highlightCreator.map((creator, index) => {
          return <CreatorCard key={index} creator={creator} />;
        })}
      </div>
    </div>
  );
};

export default HighlightCreator;
