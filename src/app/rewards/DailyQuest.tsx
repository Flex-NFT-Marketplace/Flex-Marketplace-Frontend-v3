"use client";
import Button from "@/packages/@ui-kit/Button";
import ImageKit from "@/packages/@ui-kit/Image";
import { useAccountContext } from "@/services/providers/AccountProvider";
import { useState } from "react";
import UserImg from "@/assets/user.png";
import { strShortAddress } from "@/utils/string";
import FormatAddress from "@/components/FormatAddress";
import { MdContentCopy } from "react-icons/md";

const DailyQuest = () => {
  const { profile } = useAccountContext();
  const address = "0x1234567890123456789012345678901234567890"; // mockup

  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText((address as string) || "");
      setCopied(true);
    } catch (err) {
      console.error("Failed to copy address:", err);
    } finally {
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex h-full max-w-full flex-col lg:w-[500px]">
      <div className="border border-t-0 border-line p-8">
        <p className="text-xl font-bold uppercase">Profile</p>
        <div className="mt-4 flex items-center gap-3">
          <ImageKit
            src={UserImg.src}
            alt=""
            className="h-[52px] w-[52px] rounded-sm"
          />
          <div className="flex flex-col justify-center">
            <p className="text-2xl font-bold">
              {strShortAddress(address as string)}
            </p>

            <div className="flex items-center max-sm:flex-col max-sm:items-start">
              <div className="flex items-center">
                <FormatAddress address={address as string} />
                <MdContentCopy
                  className="ml-2 cursor-pointer text-sm text-grays"
                  onClick={copyAddress}
                />
                <p className="ml-2 text-xs"> {copied ? "Copied!" : ""}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between border border-dashed border-white/35 bg-dark-black p-6 max-sm:gap-4">
          <div className="flex flex-col items-center justify-center gap-1">
            <p className="text-xl font-bold">#145</p>
            <p className="text-center text-sm font-bold text-grays">Rank</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <p className="text-xl font-bold">32,540</p>
            <p className="text-center text-sm font-bold text-grays">
              Total points
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <p className="text-xl font-bold">120</p>
            <p className="text-center text-sm font-bold text-grays">
              Daily claimed
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <p className="text-xl font-bold text-secondary">120</p>
            <p className="text-center text-sm font-bold text-grays">Streaks</p>
          </div>
        </div>
      </div>
      <div className="relative flex-1 overflow-auto border border-t-0 border-line px-8">
        <div className="sticky top-0 flex items-center justify-between bg-background  pt-8">
          <p className="text-xl font-bold uppercase">Daily quest</p>
          <p className="text-xl font-bold uppercase text-grays">
            Completed {"0/5"}
          </p>
        </div>
        <div className="mt-4 flex flex-col gap-4 pb-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between border border-dashed border-white/35 bg-dark-black px-4 py-6"
            >
              <div className="flex flex-col gap-1">
                <p className="font-bold uppercase">Daily log-in</p>
                <p className="text-sm">To receive {10} points</p>
              </div>
              <Button title="Claim" variant="secondary" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyQuest;
