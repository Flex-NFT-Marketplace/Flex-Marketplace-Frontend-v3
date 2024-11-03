import ImageKit from "@/packages/@ui-kit/Image";
import About from "./About";
import Mint from "./Mint";
import Phases from "./Phases";

const LaunchPad = () => {
  return (
    <>
      <ImageKit className="w-screen h-[600px] max-h-[600px]" src="" />
      <div className="fixed-height-under-header !mt-0 mx-auto flex max-w-[1440px] gap-5 p-5 max-md:flex-col max-md:items-center">
        <div className="aspect-square h-[562px] max-w-full -mt-28">
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
          <Phases />
        </div>
      </div>
    </>
  );
};

export default LaunchPad;
