import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { VscArrowSwap } from "react-icons/vsc";
import { MdOutlineContentCopy } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { RiPencilLine } from "react-icons/ri";
import ImageKit from "@/packages/@ui-kit/Image";
import Button from "@/packages/@ui-kit/Button";
import { IoLogoDiscord, IoShareSocialOutline } from "react-icons/io5";
import { FaTelegram } from "react-icons/fa";
import { SiFarcaster } from "react-icons/si";
import { FaSquareXTwitter } from "react-icons/fa6";

const Profile = () => {
  return (
    <div className="fixed-height-under-header top-16 mt-0 flex flex-col border-r border-[#3A3A3C] xl:sticky xl:w-[447px] xl:overflow-auto">
      <div className="flex w-full flex-col gap-6 pb-8 pl-8 pr-4 pt-4">
        <div className="flex w-full flex-col gap-4">
          <ImageKit src="" className="aspect-square w-[96px]" />
          <div className="flex w-full flex-col gap-1">
            <div className="flex items-center gap-2">
              <h4 className="text-[24px] font-bold uppercase leading-7">
                Lavie.H
              </h4>
              <TbRosetteDiscountCheckFilled className="text-[#63B1FF]" />
              <VscArrowSwap className="text-white" />
            </div>
            <div className="divide-gray flex gap-4 divide-x">
              <div className="flex gap-2">
                <p>0x00dCE...DCGH</p>
                <MdOutlineContentCopy className="text-gray text-base" />
              </div>
              <div className="flex gap-5 pl-4 font-bold">
                <div className="flex gap-2">
                  <p className="text-gray">Subs</p>
                  <p>19.9k</p>
                </div>
                <div className="flex gap-2">
                  <p className="text-gray">Support</p>
                  <p>140K</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button title="Edit profile" variant="outline" className="w-full" />
      </div>
      <div className="flex w-full flex-col gap-4 border-b border-t border-[#3A3A3C] pb-8 pl-8 pr-4 pt-4">
        <div className="flex w-full justify-between">
          <h3 className="text-[20px] font-bold uppercase leading-6">about</h3>
          <div className="flex gap-4 text-[20px]">
            <IoShareSocialOutline />
            <TbWorld />
            <FaTelegram />
            <FaSquareXTwitter />
            <SiFarcaster />
            <IoLogoDiscord />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-gray text-base leading-5">
            Photography drops every week from Andrew Mason. Andrew Mason is a
            New York City and Los Angeles based photographer, videographer,
            content creator, and editor. Andrew has had a camera in hand since
            age 11 and his work is inspired by a love for art, design...
          </p>
          <p className="font-bold text-[#63B1FF] ">Read more</p>
        </div>
      </div>
      <div className="flex w-full flex-col gap-8 pb-8 pl-8 pr-4 pt-4">
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-1">
              <h3 className="text-[20px] font-bold uppercase leading-6">
                Perks
              </h3>
              <RiPencilLine className="text-gray text-base" />
            </div>
            <Button
              title="Create rewards"
              variant="outline"
              className="border-white text-white"
            />
          </div>
          <div className="text-gray flex flex-col gap-3 text-base leading-5">
            <p className="">
              🏆 #1 on the leaderboard allows you to collaborate with OUTKAST.
              Your idea will remain on the official channel forever.
              <br /> 👑 Top 10 Thankers receive a guaranteed Legendary. <br />
              🚷 Top 777 Thankers receive a guaranteed Rare. <br />
              🔪 47 Legendaries will be sent randomly among the top 1000
              Thankers
            </p>
            <p> Last updated:12/07/2024</p>
          </div>
        </div>
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full justify-between text-base font-bold leading-5">
            <p className="">24D 16H 23M 14S</p>
            <p className="text-gray uppercase">Till snapshot</p>
          </div>
          <div className="relative h-[2px] w-full bg-[#3A3A3C]">
            <div className="absolute left-0 top-0 h-[2px] w-[50%] bg-white "></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
