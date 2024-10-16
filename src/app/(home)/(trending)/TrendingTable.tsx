"use client";
import React from "react";
import ImageDemo from "@/assets/banner.webp";
import { useCollectionContext } from "@/services/providers/CollectionProvider";
import { useRouter } from "next/navigation";
import FormatPrice from "@/components/FormatPrice";
import ImageKit from "@/packages/@ui-kit/Image";

const TrendingTable = () => {
  const { collectionTrending } = useCollectionContext();
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
            <th className="hidden lg:table-cell">Floor price</th>
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
              onClick={() => onNavigate("/collection/" + item.contract_address)}
            >
              <td className="hidden text-center lg:table-cell">{index + 1}</td>
              <td className="flex items-center text-left">
                <ImageKit
                  src={item.image_url}
                  alt=""
                  className="h-12 w-12 object-cover"
                />
                <p className="ml-4 font-normal">{item.name}</p>
              </td>
              <td className="hidden lg:table-cell">
                <FormatPrice
                  price={item.stats.collection_floor_price}
                  className="flex justify-end"
                />
              </td>
              <td className="hidden lg:table-cell">
                {item.stats.stats1D.avg_price > 0 ? (
                  <p className="text-shadow-max text-buy">
                    {item.stats.stats1D.avg_price.toFixed(2)}%
                  </p>
                ) : (
                  <p className="text-shadow-min text-cancel">
                    {item.stats.stats1D.avg_price.toFixed(2)}%
                  </p>
                )}
              </td>
              <td className="hidden sm:table-cell">
                <FormatPrice
                  price={item.stats.stats1D.volume}
                  className="flex justify-end"
                />
              </td>
              <td>
                <FormatPrice
                  price={item.stats.total_volume}
                  decimal={2}
                  className="flex justify-end"
                />
              </td>
              <td className="hidden lg:table-cell">{item.stats.owner_count}</td>
              <td className="hidden lg:table-cell">{item.stats.nft_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrendingTable;
