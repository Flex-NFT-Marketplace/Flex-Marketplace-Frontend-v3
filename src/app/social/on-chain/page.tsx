"use client";
import avt from "@/assets/social/avatar.png";
import live from "@/assets/social/live.svg";
import background from "@/assets/social/bg-onchain.png";
import ImageKit from "@/packages/@ui-kit/Image";
import { TbRosetteDiscountCheckFilled, TbWorld } from "react-icons/tb";
import { FaInfoCircle, FaTelegram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoLogoDiscord } from "react-icons/io5";
import Button from "@/packages/@ui-kit/Button";
import { MdOutlineContentCopy } from "react-icons/md";
import Link from "next/link";
import { SiFarcaster } from "react-icons/si";
import CardNFT from "@/components/CardNFT";
import { useRouter } from "next/navigation";
import PackCard from "@/components/AtemuCard/PackCard";
import Spinner from "./Spinner";
import HorizontalSpinner from "@/app/rewards/HorizontalSpinner";
import { useEffect, useRef, useState } from "react";

const OnChain = () => {
  const router = useRouter();
  const spinContainer = useRef<HTMLDivElement>(null);
  const [heightSpin, setHeightSpin] = useState(0);

  const nftMockup: any = {
    amount: 1,
    attributes: [],
    blockTime: 1721218436,
    burnedAt: null,
    chain: "6604ef9082c9669beb15ce87",
    createdAt: "2024-06-27T22:57:10.872Z",
    creator:
      "0x0007e17ab90d2abf29b1a2b418567067d7f1ce49602feb29ac11901e35fb965e",
    description: "Flex EVO is set to become the cornerstone...",
    image:
      "https://ipfs.io/ipfs/QmaXMk4MQVh5uwbPq1tg8daUGtnJjgTokiN282wzGbC2so",
    isBurned: false,
    marketType: "NotForSale",
    name: "Flex EVO Official",
    nftCollection: {
      _id: "667dd2ec06e6c47eb12173db",
      key: "0x04546729db564bb29a9e1e215463f41bc53116ac75eeb8e029b8a87fee7d85fd",
      name: "Flex Evo",
      standard: "ERC-721",
      symbol: "FEV",
      avatar: "",
      description: "string",
      verified: true,
    },
    nftContract:
      "0x04546729db564bb29a9e1e215463f41bc53116ac75eeb8e029b8a87fee7d85fd",
    owner: {
      _id: true,
      username:
        "0x014f337b7e30e74827a22ba497b90d011efb57d16553ddc9cd10d0d3ecc5 a106",
      address:
        "0x014f337b7e30e74827a22ba497b90d011efb57d16553ddc9cd10d0d3ecc5 a106",
      isVerified: "false",
    },
    royaltyRate: 0,
    tokenId: "1233",
    tokenUri:
      "https://ipfs.io/ipfs/QmfXBqEzgfJK6rJHZZzHHW8hxyqyNVVsYobqtFH1WRU 6oR/1.json",
    _id: "667dee4606e6c47eb13260a5",
    orderData: {
      bestAsk: {},
      listAsk: [],
      listBid: [],
    },
  };

  const onNavigate = (path: string) => {
    router.push(path);
  };

  const onNavigateDetail = () => {
    onNavigate("on-chain/pack-detail");
  };

  useEffect(() => {
    if (spinContainer.current) {
      setHeightSpin(spinContainer.current.clientHeight);
    }
  }, []);

  return (
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
              <div className=" max-w-[1440px] max-sm:px-4 px-8 mx-auto w-full flex flex-col gap-2">
                <ImageKit
                  src={avt.src}
                  width={72}
                  className="aspect-square rounded-sm"
                  alt=""
                />
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2 text-[24px] items-center">
                    <div className="flex gap-1 items-center">
                      <p className="font-bold  leading-7 uppercase">Atemu</p>
                      <TbRosetteDiscountCheckFilled className="text-[#63B1FF] " />
                    </div>
                    <svg
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
                      <rect x="11" y="11" width="2" height="6" fill="white" />
                      <rect x="11" y="7" width="2" height="2" fill="white" />
                    </svg>
                  </div>
                  <p className="text-base leading-5 max-w-[537px]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
                <div className="flex gap-3 text-gray text-base items-center">
                  <TbWorld />
                  <FaTelegram />
                  <FaSquareXTwitter />
                  <SiFarcaster />
                  <IoLogoDiscord />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative border-b border-line" ref={spinContainer}>
          <HorizontalSpinner />
        </div>

        <div className="max-sm:px-4 mt-9 mb-[72px] px-8 max-w-[1440px] mx-auto w-full flex flex-col gap-[84px] max-md:gap-[40px] max-md:mb-[112px]">
          <div className="flex flex-col gap-8 w-full">
            <div className="w-full flex justify-between items-center max-sm:flex-col max-sm:gap-2 max-sm:items-start">
              <div className="flex gap-3">
                <div className="border p-1 h-fit border-border rounded-sm  max-sm:hidden">
                  <ImageKit
                    src={avt.src}
                    className="rounded-sm w-11 aspect-square"
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex gap-2 items-center">
                    <div className="flex gap-2 text-[24px] items-center">
                      <div className="flex gap-1 items-center">
                        <p className="font-bold uppercase leading-7">
                          Atemu pack: pack 24
                        </p>
                        <TbRosetteDiscountCheckFilled className="text-[#63B1FF] " />
                      </div>
                      <svg
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
                        <rect x="11" y="11" width="2" height="6" fill="white" />
                        <rect x="11" y="7" width="2" height="2" fill="white" />
                      </svg>
                    </div>
                    <div className="text-green text-[10px] leading-4 bg-green/15 rounded-sm border border-green py-[2px] px-2 ">
                      On sale
                    </div>
                  </div>
                  <div className="divide-gray flex items-center gap-4 divide-x max-sm:flex-col max-sm:items-start max-sm:divide-none max-sm:gap-1">
                    <div className="flex items-center gap-2">
                      <p className="">0x00dCE...DCGH</p>
                      <MdOutlineContentCopy className="text-gray cursor-pointer text-base leading-4" />
                    </div>
                    <div className="flex gap-5">
                      <div className="flex items-center gap-2 pl-4 font-bold leading-4 max-sm:p-0">
                        <p className=" text-gray">Pack sold</p>
                        <p className="text-white">19.9k</p>
                      </div>
                      <div className="flex items-center gap-2 pl-4 font-bold leading-4 max-sm:p-0">
                        <p className=" text-gray">Owners</p>
                        <p className="text-white">19.9k</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Button onClick={() => onNavigateDetail()}>See all</Button>
            </div>
            <div className="flex gap-5 items-center max-lg:flex-col lg:h-[384px]">
              <div className="max-w-full lg:max-w-[50%] h-full">
                <ImageKit src="/images/launchpad-bg1.png" className="h-full" />
              </div>
              <div className="flex overflow-auto gap-4 h-full flex-1 max-lg:w-full">
                <PackCard />
                <PackCard />
                <PackCard />
                <PackCard />
              </div>
            </div>
            {/* <div className="flex w-full gap-5 max-md:flex-col">
              <div className="relative h-fit">
                <ImageKit
                  src="/images/launchpad-bg1.png"
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
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-1/2 flex max-md:w-full overflow-auto">
                {Array.from({ length: 8 }).map(() => {
                  return <PackCard />;
                })}
              </div>
            </div> */}
          </div>
          <div className="flex gap-8 w-full flex-col">
            <div className="w-full flex justify-between items-center max-xl:flex-col max-xl:items-start max-xl:gap-4">
              <div className="w-full flex justify-between items-center max-sm:flex-col max-sm:gap-2 max-sm:items-start">
                <div className="flex gap-3">
                  <div className="border p-1 h-fit border-border rounded-sm  max-sm:hidden">
                    <ImageKit
                      src={avt.src}
                      className="rounded-sm w-11 aspect-square"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-2 items-center">
                      <div className="flex gap-2 text-[24px] items-center">
                        <div className="flex gap-1 items-center">
                          <p className="font-bold uppercase leading-7">
                            Atemu pack: pack 24
                          </p>
                          <TbRosetteDiscountCheckFilled className="text-[#63B1FF] " />
                        </div>
                        <svg
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
                        </svg>
                      </div>
                      <div className="text-green text-[10px] leading-4 bg-green/15 rounded-sm border border-green py-[2px] px-2">
                        On sale
                      </div>
                    </div>
                    <div className="divide-gray flex items-center gap-4 divide-x max-sm:flex-col max-sm:items-start max-sm:divide-none max-sm:gap-1">
                      <div className="flex items-center gap-2">
                        <p className="">0x00dCE...DCGH</p>
                        <MdOutlineContentCopy className="text-gray cursor-pointer text-base leading-4" />
                      </div>
                      <div className="flex gap-5">
                        <div className="flex items-center gap-2 pl-4 font-bold leading-4 max-sm:p-0">
                          <p className=" text-gray">Pack sold</p>
                          <p className="text-white">19.9k</p>
                        </div>
                        <div className="flex items-center gap-2 pl-4 font-bold leading-4 max-sm:p-0">
                          <p className=" text-gray">Owners</p>
                          <p className="text-white">19.9k</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-5 items-center ">
                <div className="flex max-sm:flex-wrap gap-y-3 gap-9 text-nowrap">
                  <div className="flex flex-col font-bold text-[14px] items-end ">
                    <p className="leading-4">112,9k ETH</p>
                    <p className="text-gray leading-[18px]">Total Volume</p>
                  </div>
                  <div className="flex flex-col font-bold text-[14px] items-end">
                    <p className="leading-4">19 ETH</p>
                    <p className="text-gray leading-[18px]">Floor Price</p>
                  </div>
                  <div className="flex flex-col font-bold text-[14px] items-end">
                    <p className="leading-4">1,234 ETH</p>
                    <p className="text-gray leading-[18px]">Best Offer</p>
                  </div>
                  <div className="flex flex-col font-bold text-[14px] items-end">
                    <p className="leading-4">600 ETH</p>
                    <p className="text-gray leading-[18px]">7D Volume</p>
                  </div>
                  <div className="flex flex-col font-bold text-[14px] items-end">
                    <p className="leading-4">10%</p>
                    <p className="text-gray leading-[18px]">Listed</p>
                  </div>
                  <div className="flex flex-col font-bold text-[14px] items-end">
                    <p className="leading-4">10,000</p>
                    <p className="text-gray leading-[18px]">Owners</p>
                  </div>
                </div>
                <Button onClick={() => onNavigateDetail()}>See all</Button>
              </div>
            </div>
            <div className="flex gap-4 overflow-auto">
              {Array.from({ length: 8 }).map(() => {
                return <CardNFT nft={nftMockup} onReload={() => {}} />;
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full fixed z-10 bg-black bottom-0 left-0 border-t border-gray">
        <div className=" flex justify-between items-center max-sm:px-4 px-8 max-w-[1440px] mx-auto w-full max-md:flex-col max-md:gap-1">
          <div className="flex items-center gap-4">
            <div className="flex gap-1 items-center">
              <ImageKit src={live.src} className="w-3 h-3" />
              <p className="font-bold text-[14px] leading-5">LIVE DATA</p>
            </div>
            <div className="h-8 w-[1px] bg-gray max-md:hidden "></div>
            <div className="flex gap-4 items-center">
              <Link href={"#"}>
                <FaSquareXTwitter
                  className={`aspect-square h-5 cursor-pointer text-gray`}
                />
              </Link>
              <Link href={"#"}>
                <IoLogoDiscord className={`aspect-square h-5 text-gray`} />
              </Link>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="h-8 w-[1px] bg-gray max-md:hidden"></div>
            <div className=" border-gray pl-6 items-center flex gap-6 flex-wrap gap-y-[2px] ">
              <div className="flex gap-1 text-gray font-bold text-[14px] leading-5">
                <p>Starknet network:</p>
                <p className="text-green uppercase">150 TPS</p>
              </div>
              <div className="flex gap-1 text-gray font-bold text-[14px] leading-5">
                <p>STRK/USDT:</p>
                <p className="text-green uppercase">$0.6</p>
              </div>
              <div className="flex gap-1 text-gray font-bold text-[14px] leading-5">
                <p>ETH/USDT:</p>
                <p className="text-green uppercase">$3,500</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OnChain;
