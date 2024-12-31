"use client";

import useGetSearch from "@/services/api/useGetSearch";
import { ICollection } from "@/types/ICollection";
import { INft } from "@/types/INft";
import { IProfile } from "@/types/IProfile";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SearchImg from "@/assets/search.png";
import { IoSearch } from "react-icons/io5";
import FormatAddress from "@/components/FormatAddress";
import Input from "@/packages/@ui-kit/Input";
import { MdArrowBackIos } from "react-icons/md";
import React from "react";
import { Divider } from "antd";
import ImageKit from "@/packages/@ui-kit/Image";
import { IStagingNft } from "@/types/IStagingNft";
import { IStagingCollection } from "@/types/IStagingCollection";

const SearchCollectionItem: React.FC<{ collection: IStagingCollection }> = (
  props
) => {
  const { collection } = props;
  const router = useRouter();

  const onNavigate = (path: string) => {
    router.push(path);
  };

  const onNavigateDetail = () => {
    onNavigate("/collection/" + collection.nftContract);
  };

  return (
    <>
      <div
        className="flex cursor-pointer items-center px-4 py-2 hover:bg-dark-black"
        onMouseDown={onNavigateDetail}
      >
        <ImageKit src={collection?.avatar} alt="" className="h-8 w-8" />
        <p className="ml-4 font-normal line-clamp-1">{collection?.name}</p>
      </div>
    </>
  );
};

const SearchNFTItem: React.FC<{ nft: IStagingNft }> = (props) => {
  const { nft } = props;

  const router = useRouter();

  const onNavigate = (path: string) => {
    router.push(path);
  };

  const onNavigateDetail = () => {
    onNavigate("/starknet/asset/" + nft.nftContract + "/" + nft.tokenId);
  };

  return (
    <>
      <div
        className="flex cursor-pointer items-center px-4 py-2 hover:bg-dark-black"
        onMouseDown={onNavigateDetail}
      >
        <ImageKit src={nft?.image} alt="" className="h-8 w-8" />
        <p className="ml-4 font-normal line-clamp-1">{nft?.name}</p>
      </div>
    </>
  );
};

const SearchProfileItem: React.FC<{ account: IProfile }> = (props) => {
  const { account } = props;
  const router = useRouter();

  const onNavigate = (path: string) => {
    router.push(path);
  };

  const onNavigateDetail = () => {
    onNavigate("/account/" + account.address);
  };

  return (
    <>
      <div
        className="flex cursor-pointer items-center px-4 py-2 hover:bg-dark-black"
        onMouseDown={onNavigateDetail}
      >
        <ImageKit src={account?.image} alt="" className="h-8 w-8" />
        {account.name ? (
          <p className="ml-4 font-normal">{account?.name}</p>
        ) : (
          <div className="ml-4 ">
            <FormatAddress address={account?.address} />
          </div>
        )}
      </div>
    </>
  );
};

const Search = () => {
  const [isFocus, setIsFocus] = useState(false);
  const inputRef = useRef<any>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [value, setValue] = useState("");

  const { data: searchRes } = useGetSearch(value);

  const [nfts, setNfts] = useState<IStagingNft[]>([]);
  const [collections, setCollections] = useState<IStagingCollection[]>([]);
  const [creators, setCreators] = useState<IProfile[]>([]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (searchRes) {
      setNfts(searchRes.nfts);
      setCollections(searchRes.nftCollections);
      setCreators(searchRes.users);
    }
  }, [searchRes]);

  const handleKeyPress = (event: any) => {
    if (event.key === "/") {
      event.preventDefault();

      if (inputRef.current) {
        inputRef.current.value = "";
        inputRef.current.focus();
      }
    } else {
      // event.preventDefault();
    }
  };

  useEffect(() => {
    if (isFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocus]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="relative">
      {isFocus && (
        <Input
          ref={inputRef}
          icon={
            <MdArrowBackIos
              onClick={() => {
                setIsFocus(false);
              }}
              className="aspect-square w-5 min-w-5"
            />
          }
          value={value}
          className="fixed left-0 top-0 z-10 !h-16 w-screen sm:hidden"
          onChange={(e: any) => setValue(e.target.value)}
          placeholder="Search"
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
      )}
      <Input
        className={`max-sm:aspect-square max-sm:h-full max-sm:w-11 max-sm:gap-0 max-sm:!p-0 sm:max-w-[300px] sm:w-[300px]`}
        icon={
          <ImageKit
            src={SearchImg.src}
            alt=""
            className="left-1/2 aspect-square w-5 min-w-5 max-sm:pointer-events-none max-sm:absolute max-sm:-translate-x-1/2 max-sm:translate-y-1/2 max-sm:placeholder:text-transparent"
          />
        }
        onChange={
          !isSmallScreen ? (e: any) => setValue(e.target.value) : undefined
        }
        placeholder={!isSmallScreen ? "Search" : " "}
        onFocus={() => setIsFocus(true)}
        onBlur={!isSmallScreen ? () => setIsFocus(false) : undefined}
      />

      {isFocus && (
        <div className="absolute left-0 right-0 top-10 flex h-[200px] w-full flex-col overflow-y-auto border border-stroke bg-black max-sm:fixed max-sm:h-[400px] max-sm:w-screen">
          {collections?.length > 0 && (
            <p className="mb-2 ml-4 mt-2 font-normal text-primary">
              Collection
            </p>
          )}
          {collections?.map((_, index) => (
            <SearchCollectionItem key={index} collection={_} />
          ))}
          {nfts?.length > 0 && (
            <p className="mb-2 ml-4 mt-4 font-normal text-primary">NFT</p>
          )}
          {nfts?.map((_, index) => <SearchNFTItem key={index} nft={_} />)}
          {creators?.length > 0 && (
            <p className="mb-2 ml-4 mt-4 font-normal text-primary">Profile</p>
          )}
          {creators?.map((_, index) => (
            <SearchProfileItem key={index} account={_} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
