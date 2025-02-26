import Button from "@/packages/@ui-kit/Button";
import ImageKit from "@/packages/@ui-kit/Image";
import Link from "next/link";

const LaunchpadBanner = () => {
  return (
    <div className="relative w-full h-[600px] max-w-[1440px] px-20 max-xl:px-5 flex items-end">
      <div>
        <ImageKit
          src="/images/launchpad-bg1.png"
          className="absolute top-0 left-0 w-full h-full -z-[1]"
        />
        <div className="w-full h-full bg-gradient-to-b from-black/0 to-black absolute top-0 left-0 -z-[1]"></div>
      </div>
      <div className="flex flex-col px-[30px] max-md:px-4 py-[52px] max-w-[800px]">
        <div className="bg-primary py-1 px-3 rounded border border-black/10 w-fit mb-1">
          <p className="uppercase text-black font-bold">launchpad</p>
        </div>
        <p className="uppercase text-[32px] mb-3 font-bold">
          atemu: og collection 24
        </p>
        <p className="mb-6">
          🔥 The Atemu OG Collection 24 is here—the first-ever TCG drop on
          Starknet. Just 999 packs, each a gateway to rare gods, heroes, and
          relics that hold legendary power. Own a piece of history, rule the
          realms, and stake your claim in the future of on-chain TCG.
        </p>
        {/* <div className="flex gap-4 flex-wrap">
          <p className="uppercase whitespace-nowrap font-bold">
            <span className="text-grays">Start date:</span> 5/11/2024 - 18:00
            GMT+0
          </p>
          <p className="uppercase whitespace-nowrap font-bold">
            <span className="text-grays">end date:</span> 5/11/2024 - 18:00
            GMT+0
          </p>
          <p className="uppercase whitespace-nowrap font-bold">
            <span className="text-grays">Supply:</span> 999
          </p>
        </div> */}
        <Link
          href={`/pack-collection/${"0x4d6ccb91e90da63ab5c74841bc68cbbc0da6d221770aecf4d70d02b6bf41549"}`}
          className="w-fit min-w-[200px]"
        >
          <Button className="mt-10 w-full">Open now</Button>
        </Link>
      </div>
    </div>
  );
};

export default LaunchpadBanner;
