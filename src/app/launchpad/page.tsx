import ImageKit from "@/packages/@ui-kit/Image";
import About from "./About";
import Mint from "./Mint";
import Phases from "./Phases";
import { AtemuMintProvider } from "./AtemuMintProvider";

export interface PhasesType {
  title: string;
  dateTime: Date;
  timeString: string;
  price: string;
  limit: string;
}

const LaunchPad = () => {
  const phases: PhasesType[] = [
    {
      title: "GTD Mint - 150",
      dateTime: new Date("2024-11-05T18:00:00Z"), // 5/11/2024 - 18:00 GMT+0
      timeString: "5/11/2024 - 18:00 GMT+0",
      price: "Free Mint",
      limit: "1 per wallet",
    },
    {
      title: "Whitelist Mint - 790",
      dateTime: new Date("2024-11-05T21:01:00Z"), // 5/11/2024 - 21:01 GMT+0
      timeString: "5/11/2024 - 21:01 GMT+0",
      price: "Free Mint",
      limit: "1 per wallet",
    },
    {
      title: "Public Mint - TBA",
      dateTime: new Date("2024-11-06T00:00:00Z"), // 6/11/2024 - 00:00 GMT+0
      timeString: "6/11/2024 - 00:00 GMT+0",
      price: "Free Mint",
      limit: "1 per wallet",
    },
  ];

  return (
    <>
      <AtemuMintProvider>
        <ImageKit
          className="w-screen h-[600px] max-h-[600px]"
          src="/images/launchpad-bg.png"
        />
        <div className="fixed-height-under-header !mt-0 mx-auto flex max-w-[1440px] gap-8 p-5 max-md:flex-col max-md:items-center">
          <div className="aspect-square h-[465px] max-w-full -mt-28 border border-white/20 rounded-lg overflow-hidden">
            <video
              className="object-cover h-full w-full"
              src="/videos/PackCardAtemu.mp4"
              autoPlay
              loop
              muted
            />
            {/* <ImageKit
            src="/images/PackCardAtemu.gif"
            // src=""
            alt=""
            className="h-full
         w-full "
          /> */}
          </div>
          <div className="flex flex-1 flex-col gap-3">
            <About />
            <Mint phases={phases} />
            <Phases phases={phases} />
          </div>
        </div>
      </AtemuMintProvider>
    </>
  );
};

export default LaunchPad;
