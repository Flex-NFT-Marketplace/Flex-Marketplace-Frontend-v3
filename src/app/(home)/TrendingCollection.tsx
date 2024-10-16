"use client";
import CardCollection from "@/components/CardCollection";
import useGetCollections from "@/services/api/useGetCollections";
import { ICollection } from "@/types/ICollection";
import { Pagination } from "antd";

const TrendingCollection = () => {
  // const { data, isSuccess } = useGetCollections();

  return (
    <div className="mx-auto w-full max-w-[1440px] px-20 max-md:px-5">
      <div className=" border-b border-t border-stroke py-4">
        <p className="font-monument text-2xl font-normal">
          💠 Explore Collections
        </p>
      </div>

      <div className=" mt-8 flex  justify-center gap-2">
        {/* {isSuccess &&
          data?.map((collection: ICollection, index: number) => (
            <div key={index}>
              <CardCollection data={collection} />
            </div>
          ))} */}
      </div>
    </div>
  );
};

export default TrendingCollection;
