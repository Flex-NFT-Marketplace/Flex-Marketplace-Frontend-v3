"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FormatAddress from "@/components/FormatAddress";
import BannerSkeleton from "@/app/(skeletonLoading)/homeSkeleton/BannerSkeleton";
import Button from "@/packages/@ui-kit/Button";
import Image from "next/image";
import ImageKit from "@/packages/@ui-kit/Image";
import useGetBannerCollections from "@/services/api/collection/useGetBannerCollections";
import { FormatPriceWithIcon } from "@/components/FormatPrice";
import { IStagingCollection } from "@/types/IStagingCollection";

interface IBannerItem {
  index: number;
  data: IStagingCollection;
  isActive?: boolean;
  onSetActiveCollection: (index: number) => void;
  onClick?: () => void;
}

const BannerItem: React.FC<IBannerItem> = (props) => {
  const { data, isActive, onSetActiveCollection, index, onClick } = props;
  const activeBannerClass = isActive ? "" : "bg-[#080804]/50";
  const bannerClass =
    "absolute inset-0 rounded border-2 transition-all duration-150 ease-in-out border-transparent";

  return (
    <div
      className="relative h-[168px] flex-auto cursor-pointer overflow-hidden max-xl:w-[264px] max-xl:flex-shrink-0 max-md:h-[124px] max-md:w-[224px]"
      onMouseEnter={() => onSetActiveCollection(index)}
      onClick={onClick}
    >
      <Image
        src={data?.cover}
        alt=""
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full rounded object-cover"
      />
      <div className="absolute inset-0 rounded bg-gradient-to-t from-[#080804]/50 via-transparent to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 flex flex-row justify-start gap-2 p-3">
        <div className="h-8 w-8 rounded-full">
          {/* <img
            src={data?.avatar}
            className="h-full w-full rounded-full object-cover"
          /> */}
          <ImageKit
            src={data?.avatar}
            alt=""
            className="h-full w-full rounded-full object-cover"
          />
        </div>

        <p className="line-clamp-1 text-xl font-bold">{data.name}</p>
      </div>
      <div
        className={bannerClass + " " + activeBannerClass}
        style={{ boxSizing: "border-box" }}
      ></div>
    </div>
  );
};

const Banner = () => {
  const router = useRouter();
  const onNavigate = (path: string) => {
    router.push(path);
  };
  const { data: collectionsBanner, isFetching } = useGetBannerCollections();
  const [collectionActive, setCollectionActive] =
    useState<IStagingCollection>();

  // init collection active
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (collectionsBanner) {
      setCollectionActive(collectionsBanner[activeIndex]);
    }
  }, [collectionsBanner, activeIndex]);

  // auto next banner
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(
        (prevIndex) => (prevIndex + 1) % (collectionsBanner?.length ?? 0) || 0
      );
    }, 10000); // change banner every 3 seconds

    return () => {
      clearInterval(timer); // clear timer on component unmount
    };
  }, [collectionsBanner, activeIndex]);

  const onSetActiveCollection = (index: number) => {
    setActiveIndex(index);
  };

  const onNavigateCollection = () => {
    onNavigate(`/collection/${collectionActive?.nftContract}`);
  };

  if (isFetching) return <BannerSkeleton />;

  return (
    <div className="fixed-height-with-header relative w-full animate-fade max-sm:h-[80vh] uppercase font-bold">
      <ImageKit
        src={collectionActive?.cover}
        alt=""
        className="h-[75%] w-full object-cover"
      />
      <div className="absolute inset-0 h-[75%] bg-gradient-to-t from-[#080804] via-[#080804]/25 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-end gap-8 max-md:gap-4">
          <div className="flex flex-col gap-6 px-20 max-xl:px-5 max-lg:flex-col max-md:gap-y-4">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2 ">
                <FormatAddress
                  address={collectionActive?.nftContract}
                  // convertName
                />
                <p className="max-w-full text-4xl font-bold md:max-w-[500px] md:text-[52px] uppercase">
                  {collectionActive?.name || ""}
                </p>
              </div>
              <div className="flex gap-14 max-lg:hidden">
                <div className="flex flex-col items-center">
                  <p className="text-2xl font-normal text-buy">
                    {collectionActive?.nftCollectionStats?.floorPrice} ETH
                  </p>
                  <p className="text-sm font-normal uppercase text-thin-[#c0c0c0] ">
                    BUY NOW
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <p className="text-2xl font-normal text-sell">
                    {collectionActive?.nftCollectionStats?.bestOffer} ETH
                  </p>
                  <p className="text-sm font-normal uppercase text-thin-[#c0c0c0]">
                    SELL NOW
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center relative">
              <Button
                className="mt-3 w-[180px] md:w-[200px]"
                onClick={onNavigateCollection}
                variant="primary"
              >
                <span className="">Trade Collection</span>
              </Button>
              <div className="absolute top-1/2 lg:left-1/2 lg:-translate-x-1/2 -translate-y-1/2 max-lg:right-0 flex gap-1">
                {collectionsBanner?.map((banner, index) => {
                  return (
                    <div
                      onClick={() => onSetActiveCollection(index)}
                      key={index}
                      className={`rounded w-6 h-1 transition-all cursor-pointer ${activeIndex == index ? "bg-white" : "bg-white/50"}`}
                    ></div>
                  );
                })}
              </div>
              <div className="flex gap-x-6 pb-1 max-sm:gap-y-2 text-sm max-lg:hidden">
                <div className="flex gap-1 font-normal">
                  <p className=" text-[#c0c0c0]">TOTAL VOL:</p>
                  <FormatPriceWithIcon
                    price={collectionActive?.nftCollectionStats?.totalVolume}
                  />
                </div>
                <div className="flex gap-1 font-normal">
                  <p className=" text-[#c0c0c0]">7D VOL:</p>
                  <FormatPriceWithIcon
                    price={
                      collectionActive?.nftCollectionStats?.stats7D?.volume
                    }
                  />
                </div>
                <div className="flex gap-1 font-normal">
                  <p className=" text-[#c0c0c0]">LISTED / SUPPLY:</p>
                  <p>
                    {collectionActive?.nftCollectionStats?.totalListingCount} /{" "}
                    {collectionActive?.nftCollectionStats?.nftCount}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full space-x-6 overflow-x-auto whitespace-nowrap px-20 max-xl:space-x-3 max-xl:px-5">
            {collectionsBanner?.map((collection, index) => (
              <BannerItem
                index={index}
                key={index}
                data={collection}
                onSetActiveCollection={onSetActiveCollection}
                onClick={onNavigateCollection}
                isActive={
                  collectionActive?.nftContract == collection.nftContract
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
