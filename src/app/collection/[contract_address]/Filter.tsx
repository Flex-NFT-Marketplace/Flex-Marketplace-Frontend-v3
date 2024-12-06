import Checkbox from "@/lib/@core/Checkbox";
import Button from "@/packages/@ui-kit/Button";
import Input from "@/packages/@ui-kit/Input";
import {
  PriceSortEnum,
  SortStatusEnum,
  useCollectionDetailContext,
} from "@/services/providers/CollectionDetailProvider";
import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Traits from "./Traits";
import { IAttributesCollectionFilter } from "@/types/INft";
import { useSearchParams } from "next/navigation";

const Filter = () => {
  const [isShowPrice, setIsShowPrice] = useState(true);
  const [isShowTraits, setIsShowTraits] = useState(true);

  const [_minPrice, _setMinPrice] = useState(0);
  const [_maxPrice, _setMaxPrice] = useState(1000);
  const params = useSearchParams();

  const {
    priceSortType,
    setPriceSortType,
    sortStatus,
    setSortStatus,
    setMinPrice,
    setMaxPrice,
    collectionAttributes,
    setAttributesFilter,
    traitsActive,
    setTraitsActive,
    changeTraitsActive,
    setTraitType,
    setTraitValue,
  } = useCollectionDetailContext();

  const onSortByPrice = () => {
    setMinPrice(_minPrice);
    setMaxPrice(_maxPrice);
    setSortStatus(SortStatusEnum.LISTED);
  };

  const onStatusChange = (status: SortStatusEnum) => {
    setSortStatus(status);

    if (SortStatusEnum.ALL === status) {
      setMinPrice(0);
      setMaxPrice(1000);

      setIsShowPrice(false);
    }
  };

  useEffect(() => {
    const _traitType = params.get("trait_type");
    const _traitValue = params.get("value");
    if (_traitType && _traitValue) {
      setTraitType(_traitType);
      setTraitValue(_traitValue);
    }
  }, []);

  return (
    <div
      style={{ maxHeight: "calc(100vh - 116px)" }}
      className="sticky top-[52px] flex h-full  overflow-auto min-w-[260px] select-none flex-col gap-10 border-stroke py-4 pl-8 pr-4 max-sm:w-[100vw]"
    >
      <div className="flex flex-col">
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-xl font-bold">STATUS</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="font-normal text-grays">All</p>
            <Checkbox
              isChecked={sortStatus == SortStatusEnum.ALL}
              onChange={() => onStatusChange(SortStatusEnum.ALL)}
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="font-normal text-grays">Only Listed</p>
            <Checkbox
              isChecked={sortStatus == SortStatusEnum.LISTED}
              onChange={() => onStatusChange(SortStatusEnum.LISTED)}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-xl font-bold">SORT BY</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="font-normal text-grays">Recently listed</p>
          <Checkbox
            isChecked={priceSortType == PriceSortEnum.CURRENT}
            onChange={() => setPriceSortType(PriceSortEnum.CURRENT)}
          />
        </div>

        <div className="flex items-center justify-between">
          <p className="font-normal text-grays">Price: Low to High</p>
          <Checkbox
            isChecked={priceSortType == PriceSortEnum.ASC}
            onChange={() => setPriceSortType(PriceSortEnum.ASC)}
          />{" "}
        </div>

        <div className="flex items-center justify-between">
          <p className="font-normal text-grays">Price: High to Low</p>
          <Checkbox
            isChecked={priceSortType == PriceSortEnum.DESC}
            onChange={() => setPriceSortType(PriceSortEnum.DESC)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div
          className="flex cursor-pointer items-center justify-between text-xl transition-all"
          onClick={() => setIsShowPrice(!isShowPrice)}
        >
          <p className=" font-bold">PRICE</p>
          {isShowPrice ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>

        <div className={`dropdown-ani ${isShowPrice && "dropdown-ani-r"}`}>
          <div className="overflow-hidden">
            <Input
              type="number"
              placeholder="Min"
              value={_minPrice.toString()}
              onChange={(e: any) => _setMinPrice(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Max"
              className="mt-3"
              value={_maxPrice.toString()}
              onChange={(e: any) => _setMaxPrice(e.target.value)}
            />
            <Button
              title="Apply"
              className="mt-3 w-full"
              onClick={() => {
                onSortByPrice();
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex cursor-pointer items-center justify-between text-xl transition-all">
          <p className="font-bold">TRAITS</p>
          <div className="flex items-center gap-2">
            {traitsActive.length > 0 && (
              <p
                className="text-base hover:text-primary font-bold"
                onClick={() => setTraitsActive([])}
              >
                Clear
              </p>
            )}
            {isShowTraits ? (
              <IoIosArrowUp onClick={() => setIsShowTraits(!isShowTraits)} />
            ) : (
              <IoIosArrowDown onClick={() => setIsShowTraits(!isShowTraits)} />
            )}
          </div>
        </div>
        <div className={`${!isShowTraits && "hidden"} flex flex-col gap-2`}>
          {collectionAttributes?.map(
            (attributes: IAttributesCollectionFilter, index: number) => {
              return (
                attributes.trait_type && (
                  <Traits
                    traits={attributes}
                    key={index + traitsActive.length + attributes.trait_type}
                    onChange={changeTraitsActive}
                    traitsActive={traitsActive}
                  />
                )
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter;
