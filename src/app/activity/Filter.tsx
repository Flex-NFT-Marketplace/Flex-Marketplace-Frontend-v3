import Checkbox from "@/lib/@core/Checkbox";
import Button from "@/packages/@ui-kit/Button";
import Input from "@/packages/@ui-kit/Input";
import { useAccountContext } from "@/services/providers/AccountProvider";
import {
  SortStatusEnum,
  useActivityContext,
} from "@/services/providers/ActivityProvider";
import { PriceSortEnum } from "@/services/providers/CollectionDetailProvider";

import { useState } from "react";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosArrowForward,
  IoIosArrowBack,
} from "react-icons/io";

const Filter = () => {
  const [isShowPrice, setIsShowPrice] = useState(true);
  const [isShowTraits, setIsShowTraits] = useState(false);
  const [isShowFilter, setIsShowFilter] = useState(true);

  const [_minPrice, _setMinPrice] = useState(0);
  const [_maxPrice, _setMaxPrice] = useState(1000);

  const {
    priceSortType,
    setPriceSortType,
    sortStatus,
    setSortStatus,
    setMinPrice,
    setMaxPrice,
  } = useActivityContext();

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

  const toggleFilter = () => {
    setIsShowFilter(!isShowFilter);
  };

  return (
    <div className="relative">
      {!isShowFilter ? (
        <div
          onClick={toggleFilter}
          className="absolute left-full top-10 z-[11] cursor-pointer border border-stroke bg-[#080804] p-1 hover:bg-[#444]"
        >
          <IoIosArrowForward />
        </div>
      ) : (
        <div
          onClick={toggleFilter}
          className="absolute right-0 top-10 z-[11] cursor-pointer border border-r-0 border-stroke bg-[#080804] p-1 hover:bg-[#444]"
        >
          <IoIosArrowBack />
        </div>
      )}
      <div
        className={`flex h-full flex-col gap-10 border-r border-stroke ${!isShowFilter ? "w-0 overflow-hidden p-0" : "min-w-[267px] px-8 py-4"}`}
      >
        <div className="flex flex-col">
          <div className="mt-12 flex flex-col gap-3">
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
        <div className="flex flex-col">
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
        </div>
        <div className="flex flex-col">
          <div
            className="flex cursor-pointer items-center justify-between text-xl transition-all"
            onClick={() => setIsShowPrice(!isShowPrice)}
          >
            <p className=" font-normal">PRICE</p>
            {isShowPrice ? <IoIosArrowDown /> : <IoIosArrowUp />}
          </div>

          <div className={`dropdown-ani ${isShowPrice && "dropdown-ani-r"}`}>
            <div className="mt-3 overflow-hidden">
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
                variant="primary"
                className="mt-3 w-full"
                onClick={() => {
                  onSortByPrice();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
