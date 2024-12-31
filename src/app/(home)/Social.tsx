"use client";
import SocialCardCollection from "@/components/SocialCardCollection";
import { useGetOpenEditions } from "@/services/api/useGetOpenEditions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Social = () => {
  const [openEditions, setOpenEditions] = useState([]);
  const { data } = useGetOpenEditions("LiveNow");

  useEffect(() => {
    const fetchData = async () => {
      setOpenEditions(data?.items.slice(0, 3));
    };

    fetchData();
  }, [data]);

  const router = useRouter();

  const onNavigate = (path: string) => {
    router.push(path);
  };

  const onNavigateDetail = () => {
    onNavigate("/open-editions");
  };

  return (
    <div className="mx-auto w-full max-w-[1440px] py-12 px-20 max-xl:px-5 max-md:py-4  font-bold">
      <div className="flex items-center justify-between mb-7">
        <div className="flex items-center gap-4">
          <p className="text-2xl uppercase text-shadow-white">
            popular on social
          </p>
          <p
            onClick={onNavigateDetail}
            className="font-normal text-grays underline cursor-pointer hover:text-white"
          >
            (View all)
          </p>
        </div>
      </div>

      <div className="flex gap-4 overflow-auto">
        {openEditions?.map((openEdition, index) => (
          <SocialCardCollection key={index} openEdition={openEdition} />
        ))}
      </div>
    </div>
  );
};

export default Social;
