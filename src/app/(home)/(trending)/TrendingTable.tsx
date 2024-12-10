"use client";
import React, { useEffect } from "react";
import ImageDemo from "@/assets/banner.webp";
import { useCollectionContext } from "@/services/providers/CollectionProvider";
import { useRouter } from "next/navigation";
import FormatPrice from "@/components/FormatPrice";
import ImageKit from "@/packages/@ui-kit/Image";
import useGetTrendingCollections from "@/services/api/collection/useGetTrendingCollections";

const TrendingTable = () => {
  // const { collectionTrending } = useCollectionContext();
  const { data: collectionTrending } = useGetTrendingCollections();
  const router = useRouter();

  const onNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="h-10 text-right uppercase text-grays">
            <th className="hidden lg:table-cell"></th>
            <th className="text-left">Collection</th>
            {/* <th className="hidden lg:table-cell">Floor price</th> */}
            <th className="hidden lg:table-cell">1D Change</th>
            <th className="hidden sm:table-cell">1D Vol</th>
            <th>Total Vol</th>
            <th className="hidden lg:table-cell">Owners</th>
            <th className="hidden lg:table-cell">Supply</th>
          </tr>
        </thead>
        <tbody>
          {collectionTrending?.map((item, index) => (
            <tr
              key={index}
              className="cursor-pointer rounded-lg text-right transition-all hover:bg-dark-black"
              onClick={() =>
                onNavigate("/collection/" + item.nftCollection.nftContract)
              }
            >
              <td className="hidden text-center lg:table-cell">{index + 1}</td>
              <td className="flex items-center text-left">
                <ImageKit
                  src={item?.nftCollection?.avatar}
                  alt=""
                  className="h-12 w-12 object-cover"
                />
                <p className="ml-4 font-normal">{item?.nftCollection?.name}</p>
              </td>
              {/* <td className="hidden lg:table-cell">
                <FormatPrice price={0} className="flex justify-end" />
              </td> */}
              <td className="hidden lg:table-cell">
                {item?.oneDayChange > 0 ? (
                  <p className="text-shadow-max text-buy">
                    {item?.oneDayChange > 100
                      ? "100%"
                      : item?.oneDayChange?.toFixed(2) + "%"}
                  </p>
                ) : (
                  <p className="text-shadow-min text-cancel">
                    {`${item?.oneDayChange?.toFixed(2) || 0}%`}
                  </p>
                )}
              </td>
              <td className="hidden sm:table-cell">
                <FormatPrice
                  price={item?.oneDayVol || 0}
                  className="flex justify-end"
                />
              </td>
              <td>
                {/* {item?.totalVol} */}
                <FormatPrice
                  price={Number(item?.totalVol)}
                  decimal={2}
                  className="flex justify-end"
                />
              </td>
              <td className="hidden lg:table-cell">{item?.owners}</td>
              <td className="hidden lg:table-cell">{item?.supply}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrendingTable;
