import { FaEthereum } from "react-icons/fa";
import { useNftContext } from "@/services/providers/NFTProvider";
import FormatAddress from "@/components/FormatAddress";
import clsx from "clsx";
import FormatPrice from "@/components/FormatPrice";

const Infor = () => {
  const { nft, collection, bestAsk } = useNftContext();
  const classes = clsx(
    "flex flex-col gap-1 w-1/2 md:w-auto min-w-[100px] md:min-w-0 max-md:text-center",
  );
  return (
    <div className="flex h-fit w-full flex-wrap items-center justify-between gap-4 rounded-md border border-line p-4">
      <div>
        <p className="text-grays">Instantly sell</p>
        <FormatPrice
          price={bestAsk?.price}
          className="text-white"
          currency={bestAsk?.currency}
        />
      </div>
      <div>
        <p className="text-grays">Last sale</p>
        <FormatPrice />
      </div>
      <div>
        <p className="text-grays">Top bid</p>
        <FormatPrice price={collection?.stats.collection_best_offer} />
      </div>
      <div>
        <p className="text-grays">Rarity</p>
        <p>-</p>
      </div>
      <div>
        <p className="text-grays">Collection floor</p>
        <FormatPrice />
      </div>
      <div>
        <p className="text-grays">Owner</p>
        <FormatAddress />
      </div>
    </div>
  );
};

export default Infor;
