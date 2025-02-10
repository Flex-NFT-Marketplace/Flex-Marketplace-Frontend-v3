import { useEffect, useMemo, useState } from "react";
import Button from "@/packages/@ui-kit/Button";
import ImageKit from "@/packages/@ui-kit/Image";
import { getShortTraits } from "@/utils/string";
import { NftTrait } from "./page";

interface ViewNFTProps {
  hide: () => void;
  nft: NftTrait | undefined;
}

const ViewNFT: React.FC<ViewNFTProps> = ({ hide, nft }) => {
  if (!nft) return null;
  const [imgSrc, setImageSrc] = useState(URL.createObjectURL(nft.image));

  return (
    <div className="mx-auto flex flex-col gap-6 px-5 py-8 max-w-full w-[1000px]">
      <div className="flex w-full flex-col text-center">
        <p className="text-[24px] font-bold uppercase leading-[30px]">
          view nft
        </p>
        <p className="text-base leading-5 text-gray">
          Each NFT will follow with each metadata
        </p>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex gap-4 max-lg:flex-col max-lg:items-center">
          <ImageKit className="aspect-square max-w-[272px]" src={imgSrc} />
          <div className="grid grid-cols-2 max-sm:grid-cols-1 w-full flex-1 gap-4 max-sm:flex-col flex-wrap h-fit">
            {nft.traits.map((trait, index) => (
              <div
                key={index}
                className="max-sm:w-full flex flex-col gap-3 rounded border border-border p-3"
              >
                <div className="flex w-full text-base leading-5">
                  <p className="min-w-[84px] text-gray">Type:</p>
                  <p>{trait.trait_type}</p>
                </div>
                <div className="flex w-full items-center text-base leading-5">
                  <p className="min-w-[84px] text-gray">Sub-type:</p>
                  <p className="rounded-sm bg-gray bg-opacity-15 px-3 py-1">
                    {getShortTraits(trait.value.toString(), 10)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Button onClick={hide} className="w-full border-primary">
          Cancel
        </Button>
      </div>
    </div>
  );
};
export default ViewNFT;
