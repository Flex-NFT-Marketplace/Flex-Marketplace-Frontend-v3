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
          className="h-[600px] max-h-[600px] w-screen"
          src="/images/launchpad-bg.png"
        />
        <div className="fixed-height-under-header mx-auto !mt-0 flex max-w-[1440px] gap-8 p-5 max-md:flex-col max-md:items-center">
          <div className="-mt-28 aspect-square h-[465px] max-w-full overflow-hidden rounded-lg border border-white/20">
            <video
              className="h-full w-full object-cover"
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
