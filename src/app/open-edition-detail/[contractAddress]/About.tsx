import Button from "@/lib/@core/Button";
import { strShortAddress } from "@/utils/string";
import { IoMdShare } from "react-icons/io";
import { MdOutlineContentCopy } from "react-icons/md";
import { RiGlobalLine } from "react-icons/ri";
import { FaSquareXTwitter } from "react-icons/fa6";
import { SiFarcaster } from "react-icons/si";
import { IoLogoDiscord } from "react-icons/io5";
import edit_calender from "@/assets/edit_calendar.svg";
import checked_calendar from "@/assets/checked_calender.svg";
import badge_check from "@/assets/badge-check.svg";
import ImageKit from "@/packages/@ui-kit/Image";

const About = () => {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between">
        <p
          title={"Community is KING"}
          className="line-clamp-1 text-[44px] uppercase max-md:text-2xl"
        >
          Community is KING
        </p>
        <div className="flex gap-5">
          <IoMdShare className={`aspect-square h-5`} />
          <RiGlobalLine className={`aspect-square h-5`} />
          <FaSquareXTwitter className={`aspect-square h-5`} />
          <SiFarcaster className={`aspect-square h-5`} />
          <IoLogoDiscord className={`aspect-square h-5`} />
        </div>
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="aspect-square h-[52px]">
            <ImageKit src="" alt="" className="h-full w-full" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <p>UserName</p>
              <ImageKit src={badge_check.src} alt="" className="h-5 w-5" />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <p>{strShortAddress("0x000000000")}</p>
                <MdOutlineContentCopy
                  className={`aspect-square h-4  text-grays`}
                />
              </div>
              <div className="h-4 w-[1px] bg-grays"></div>
              <div>
                <p className="text-grays">
                  Items <span className="text-white">20k</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button title="Support" className="w-[100px] bg-white text-black" />
          <Button
            title="Subscribe"
            className="w-[100px] border-white text-white"
            mode="outline"
          />
        </div>
      </div>
      <div className="mt-8">
        <p className="text-grays">
          Zoolana.io is a groundbreaking mobile strategy game being built on
          Solana. Players will trade assets, raise armies, and play with friends
          in a game with strategic depth fully unlocked by the blockchain.
        </p>
      </div>
      <div className="mt-6 flex flex-wrap gap-8 gap-y-4 text-grays">
        <div className="flex items-center gap-2">
          <ImageKit src={edit_calender.src} alt="" className="h-5 w-5" />
          <p>12/07/2024</p>
        </div>
        <div className="flex items-center gap-2">
          <ImageKit src={checked_calendar.src} alt="" className="h-5 w-5" />
          <p>14/07/2024 13:30 - 14/07/2024 13:30</p>
        </div>
      </div>
    </div>
  );
};

export default About;
