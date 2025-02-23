"use client";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { MdOutlineContentCopy } from "react-icons/md";
import { FaEthereum } from "react-icons/fa";
import ImageKit from "@/packages/@ui-kit/Image";
import Button from "@/packages/@ui-kit/Button";
import { ICreator } from "@/types/Idrop";
import { useSocial } from "@/services/providers/SocialProvider";
import { copyToClipboard, strShortAddress } from "@/utils/string";
import { useToast } from "@/packages/@ui-kit/Toast/ToastProvider";
import Link from "next/link";
import { IProfileStaging } from "@/types/IStagingNft";
import { toast } from "react-toastify";

const CreatorSuggestCard = ({ creator }: { creator: IProfileStaging }) => {
  const handleCopyAddress = (address: string) => {
    try {
      copyToClipboard(address);
      toast("Copy address successfully");
    } catch (error) {
      toast("Something went wrong");
    }
  };

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-3">
        <ImageKit src="" className="aspect-square w-[52px] rounded-sm" />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <p className="text-base font-bold uppercase leading-5">
              {strShortAddress(creator.address)}
            </p>
            <TbRosetteDiscountCheckFilled className="text-base text-[#63B1FF]" />
          </div>
          <div className="flex items-center gap-2">
            <p>{strShortAddress(creator.address)}</p>
            <MdOutlineContentCopy
              onClick={() => handleCopyAddress(creator.address)}
              className="text-gray text-base hover:text-white cursor-pointer"
            />
          </div>
        </div>
      </div>
      <Link href={`/drophaus/${creator.address}`}>
        <Button
          title="Detail"
          variant="outline"
          className="border-primary text-primary"
        />
      </Link>
    </div>
  );
};

const Activities = () => {
  const { creatorsSuggestion } = useSocial();

  return (
    <div className="fixed-height-under-header top-16 mt-0 flex flex-col divide-y divide-[#3A3A3C] overflow-auto border-l border-[#3A3A3C] md:sticky md:w-[362px]">
      <div className="flex w-full flex-col gap-6 pb-8 pl-5 pr-8 pt-4">
        <h3 className="text-[20px] font-bold uppercase leading-6">
          Who to subscribe
        </h3>
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full flex-col gap-3">
            {creatorsSuggestion.map((creator, index) => (
              <CreatorSuggestCard creator={creator} key={index} />
            ))}
          </div>
          <p className="font-bold text-[#63B1FF] ">Show more</p>
        </div>
      </div>
      <div className="flex w-full flex-col gap-6 pl-5 pr-3 pt-4">
        <h3 className="text-[20px] font-bold uppercase leading-6">
          Activities
        </h3>
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full justify-between">
            <div className="flex items-center gap-2">
              <ImageKit src="" className="aspect-square w-[72px] rounded" />

              <div className="flex flex-col gap-1 font-bold">
                <p className=" text-gray">#1234</p>
                <div className="flex items-center gap-2">
                  <div className="rounded-sm bg-[#30D158]/15 px-2 py-[2px] text-[#30D158] ">
                    Sold
                  </div>
                  <div className="flex items-center">
                    <p className="leading-5 text-[#F9FAFB]">12</p>
                    <FaEthereum className="leading-[14px]" />
                  </div>
                </div>
                <div className="flex gap-1 font-bold">
                  <p className="">by</p>
                  <p>0xadc4...44a0</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <p className="font-bold">2 mins</p>
              <p className="text-gray text-[15px] font-medium">-</p>
            </div>
          </div>
          <div className="flex w-full justify-between">
            <div className="flex items-center gap-2">
              <ImageKit src="" className="aspect-square w-[72px] rounded" />

              <div className="flex flex-col gap-1 font-bold">
                <p className=" text-gray">#1234</p>
                <div className="flex items-center gap-2">
                  <div className="rounded-sm bg-[#FF8AD0]/15 px-2 py-[2px] text-[#FF8AD0] ">
                    Minted
                  </div>
                  <div className="flex items-center">
                    <p className="leading-5 text-[#F9FAFB]">12</p>
                    <FaEthereum className="leading-[14px]" />
                  </div>
                </div>
                <div className="flex gap-1 font-bold">
                  <p className="">by</p>
                  <p>0xadc4...44a0</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <p className="font-bold">2 mins</p>
              <p className="text-gray text-[15px] font-medium">-</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
