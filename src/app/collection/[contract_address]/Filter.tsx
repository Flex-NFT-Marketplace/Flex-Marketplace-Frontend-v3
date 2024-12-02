import Checkbox from "@/lib/@core/Checkbox";
import Button from "@/packages/@ui-kit/Button";
import Input from "@/packages/@ui-kit/Input";
import {
  PriceSortEnum,
  SortStatusEnum,
  useCollectionDetailContext,
} from "@/services/providers/CollectionDetailProvider";
import { ITraits } from "@/types/IStagingCollection";
import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Traits from "./Traits";
import {
  IAttributesCollection,
  IAttributesCollectionFilter,
} from "@/types/INft";

const Filter = () => {
  const [isShowPrice, setIsShowPrice] = useState(true);
  const [isShowTraits, setIsShowTraits] = useState(false);

  const [_minPrice, _setMinPrice] = useState(0);
  const [_maxPrice, _setMaxPrice] = useState(1000);
  const [traitsActive, setTraitsActive] = useState<IAttributesCollection[]>([]);

  const {
    priceSortType,
    setPriceSortType,
    sortStatus,
    setSortStatus,
    setMinPrice,
    setMaxPrice,
    collectionAttributes,
    setAttributesFilter,
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

  const changeTraitsActive = (traitFilter: IAttributesCollection) => {
    if (isFiltered(traitFilter.trait_type as string)) {
      const newTraitsActive: IAttributesCollection[] = JSON.parse(
        JSON.stringify(traitsActive)
      );
      newTraitsActive.map((item) => {
        if (item.trait_type == traitFilter.trait_type) {
          return { key: item.trait_type, value: traitFilter.value };
        } else return item;
      });
      console.log(newTraitsActive);

      setTraitsActive(() => newTraitsActive);
    } else {
      setTraitsActive([...traitsActive, traitFilter]);
    }
  };

  const isFiltered = (key: string) => {
    let isKeyFiltered = false;
    traitsActive.forEach((traitActive) => {
      if (traitActive.trait_type == key) {
        isKeyFiltered = true;
      }
    });
    return isKeyFiltered;
  };

  useEffect(() => {
    setAttributesFilter(traitsActive);
  }, [traitsActive]);

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
        <div
          className="flex cursor-pointer items-center justify-between text-xl transition-all"
          onClick={() => setIsShowTraits(!isShowTraits)}
        >
          <p className="font-bold">TRAITS</p>
          {isShowTraits ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
        <div className={`${!isShowTraits && "hidden"} flex flex-col gap-6`}>
          {collectionAttributes?.map(
            (attributes: IAttributesCollectionFilter, index: number) => {
              return (
                <Traits
                  traits={attributes}
                  key={index}
                  onChange={changeTraitsActive}
                />
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter;
