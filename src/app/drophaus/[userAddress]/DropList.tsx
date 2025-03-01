import DropCard from "@/components/DropCard";
import { IdropDetail } from "@/types/Idrop";

interface DropListProps {
  title: string;
  drops: IdropDetail[];
}

const DropList: React.FC<DropListProps> = ({ title, drops }) => {
  return (
    <div>
      <p className="font-bold text-xl uppercase mb-4">{title}</p>
      {drops.length <= 0 && <p className="text-grays">No drops found</p>}
      <div className="gap-4 grid grid-cols-3 max-[1350px]:grid-cols-2 max-xl:grid-cols-3 max-[950px]:grid-cols-2 max-md:grid-cols-3 max-sm:grid-cols-2 [@media_(max-width:500px)]:grid-cols-1">
        {drops.map((drop, index) => {
          return <DropCard drop={drop} key={index} />;
        })}
      </div>
    </div>
  );
};

export default DropList;
