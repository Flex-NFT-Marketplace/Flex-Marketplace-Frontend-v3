import Checkbox from "@/lib/@core/Checkbox";
import {
  IAttributesCollection,
  IAttributesCollectionFilter,
  IAttributesCollectionOption,
} from "@/types/INft";
import { ITraits } from "@/types/IStagingCollection";
import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { getShortTraits } from "./page";

interface TraitsProps {
  traits: IAttributesCollectionFilter;
  traitsActive: IAttributesCollection[];
  onChange: (trait: IAttributesCollection) => void;
}

const Traits: React.FC<TraitsProps> = ({ traits, traitsActive, onChange }) => {
  const [isShowTraits, setIsShowTraits] = useState(false);

  const isContain = (traits: IAttributesCollectionFilter) => {
    let contain = false;
    traitsActive.map((item) => {
      if (item.trait_type == traits.trait_type) contain = true;
    });
    return contain;
  };

  const isSelected = (
    traits: IAttributesCollectionFilter,
    traitValue: string
  ) => {
    let selected = false;
    traitsActive.map((item) => {
      if (item.trait_type == traits.trait_type && item.value == traitValue)
        selected = true;
    });

    return selected;
  };

  return (
    <div>
      <div
        className="flex cursor-pointer items-center justify-between text-xl transition-all hover:bg-slate-800 py-2 rounded"
        onClick={() => setIsShowTraits(!isShowTraits)}
      >
        <p
          className={`font-bold ${isContain(traits) && "text-primary"} text-base`}
        >
          {traits?.trait_type}
        </p>
        <div className="flex items-center gap-2 text-grays">
          {/* <p>223</p> */}
          {isShowTraits ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
      </div>
      <div className={`${!isShowTraits && "hidden"} flex flex-col gap-2 mt-3`}>
        {traits?.options?.map(
          (option: IAttributesCollectionOption, index: number) => (
            <label
              htmlFor={`input-${option.value}`}
              key={index}
              onClick={() =>
                onChange({
                  trait_type: traits.trait_type,
                  value: option.value,
                })
              }
              className="flex justify-between items-center gap-2 hover:bg-slate-800 py-2 rounded cursor-pointer"
            >
              <div className="flex items-center gap-2 text-grays">
                <label className={"container-checkbox"}>
                  <input
                    id={`input-${option.value}`}
                    defaultChecked={isSelected(traits, option.value)}
                    type="radio"
                    name={`traits-${traits?.trait_type}`}
                  />
                  <span className="checkmark"></span>
                </label>

                <p className="line-clamp-1 font-bold text-sm">
                  {getShortTraits(option?.value, 15)}
                </p>
              </div>
              <p>{option?.total}</p>
            </label>
          )
        )}
      </div>
    </div>
  );
};

export default Traits;
