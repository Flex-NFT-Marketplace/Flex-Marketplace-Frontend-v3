import DropCard from "@/components/DropCard";
import { useAccountContext } from "@/services/providers/AccountProvider";

const Distributed = () => {
  const { dropsDistributed } = useAccountContext();

  return (
    <div className="px-5 py-4">
      <div>
        {dropsDistributed.length <= 0 && (
          <p className="text-grays">No distributed found</p>
        )}
        <div className="mt-6 gap-4 grid grid-cols-2 max-[1350px]:grid-cols-1 max-xl:grid-cols-2 max-[950px]:grid-cols-1 max-md:grid-cols-2 max-sm:grid-cols-1">
          {dropsDistributed.map((drop, index) => {
            return (
              <DropCard
                contractAddress={drop.collectible.nftContract}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Distributed;
