import { FaEthereum } from "react-icons/fa";
import ImageDemo from "@/assets/banner.webp";
import Image from "next/image";
import PriceFormat from "../FormatPrice";
import FormatPrice from "../FormatPrice";
import { ICollection } from "@/types/ICollection";
import ImageKit from "@/packages/@ui-kit/Image";

interface ICardCollection {
  data: ICollection;
}

const CardCollection: React.FC<ICardCollection> = (props) => {
  const { data } = props;
  return (
    <div className="cursor-pointer  border border-dashed border-stroke bg-[#171921]">
      <div className="aspect-square h-[230px] w-[230px] overflow-hidden rounded-t-lg  p-4">
        <ImageKit
          src={data.image_url}
          alt=""
          className="aspect-square w-full rounded-t-lg  object-cover transition-all hover:scale-110"
        />
      </div>

      <div className="px-3 pb-3 pt-4">
        <div>
          <p className="text-sm font-normal">Collection Name</p>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          <div className="flex items-center justify-between text-sm">
            <p className="text-grays">Floor price</p>
            <FormatPrice price={0.25} />
          </div>
          <div className="flex items-center justify-between text-sm">
            <p className="text-grays">7D volume</p>
            <FormatPrice price={0.25} />
          </div>
          <div className="flex items-center justify-between text-sm">
            <p className="text-grays">Last sale</p>
            <FormatPrice price={0.25} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCollection;
