import { useAccountContext } from "@/services/providers/AccountProvider";

const MyDistributed = () => {
  const { dropsDistributed } = useAccountContext();

  return (
    <div className="px-5 py-4">
      <div>
        {dropsDistributed.length <= 0 && (
          <p className="text-grays">No distributed found</p>
        )}
        <div className="gap-4 grid grid-cols-3 max-[1350px]:grid-cols-2 max-xl:grid-cols-3 max-[950px]:grid-cols-2 max-md:grid-cols-3 max-sm:grid-cols-2 [@media_(max-width:500px)]:grid-cols-1">
          {/* {dropsDistributed.map((drop, index) => {
            return (
              <DropCard
                drop={drop}
                key={index}
              />
            );
          })} */}
        </div>
      </div>
    </div>
  );
};

export default MyDistributed;
