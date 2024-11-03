import ImageKit from "@/packages/@ui-kit/Image";
import About from "./About";
import Mint from "./Mint";

const OpenEditionDetail = () => {
  return (
    <div className="fixed-height-under-header mx-auto flex max-w-[1440px] gap-5 p-5 max-md:flex-col max-md:items-center">
      <div className="aspect-square h-[562px] max-w-full">
        <ImageKit
          src=""
          alt=""
          className="h-full
         w-full"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <About />
        <Mint />
      </div>
    </div>
  );
};

export default OpenEditionDetail;
