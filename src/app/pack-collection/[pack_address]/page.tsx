"use client";

import background from "@/assets/social/atemu.png";
import ImageKit from "@/packages/@ui-kit/Image";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoLogoDiscord } from "react-icons/io5";
import Link from "next/link";
import PackCard from "@/components/AtemuCard/PackCard";
import Activity from "@/app/(home)/Activity";
import { usePackCollectionContext } from "@/services/providers/PackCollectionProvider";
import { useAccount } from "@starknet-react/core";
import { useToast } from "@/packages/@ui-kit/Toast/ToastProvider";
import launchpadBg1 from "@/assets/launchpad-bg1.png";
import poster from "@/assets/posterAtemuDetail.png";
import LiveData from "./Livedata";
import { toast } from "react-toastify";

const PackDetail = () => {
  const { collection, nfts, isMarket, setIsMarket, packOfOwner } =
    usePackCollectionContext();
  const { address } = useAccount();

  return (
    <>
      <div className="fixed-height-under-header w-full gap-9 bg-opacity-85 flex flex-col min-h-[100vh]">
        <div className="flex-1">
          <div className="w-full border-b border-border">
            <div className="h-fit w-full relative">
              <ImageKit
                className="w-full max-xl:h-[266.66px] max-sm:aspect-auto aspect-[1440/300] object-cover object-top"
                src={background.src}
                alt=""
              />
              <div className="absolute h-full w-screen left-0 bottom-0 bg-gradient-to-t from-black to-transparent via-transparent"></div>
              <div className="absolute bottom-6 w-full">
                <div className=" max-w-[1440px] px-20 max-xl:px-5 mx-auto w-full flex flex-col gap-2">
                  <ImageKit
                    src={launchpadBg1.src}
                    width={72}
                    className="aspect-square rounded-sm"
                    alt=""
                  />

                  <div className="flex justify-between">
                    {/* <div className="flex gap-3 text-gray text-base items-center">
                      <TbWorld />
                      <FaTelegram />
                      <FaSquareXTwitter />
                      <SiFarcaster />
                      <IoLogoDiscord />
                    </div> */}
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2 text-[24px] items-center">
                        <div className="flex gap-1 items-center">
                          <p className="font-bold  leading-7 uppercase">
                            Atemu
                          </p>
                          <TbRosetteDiscountCheckFilled className="text-[#63B1FF] " />
                        </div>
                        {/* <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="3"
                            y="3"
                            width="18"
                            height="18"
                            rx="9"
                            fill="#1F2937"
                          />
                          <path
                            d="M11 7H13V9H11V7ZM11 11H13V17H11V11ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                            fill="#1F2937"
                          />
                          <rect
                            x="11"
                            y="11"
                            width="2"
                            height="6"
                            fill="white"
                          />
                          <rect
                            x="11"
                            y="7"
                            width="2"
                            height="2"
                            fill="white"
                          />
                        </svg> */}
                      </div>
                      <p className="text-base leading-5 max-w-[537px]">
                        {collection?.description}
                      </p>
                    </div>
                    <div className="flex gap-2 font-bold text-base leading-5 items-center">
                      <p className={`${isMarket ? "text-white" : "text-gray"}`}>
                        Market
                      </p>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          onChange={() => {
                            if (!address) {
                              toast("Please connect your wallet");
                              return;
                            } else {
                              setIsMarket(!isMarket);
                            }
                          }}
                          type="checkbox"
                          value=""
                          className="sr-only peer"
                        />
                        <div
                          className={`relative  bg-dark-black border border-border w-9 h-5 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-border rounded-full peer peer-checked:after:translate-x-full 
                        rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] peer-checked:bg-black after:absolute after:top-1/2 after:-translate-y-1/2 after:start-1 after:bg-white after:rounded-full after:w-3 after:aspect-square after:transition-all`}
                        ></div>
                      </label>
                      <p
                        className={`${!isMarket ? "text-white" : "text-gray"}`}
                      >
                        Owned
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="w-full flex justify-center items-center py-[14px] gap-6 font-bold text-base leading-5 text-gray uppercase border-b border-border">
            <div className="cursor-pointer drop-shadow-active-text py-1 px-3 text-shadow text-white filter  transition-all inline-block">
              Common
            </div>
            <p>/</p>
            <p className="cursor-pointer hover:text-white  transition-all">
              Elite
            </p>
            <p>/</p>
            <p className="cursor-pointer hover:text-white  transition-all">
              platinum
            </p>
            <p>/</p>
            <p className="cursor-pointer hover:text-white transition-all">
              Supreme
            </p>
          </div> */}
          <div className="mx-auto w-full max-w-[1440px] pb-20 px-20 max-xl:px-5 font-bold mt-4">
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col max-w-[537px] w-full">
                {/* <div className=" text-[#30D158] border border-[#30D158] bg-[#30D158]/15 font-bold text-[14px] leading-5 rounded-sm h-fit uppercase py-[2px] px-2 w-fit text-center">
                  common
                </div> */}
                <p className="mt-1 w-fit font-bold text-[32px] leading-9 uppercase">
                  PACK COLLECTION
                </p>
                {/* <p className="text-base leading-5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p> */}
              </div>
              {/* <div className="flex gap-5 items-center max-lg:flex-col lg:h-[384px]">
                <div className="max-w-full lg:max-w-[50%] h-full lg:hidden">
                  <ImageKit
                    src="/images/launchpad-bg1.png"
                    className="h-full"
                  />
                </div>
                <div className="h-full max-lg:hidden">
                  <ImageKit
                    src={background_atemu_lite.src}
                    className="h-full w-auto"
                  />
                </div>

                <div className="flex overflow-auto max-lg:w-full gap-4 h-full flex-1">
                  {Array.from({ length: 5 }).map((_, index) => {
                 return  <PackCard />;
                  })}
                </div>
              </div> */}

              <div className="flex gap-5 items-center max-lg:flex-col lg:h-[384px]">
                <div className="h-full aspect-[2/3]">
                  <ImageKit src={poster.src} className="h-full" />
                </div>
                <div className="flex overflow-auto gap-4 h-full flex-1 max-lg:w-full">
                  {isMarket
                    ? nfts.map((pack, index) => {
                        return (
                          <PackCard
                            key={index}
                            pack={pack}
                            canOpen={!isMarket}
                          />
                        );
                      })
                    : packOfOwner.map((pack, index) => {
                        return (
                          <PackCard
                            key={index}
                            pack={pack}
                            canOpen={!isMarket}
                          />
                        );
                      })}

                  {!isMarket && packOfOwner.length <= 0 && (
                    <p>You don't have any packs</p>
                  )}

                  {/* <PackCard />
                <PackCard />
                <PackCard /> */}
                </div>
              </div>

              {/* <div className="flex w-full gap-5 max-md:flex-col">
                <div className="relative h-fit">
                  <ImageKit
                    src={background_atemu_lite.src}
                    className="h-[384px] w-fit aspect-[678/384]"
                    alt=""
                  />
                  <div className="absolute left-0 max-xl:max-w-[90%] max-w-[40%] w-full bottom-0 ml-4 mb-6">
                    <div className="flex flex-col">
                      <p className="text-primary font-bold text-base leading-5">
                        Become the Legends
                      </p>
                      <p className="mt-1 mb-3 uppercase font-bold text-[32px] leading-9">
                        Pack name
                      </p>
                      <p className="text-base leading-5">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-1/2 firstSliderOnChain max-md:w-full">
                  {Array.from({ length: 8 }).map(() => {
                    return (
                      <div
                        className="cursor-pointer"
                        onClick={() => toggleModal()}
                      >
                        <CardNFT nft={nftMockup} onReload={() => {}} />
                      </div>
                    );
                  })}
                </div>
              </div> */}
            </div>
          </div>
          <Activity />
        </div>

        <LiveData />
      </div>
    </>
  );
};
export default PackDetail;
