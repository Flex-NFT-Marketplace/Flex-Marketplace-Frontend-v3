import flexlogo from "@/assets/logoFlexMarketplace.svg";
import ImageKit from "@/packages/@ui-kit/Image";
import Link from "next/link";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { TbSeeding } from "react-icons/tb";
import bannerFlexCreate from "@/assets/banner-flex-create.png";

const FlexCreate = () => {
  return (
    <div className="fixed-height-under-header mx-auto flex max-w-[1200px] animate-fade justify-between px-2 gap-8">
      <div className="flex flex-col gap-8 py-10">
        <Link href={"/"} className="hidden items-center gap-2 max-lg:flex">
          <IoIosArrowBack />
          <p className="uppercase">Back</p>
        </Link>
        <div className="flex gap-8 items-end">
          <ImageKit
            src={flexlogo.src}
            alt="flex logo"
            className="h-20 w-auto"
          />
          <div>
            <p className="text-primary text-3xl uppercase font-bold">
              NFT Creation hub
            </p>
            <p className="text-grays">
              Empower your community via different NFT approaches
            </p>
          </div>
        </div>
        <div>
          <Link
            href={"/create-drop"}
            className="p-8 border gap-2 border-line rounded-lg items-center flex justify-between group hover:border-primary transition-all cursor-pointer"
          >
            <div className="">
              <div className="flex items-center gap-2 font-bold uppercase text-2xl">
                <TbSeeding />
                <p>Drop your NFT</p>
              </div>
              <p className="text-grays">
                Airdrop your exclusive artworks directly to your subscribers.
                Build and stay connected with your audiences.
              </p>
            </div>
            <div className=" aspect-square h-6">
              <IoIosArrowForward className="text-2xl group-hover:translate-x-2 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
      <ImageKit
        src={bannerFlexCreate.src}
        alt="banner-flex-create"
        className="max-lg:hidden"
      />
    </div>
  );
};

export default FlexCreate;
