import FormatAddress from "@/components/FormatAddress";
import ImageKit from "@/packages/@ui-kit/Image";
import { IoIosAddCircle, IoIosCheckmarkCircle } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";
import badge_check from "@/assets/badge-check.svg";
import { useSocial } from "@/services/providers/SocialProvider";
import avtDefault from "@/assets/avtDefault.webp";
import { useEffect, useState } from "react";
import { useAccount } from "@starknet-react/core";
import { useAccountContext } from "@/services/providers/AccountProvider";
import { IProfileStaging } from "@/types/IStagingNft";
import { toast } from "react-toastify";
import { copyToClipboard } from "@/utils/string";
import Link from "next/link";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const CreatorCard: React.FC<{ creator: IProfileStaging }> = ({ creator }) => {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toggleSubcribe, handleCheckSubcribed } = useAccountContext();

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
    <Link
      href={`drophaus/${creator.address}`}
      className="flex rounded-lg overflow-hidden border-border bg-dark-black"
    >
      <ImageKit
        src={creator.avatar || avtDefault.src}
        alt=""
        className="h-[72px] w-[72px]"
      />
      <div className="flex w-full justify-between items-center p-3">
        <div className="flex flex-col  justify-center gap-1 flex-1">
          <div className="flex justify-between">
            <div className="flex gap-1 items-center">
              <FormatAddress address={creator?.address} />
              <ImageKit src={badge_check.src} alt="" className="h-5 w-5" />
            </div>
            <div
              onClick={(e) => {
                e.preventDefault();
                subScribe();
              }}
              className="flex gap-1 items-center"
            >
              {isLoading && (
                <AiOutlineLoading3Quarters className="text-base animate-spin" />
              )}

              {isSubscribed ? (
                <IoIosCheckmarkCircle
                  className={`${isLoading && "hidden"} text-base cursor-pointer`}
                />
              ) : (
                <IoIosAddCircle
                  className={`${isLoading && "hidden"} text-base cursor-pointer`}
                />
              )}
            </div>
          </div>
          <div className="flex flex-wrap font-normal items-center ">
            <FormatAddress address={creator?.address} />
            <MdContentCopy
              className="ml-2 cursor-pointer"
              onClick={handleCopyAddress}
            />
          </div>
        </div>
        {/* <div className="flex flex-col gap-2">
          
          <p className="text-buy font-normal">+120 BYTES/WEEK</p>
        </div> */}
      </div>
    </Link>
  );
};

const RandomCreator = () => {
  const { randomCreator } = useSocial();

  return (
    <div className="w-full font-bold mx-auto  max-w-[1440px] flex flex-col gap-8">
      <p className="text-2xl uppercase text-shadow-white">Who to subscribe</p>
      <div className="grid grid-cols-3 gap-5 items-center">
        {randomCreator.map((creator, index) => {
          return <CreatorCard key={index} creator={creator} />;
        })}
      </div>
    </div>
  );
};

export default RandomCreator;
