import { useEffect, useState, useMemo } from "react";
import Button from "@/packages/@ui-kit/Button";
import ImageKit from "@/packages/@ui-kit/Image";

import { IAttributesCollection } from "@/types/INft";
import {
  NftTrait,
  useCreateCollection,
} from "@/services/providers/CreateCollectionProvider";

interface EditNFTProps {
  hide: () => void;
  nft: NftTrait | undefined;
}

const EditNFT: React.FC<EditNFTProps> = ({ hide, nft }) => {
  if (!nft) return null;

  const { allState, setAllState } = useCreateCollection();
  const [traits, setTraits] = useState<IAttributesCollection[]>(nft.traits);
  const [imgSrc, setImageSrc] = useState(URL.createObjectURL(nft.image));
  const addTrait = (newTrait: IAttributesCollection) => {
    const index = traits.findIndex(
      (trait) => trait.trait_type == newTrait.trait_type
    );
    if (index >= 0) {
      const updatedTraits = [...traits];
      updatedTraits[index] = {
        trait_type: newTrait.trait_type,
        value: newTrait.value,
      };
      setTraits(updatedTraits);
    } else {
      setTraits((prevTraits) => [
        ...prevTraits,
        { trait_type: newTrait.trait_type, value: newTrait.value },
      ]);
    }
  };

  const save = () => {
    const nftIndex = allState.listStraits.findIndex((item) => nft == item);
    if (nftIndex >= 0) {
      const listStraitsUpdated = [...allState.listStraits];
      listStraitsUpdated[nftIndex].traits = traits;
      setAllState((prevState) => ({
        ...prevState,
        listStraits: listStraitsUpdated,
      }));
    }

    hide();
  };

  return (
    <div className="mx-auto flex flex-col gap-6 px-5 py-8 max-w-full w-[1000px] font-bold">
      <div className="flex w-full flex-col text-center">
        <p className="text-[24px] font-bold uppercase leading-[30px]">
          Edit nft
        </p>
        <p className="text-base leading-5 text-gray">
          Each NFT will follow with each metadata
        </p>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex gap-4 max-lg:flex-col max-lg:items-center">
          <ImageKit className="aspect-square max-w-[272px]" src={imgSrc} />
          <div className="flex-1 flex flex-col gap-4">
            {allState.traitManager.map((traitManager, index) => {
              return (
                <div
                  key={traitManager.type + index}
                  className="flex flex-col gap-2"
                >
                  <div>
                    <p className="text-2xl uppercase">{traitManager.type}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {traitManager?.subType?.map((subType, subIndex) => {
                      return (
                        <div
                          key={traitManager.type + subType + subIndex}
                          onClick={() =>
                            addTrait({
                              trait_type: traitManager.type,
                              value: subType,
                            })
                          }
                          className={`${
                            traits.findIndex(
                              (item) =>
                                item.trait_type == traitManager.type &&
                                item.value == subType
                            ) >= 0
                              ? "border-buy"
                              : "border-transparent"
                          } p-2 rounded-md bg-white/15 hover:bg-hover cursor-pointer border`}
                        >
                          <p>{subType}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <Button onClick={save} className="w-full border-primary">
          Save
        </Button>
      </div>
    </div>
  );
};
export default EditNFT;
