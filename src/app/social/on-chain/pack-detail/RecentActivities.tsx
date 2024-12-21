import ImageKit from "@/packages/@ui-kit/Image";
import { FaRegFolderOpen } from "react-icons/fa";
import ethSVG from "@/assets/EthereumBadge.svg";
import { FiTag } from "react-icons/fi";
import { TbGavel } from "react-icons/tb";

const RecentActivities = () => {
  return (
    <table className="min-w-[1000px] w-full table-auto border-separate border-spacing-0 border-spacing-y-1">
      <thead className="font-bold text-[20px]  max-md:text-[18px] uppercase leading-6 text-gray">
        <tr className=" ">
          <th className="text-start pl-4">ACTION</th>
          <th className="text-start">ITEM</th>
          <th className="text-start">RARITY</th>
          <th className="text-start">PRICE</th>
          <th className="text-start">FROM</th>
          <th className="text-start">TO</th>
          <th className="text-end pr-4">TIME</th>
        </tr>
        {/* empty div as spacer */}
        <tr className="h-4"></tr>
      </thead>
      <tbody className=" w-full text-nowrap">
        <tr className="w-full hover:bg-dark-black my-[2px]">
          <td className=" pl-4">
            <div className="flex gap-1 justify-start items-center text-[#BF5AF2]">
              <FaRegFolderOpen className="text-[12px] " />
              <p className="text-base leading-5 uppercase font-bold">Opened</p>
            </div>
          </td>
          <td>
            <div className=" justify-start flex items-center gap-6">
              <ImageKit src="" className="w-[64px] aspect-square mr-3" />
              <div className="flex flex-col">
                <p className="font-bold text-base leading-5">
                  AZUKI BEAN #1234
                </p>
                <p className="text-sm text-[#9CA3AF]">Pack name</p>
              </div>
            </div>
          </td>
          <td>
            <div className=" text-[#30D158] border border-[#30D158] bg-[#30D158]/15 font-bold text-[14px] leading-5 rounded-sm h-fit uppercase py-[2px] w-[80px] text-center">
              common
            </div>
          </td>
          <td>
            <div className="flex justify-start">
              <p className="font-bold text-base leading-5">123</p>
              <ImageKit src={ethSVG.src} className="h-5 w-5" />
            </div>
          </td>
          <td>
            <p className="font-bold text-base leading-5 text-start">0xBD045</p>
          </td>
          <td>
            <p className="font-bold text-base leading-5 text-start">-</p>
          </td>
          <td>
            <p className="font-bold text-base leading-5 text-[#63B1FF] text-end pr-4">
              22 mins
            </p>
          </td>
        </tr>
        <tr className="w-full hover:bg-dark-black my-[2px]">
          <td className="pl-4">
            <div className="flex gap-1 justify-start items-center text-[#22C55E]">
              <FiTag className="text-[12px]" />
              <p className="text-base leading-5 uppercase font-bold">SOLD</p>
            </div>
          </td>
          <td>
            <div className=" justify-start flex items-center gap-6">
              <ImageKit src="" className="w-[64px] aspect-square mr-3" />
              <div className="flex flex-col">
                <p className="font-bold text-base leading-5">
                  AZUKI BEAN #1234
                </p>
                <p className="text-sm text-[#9CA3AF]">Pack name</p>
              </div>
            </div>
          </td>
          <td>
            <div className=" text-[#63B1FF] border border-[#63B1FF] bg-[#63B1FF]/15 font-bold text-[14px] leading-5 rounded-sm h-fit uppercase py-[2px] w-[80px] text-center ">
              elite
            </div>
          </td>
          <td>
            <div className="flex justify-start">
              <p className="font-bold text-base leading-5">123</p>
              <ImageKit src={ethSVG.src} className="h-5 w-5" />
            </div>
          </td>
          <td>
            <p className="font-bold text-base leading-5 text-start">0xBD045</p>
          </td>
          <td>
            <p className="font-bold text-base leading-5 text-start">-</p>
          </td>
          <td>
            <p className="font-bold text-base leading-5 text-[#63B1FF] text-end pr-4">
              22 mins
            </p>
          </td>
        </tr>
        <tr className="w-full hover:bg-dark-black my-[2px]">
          <td className="pl-4">
            <div className="flex gap-1 justify-start items-center text-[#FF9F0A]">
              <TbGavel className="text-[12px]" />
              <p className="text-base leading-5 uppercase font-bold">Bidding</p>
            </div>
          </td>
          <td>
            <div className=" justify-start flex items-center gap-6">
              <ImageKit src="" className="w-[64px] aspect-square mr-3" />
              <div className="flex flex-col">
                <p className="font-bold text-base leading-5">
                  AZUKI BEAN #1234
                </p>
                <p className="text-sm text-[#9CA3AF]">Pack name</p>
              </div>
            </div>
          </td>
          <td>
            <div className=" text-[#F2F2F7] border border-[#F2F2F7] bg-[#F2F2F7]/15 font-bold text-[14px] leading-5 rounded-sm h-fit uppercase py-[2px] w-[80px] text-center">
              platinum
            </div>
          </td>
          <td>
            <div className="flex justify-start">
              <p className="font-bold text-base leading-5">123</p>
              <ImageKit src={ethSVG.src} className="h-5 w-5" />
            </div>
          </td>
          <td>
            <p className="font-bold text-base leading-5 text-start">0xBD045</p>
          </td>
          <td>
            <p className="font-bold text-base leading-5 text-start">-</p>
          </td>
          <td>
            <p className="font-bold text-base leading-5 text-[#63B1FF] text-end pr-4">
              22 mins
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
export default RecentActivities;
