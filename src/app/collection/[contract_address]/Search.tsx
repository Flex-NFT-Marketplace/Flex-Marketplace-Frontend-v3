"use client";

import {
  SortStatusEnum,
  useCollectionDetailContext,
} from "@/services/providers/CollectionDetailProvider";
import clsx from "clsx";
import { useState } from "react";

import { IoSearch } from "react-icons/io5";
import SearchImg from "@/assets/search.png";
import Input from "@/packages/@ui-kit/Input";
import ImageKit from "@/packages/@ui-kit/Image";

const Search = () => {
  const [isFocus, setIsFocus] = useState(false);
  // const classes = clsx(
  //   " flex h-8 items-center gap-2 border px-2 transition-all mx-1 select-none max-md:hidden",
  //   {
  //     "border-primary": isFocus,
  //     "border-stroke": !isFocus,
  //   },
  // );

  const { searchValue, setSearchValue, setSortStatus } =
    useCollectionDetailContext();

  const onSearch = (value: any) => {
    setSearchValue(value);
    setSortStatus(SortStatusEnum.ALL);
  };

  return (
    <div className="">
      {/* <IoSearch className="text-grays" /> */}
      <Input
        icon={<ImageKit src={SearchImg.src} alt="" className="h-5 w-5" />}
        placeholder="Search Items"
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(e: any) => onSearch(e.target.value)}
      />
      {/* <input
        className="h-full min-w-[150px] rounded-sm bg-transparent text-base font-normal outline-none placeholder:text-grays"
        type="text"
        value={searchValue}
        placeholder="Search Items"
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(e) => onSearch(e.target.value)}
      /> */}
    </div>
  );
};

export default Search;
