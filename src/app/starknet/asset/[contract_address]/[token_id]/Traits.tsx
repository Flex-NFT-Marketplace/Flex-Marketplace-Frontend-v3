import { useNftContext } from "@/services/providers/NFTProvider";
import { IAttributesCollection } from "@/types/INft";
import { useParams, useRouter } from "next/navigation";

interface TraitsItemProps {
  data: IAttributesCollection;
}

const TraitsItem: React.FC<TraitsItemProps> = (props) => {
  const { data } = props;

  const router = useRouter();
  const { contract_address } = useParams();

  const onNavigate = () => {
    router.push(
      `/collection/${contract_address}?trait_type=${data.trait_type}&value=${data.value}`
    );
  };

  return (
    <div
      onClick={onNavigate}
      className="flex cursor-pointer justify-between gap-4 rounded-md border border-line px-4 py-2 hover:border-primary"
    >
      <div className="flex flex-col overflow-hidden">
        <p className="text-grays">{data.trait_type}</p>
        <p className="mt-1 truncate font-bold">{data.value}</p>
      </div>

      <div className="flex flex-col items-end gap-1">
        <p className="uppercase text-grays">Rarity</p>
        <div className="flex gap-4">
          <p className="uppercase text-grays">-</p>
          <p className="uppercase text-secondary">-%</p>
        </div>
      </div>
    </div>
  );
};

const Traits = () => {
  const { nftStaging } = useNftContext();

  return (
    <div className="flex flex-col justify-between">
      <div className="flex items-center gap-2 border-b border-stroke pb-2">
        <p className="text-xl font-bold">TRAITS</p>
      </div>

      <div className="mt-2 grid grid-cols-3 gap-x-2 gap-y-3 max-sm:grid-cols-2">
        {nftStaging &&
          nftStaging?.attributes?.length > 0 &&
          nftStaging?.attributes.map((item, i) => (
            <TraitsItem data={item} key={i} />
          ))}
      </div>
    </div>
  );
};

export default Traits;
