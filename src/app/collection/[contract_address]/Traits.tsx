import {
  IAttributesCollection,
  IAttributesCollectionFilter,
  IAttributesCollectionOption,
} from "@/types/INft";
import { getShortTraits } from "@/utils/string";
import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface TraitsProps {
  traits: IAttributesCollectionFilter;
  traitsActive: IAttributesCollection[];
  onChange: (trait: IAttributesCollection) => void;
}

const Traits: React.FC<TraitsProps> = ({ traits, traitsActive, onChange }) => {
  const [isShowTraits, setIsShowTraits] = useState(false);

  const isContain = (traits: IAttributesCollectionFilter) => {
    return traitsActive.some((item) => item.trait_type === traits.trait_type);
  };

  const isSelected = (
    traits: IAttributesCollectionFilter,
    traitValue: string
  ) => {
    return traitsActive.some(
      (item) =>
        item.trait_type === traits.trait_type && item.value === traitValue
    );
  };

  const countFiltered = (traitType: string): number => {
    return traitsActive.filter((trait) => trait.trait_type === traitType)
      .length;
  };

  const handleCheckboxChange = (option: IAttributesCollectionOption) => {
    onChange({
      trait_type: traits.trait_type,
      value: option.value,
    });
  };

  return (
    <div>
      <div
        className="flex cursor-pointer items-center justify-between text-xl transition-all hover:bg-slate-800 p-2 rounded"
        onClick={() => setIsShowTraits(!isShowTraits)}
      >
        <div className="flex items-center gap-2">
          <p
            className={`font-bold ${isContain(traits) ? "text-primary" : ""} text-base`}
          >
            {traits?.trait_type}
          </p>
          {countFiltered(traits.trait_type) > 0 && (
            <p className="text-black px-1 bg-primary rounded text-sm">
              {countFiltered(traits.trait_type)}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 text-grays">
          {isShowTraits ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
      </div>
      <div className={`${!isShowTraits && "hidden"} flex flex-col gap-2 mt-3`}>
        {traits?.options?.map(
          (option: IAttributesCollectionOption, index: number) => (
            <label
              htmlFor={`input-${option.value}`}
              key={index}
              className="flex justify-between items-center gap-2 hover:bg-slate-800 p-2 rounded cursor-pointer"
            >
              <div className="flex items-center gap-2 text-grays">
                <label className={"container-checkbox"}>
                  <input
                    id={`input-${option.value}`}
                    checked={isSelected(traits, option.value)}
                    onChange={() => handleCheckboxChange(option)}
                    type="checkbox"
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
