import ImageKit from "@/packages/@ui-kit/Image";
import badge_check from "@/assets/badge-check.svg";
import { IoIosAddCircle } from "react-icons/io";

type RecentDropsImageProps = {
  src?: string;
};

const RecentDropsImage = (props: RecentDropsImageProps) => {
  const { src } = props;
  return (
    <div className="relative group">
      <div className="absolute  flex-col top-0 left-0 h-full w-full bg-gradient-to-b p-6 from-dark-black to-dark-black/50 hidden group-hover:flex transition-all duration-300 ease-out">
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-2">
            <ImageKit className="w-6 aspect-square" />
            <div className="flex gap-1 items-center">
              <p className="text-base font-bold uppercase ">BEANZ Official</p>
              <ImageKit src={badge_check.src} alt="" className="h-5 w-5" />
            </div>
          </div>
          <IoIosAddCircle className="text-base cursor-pointer" />
        </div>
        <p className="flex-1 mt-4 text-base text-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation
        </p>
        <div className="bg-[#232733] px-6 py-1.5 rounded-full w-fit h-fit grid place-items-center border border-border">
          <p className="text-[14px] font-bold">Protect - {10}</p>
        </div>
      </div>
      <ImageKit
        src={src}
        alt=""
        className="h-full w-full"
        width={445}
        height={445}
      />
    </div>
  );
};
export default RecentDropsImage;
