"use client";

import DropCard from "@/components/DropCard";
import FormatAddress from "@/components/FormatAddress";
import ImageKit from "@/packages/@ui-kit/Image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";
import badge_check from "@/assets/badge-check.svg";
import Button from "@/packages/@ui-kit/Button";
import { useSocial } from "@/services/providers/SocialProvider";
import RecentDrops from "./RecentDrops";

const Social = () => {
  const router = useRouter();
  const [copied, setCopied] = useState(false); // State for copy status

  const {} = useSocial();

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText("");
      setCopied(true); // Update copied state for feedback
    } catch (err) {
      console.error("Failed to copy address:", err);
      // Handle error gracefully (optional: display error message)
    } finally {
      setTimeout(() => setCopied(false), 2000); // Reset copied state after delay
    }
  };
  const onNavigate = (path: string) => {
    router.push(path);
  };

  const onNavigateDetail = () => {
    onNavigate("/activity");
  };

  return (
    <div className="fixed-height-under-header flex w-full flex-col gap-[72px] py-8 overflow-auto">
      <div className="w-full font-bold mx-auto  max-w-[1440px] flex flex-col gap-8">
        <div className="flex gap-4 items-center">
          <p className="text-2xl uppercase text-shadow-white">
            Highlight drops
          </p>
          <p
            onClick={onNavigateDetail}
            className="font-normal text-grays underline cursor-pointer hover:text-white"
          >
            (View all)
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <DropCard key={null} contractAddress="" />
          <DropCard key={null} contractAddress="" />
          <DropCard key={null} contractAddress="" />
          <DropCard key={null} contractAddress="" />
          <DropCard key={null} contractAddress="" />
        </div>
      </div>
      <div className="w-full font-bold mx-auto  max-w-[1440px] flex flex-col gap-8">
        <p className="text-2xl uppercase text-shadow-white">
          Recent distributed
        </p>
        <div className="grid grid-cols-3 gap-5 items-center">
          {Array.from({ length: 6 }).map((_, index) => {
            return (
              <div
                key={index}
                className="flex rounded-lg overflow-hidden border-border bg-dark-black"
              >
                <ImageKit src={""} alt="" className="h-[72px] w-[72px] " />
                <div className="flex w-full justify-between items-center p-3">
                  <div className="flex flex-col  justify-center gap-1">
                    <div className="flex gap-1 items-center">
                      <p className="text-base font-bold ">BEANZ Official</p>
                      <ImageKit
                        src={badge_check.src}
                        alt=""
                        className="h-5 w-5"
                      />
                    </div>
                    <div className="flex flex-wrap font-normal items-center ">
                      <FormatAddress address={"0x00dCE...DCGH"} />
                      <MdContentCopy
                        className="ml-2 cursor-pointer"
                        onClick={copyAddress}
                      />
                      <p className="ml-2">{copied ? "Copied!" : ""}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <IoIosAddCircle className="text-base cursor-pointer" />
                    <p className="text-buy font-normal">+120 BYTES/WEEK</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full font-bold mx-auto  max-w-[1440px] flex flex-col gap-8">
        <p className="text-2xl uppercase text-shadow-white">
          Highlight creators
        </p>
        <div className="flex gap-5">
          {Array.from({ length: 2 }).map((_, index) => {
            return (
              <div className="p-4 flex w-1/2 border-border bg-dark-black rounded-lg flex-col">
                <div className="w-full flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="aspect-square h-[56px]">
                      <ImageKit src="" alt="" className="h-full w-full" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        <p>BEANZ Official</p>
                        <ImageKit
                          src={badge_check.src}
                          alt=""
                          className="h-5 w-5"
                        />
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex flex-wrap font-normal items-center ">
                          <FormatAddress address={"0x00dCE...DCGH"} />
                          <MdContentCopy
                            className="ml-2 cursor-pointer"
                            onClick={copyAddress}
                          />
                          <p className="ml-2">{copied ? "Copied!" : ""}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button title="Subscribe" />
                </div>
                <p className="mt-4 mb-8 font-normal">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation
                </p>
                <div className="grid grid-cols-5 gap-3">
                  <ImageKit src="" alt="" className="" />
                  <ImageKit src="" alt="" className="" />
                  <ImageKit src="" alt="" className="" />
                  <ImageKit src="" alt="" className="" />
                  <ImageKit src="" alt="" className="" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <RecentDrops />
    </div>
  );
};

export default Social;
