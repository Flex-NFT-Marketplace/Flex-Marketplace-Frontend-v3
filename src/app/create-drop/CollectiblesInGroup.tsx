import ImageKit from "@/packages/@ui-kit/Image";
import { ICollectible } from "@/types/Idrop";
import { getBackgroundColor } from "./step2";

const CollectibleCard = ({ collectible }: { collectible: ICollectible }) => {
  return (
    <div className="p-4 border border-border rounded-lg flex justify-between md:items-center gap-4 max-md:flex-col">
      <div className="flex items-center gap-2">
        <ImageKit src={""} className="h-12 w-12 rounded-lg" />
        <div className="flex flex-col gap-1">
          <p className="font-bold uppercase">{collectible.name}</p>
          <div
            style={{
              backgroundColor: getBackgroundColor(collectible.rarity),
            }}
            className="rounded border border-background px-3 py-1"
          >
            <p className="font-bold uppercase text-black">
              {collectible.rarity}
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-1 flex-1 justify-end">
        <div className="px-4 py-1 bg-[#232733] rounded-md flex-1">
          <p className="text-grays">Name</p>
          <p>{collectible.name}</p>
        </div>
        <div className="px-4 py-1 bg-[#232733] rounded-md flex-1">
          <p className="text-grays">Rarity</p>
          <p>{collectible.rarity}</p>
        </div>
        <div className="px-4 py-1 bg-[#232733] rounded-md flex-1">
          <p className="text-grays">Amount</p>
          <p>{collectible.dropAmount}</p>
        </div>
      </div>
    </div>
  );
};

const CollectiblesInGroup = ({
  hide,
  collectibles,
}: {
  hide: () => void;
  collectibles: ICollectible[];
}) => {
  return (
    <div className="p-4 border border-border rounded-md flex flex-col gap-4 w-[600px] max-w-full">
      <p className="text-2xl text-primary uppercase text-center font-bold">
        Group multiple drops
      </p>
      <p className="text-grays text-center">
        Set of Drops will be distributed at the same time
      </p>
      <div className="flex flex-col gap-4">
        {collectibles.map((collectible, index) => {
          return <CollectibleCard collectible={collectible} key={index} />;
        })}
      </div>
    </div>
  );
};

export default CollectiblesInGroup;
