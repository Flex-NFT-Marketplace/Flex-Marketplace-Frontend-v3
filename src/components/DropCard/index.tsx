import ImageKit from "@/packages/@ui-kit/Image";
import { MdOutlineLocalFireDepartment } from "react-icons/md";

const DropCard = () => {
  return (
    <div className="flex basis-[262px] flex-col gap-5 border border-dashed border-line bg-dark-black p-4">
      <div className="relative">
        <ImageKit src="" alt="drop" />
        <div className="absolute right-2 top-2 flex items-center gap-2 bg-hover/75 px-2 py-1">
          <div className="h-1 w-1 rounded-full bg-primary"></div>
          <p className="font-bold">Starts in 6D 12H</p>
        </div>
      </div>
      <div>
        <p className="font-bold">{`Drop's name`}</p>
        <p>Creator name</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="relative bg-gradient-to-tr from-white/20 to-white/50 p-[1px]">
          <div className="bg-dark-black/70 px-4">
            <p>Protect - 10</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-grays">
          <MdOutlineLocalFireDepartment />
          <p>1,2K</p>
        </div>
      </div>
    </div>
  );
};

export default DropCard;
