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
    <div className="mx-auto w-full max-w-[1440px] py-12 max-xl:px-5 max-md:py-4 md:px-20">
      <div className="flex items-center justify-around pb-12">
        <div className="flex items-center gap-6" onClick={onNavigateDetail}>
          <p className="text-shadow-white hover:text-shadow-primary cursor-pointer select-none text-3xl font-bold transition-all duration-500 ease-in-out hover:text-primary lg:text-5xl">
            Popular Open-Editions
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
