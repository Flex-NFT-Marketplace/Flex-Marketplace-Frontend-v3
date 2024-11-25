"use client";
import ActionNFT from "@/components/ActionNFT";
import FormatAddress from "@/components/FormatAddress";

import FormatTime from "@/components/FormatTime";
import TableList from "./TableList";
import { useRouter } from "next/navigation";

const Activity = () => {
  const router = useRouter();

  const onNavigate = (path: string) => {
    router.push(path);
  };

  const onNavigateDetail = () => {
    onNavigate("/activity");
  };

  return (
    <div className="mx-auto w-full max-w-[1440px] pb-20 px-20 max-xl:px-5">
      <div className="flex items-center justify-around py-4 lg:py-12">
        <div className="flex items-center gap-6" onClick={onNavigateDetail}>
          <p className="text-shadow-primary text-3xl lg:text-5xl font-bold cursor-pointer hover:text-white text-shadow transition-all duration-500 ease-in-out select-none text-primary">
            Recent Activities
          </p>

          {/* <div className="border-b border-grays" onClick={onNavigateDetail}>
            <p className="cursor-pointer text-grays">View all</p>
          </div> */}
        </div>

        {/* <div className="flex items-center gap-6 text-xl font-normal text-grays">
          <p className="text-shadow-white text-white">ALL</p>
          <p>SALES</p>
          <p>BIDS</p>
          <p>LISTINGS</p>
        </div> */}
      </div>

      {/* <div className="mt-6">
        <table className="w-full">
          <thead className="">
            <tr className="uppercase text-grays">
              <th className="text-left">Action</th>
              <th className="text-left">Item</th>
              <th className="text-right">Price</th>
              <th className="text-right">From</th>
              <th className="text-right">To</th>
              <th className="text-right">Time</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(10)].map((_, index) => (
              <tr
                key={index}
                className=" text-right font-normal transition-all hover:translate-x-2  hover:bg-dark-black"
              >
                <td>
                  <ActionNFT />
                </td>
                <td className="flex h-[72px] items-center gap-3">
                  <IImage src="" alt="" className="h-[66px] w-[66px]" />
                  <div className="text-left">
                    <p className="font-normal">Azuki Bean #1234</p>
                    <p className="text-sm text-grays">Azuki Bean</p>
                  </div>
                </td>
                <td className="">
                  <FormatPrice price={0.4} className="justify-end" />
                </td>
                <td>
                  <FormatAddress address="0x0465412b5953a6ced292204fdc8c7321ed84d6ebe5a0b14a7483c7ca4883f5d7" />
                </td>
                <td>
                  <FormatAddress address="0x0465412b5953a6ced292204fdc8c7321ed84d6ebe5a0b14a7483c7ca4883f5d7" />
                </td>
                <td>
                  <FormatTime time="1713948856" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
      <TableList />
    </div>
  );
};

export default Activity;
