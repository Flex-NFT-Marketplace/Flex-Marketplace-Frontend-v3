import Checkbox from "@/lib/@core/Checkbox";
import {
  IAttributesCollection,
  IAttributesCollectionFilter,
  IAttributesCollectionOption,
} from "@/types/INft";
import { ITraits } from "@/types/IStagingCollection";
import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface TraitsProps {
  traits: IAttributesCollectionFilter;
  onChange: (trait: IAttributesCollection) => void;
}

const Traits: React.FC<TraitsProps> = ({ traits, onChange }) => {
  const [isShowTraits, setIsShowTraits] = useState(false);

  return (
    <div>
      <div
        className="flex cursor-pointer items-center justify-between text-xl transition-all"
        onClick={() => setIsShowTraits(!isShowTraits)}
      >
        <p>{traits?.trait_type}</p>
        <div className="flex items-center gap-2 text-grays">
          {/* <p>223</p> */}
          {isShowTraits ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
      </div>
      <div className={`${!isShowTraits && "hidden"} flex flex-col gap-3`}>
        {traits?.options?.map(
          (option: IAttributesCollectionOption, index: number) => (
            <div
              key={index}
              className="flex justify-between items-center gap-4"
            >
              <p className="line-clamp-1">{option?.value}</p>
              <div className="flex items-center gap-2 text-grays">
                <p>{option?.total}</p>
                <label className={"container-checkbox"}>
                  <input
                    onChange={() =>
                      onChange({
                        trait_type: traits.trait_type,
                        value: option.value,
                      })
                    }
                    type="radio"
                    name={`traits-${traits?.trait_type}`}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Traits;
