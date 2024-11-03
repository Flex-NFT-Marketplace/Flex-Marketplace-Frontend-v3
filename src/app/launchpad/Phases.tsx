import eth from "@/assets/EthereumBadge.svg";
import { FaRegCircleCheck } from "react-icons/fa6";

const Phases = () => {
  return (
    <div className="flex flex-col gap-6 mt-8">
      <div className="flex items-center gap-8">
        <div className="relative h-full items-center flex">
          <FaRegCircleCheck className="text-2xl" />
          <div className="w-[1px] h-full absolute bg-border left-1/2 -translate-x-1/2 top-1/2 mt-3"></div>
        </div>
        <div className="border border-line p-4 rounded flex justify-between items-center flex-1">
          <div>
            <p>Whitelist 1 Mint - Whitelist 1000</p>
            <p className="mt-2">December 15 at 3:00 AM GMT+7</p>
          </div>
          <div>
            <div className="flex gap-2 items-center">
              <p className="">price: 0.007</p>
              <img className="h-5 w-5" src={eth.src} alt="" />
            </div>
            <p className="mt-2">Limit: 5 per wallet</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-8">
        <div className="relative h-full items-center flex">
          <FaRegCircleCheck className="text-2xl" />
          <div className="w-[1px] h-full absolute bg-border left-1/2 -translate-x-1/2 top-1/2 mt-3"></div>
        </div>
        <div className="border border-line p-4 rounded flex justify-between items-center flex-1">
          <div>
            <p>Whitelist 1 Mint - Whitelist 1000</p>
            <p className="mt-2">December 15 at 3:00 AM GMT+7</p>
          </div>
          <div>
            <div className="flex gap-2 items-center">
              <p className="">price: 0.007</p>
              <img className="h-5 w-5" src={eth.src} alt="" />
            </div>
            <p className="mt-2">Limit: 5 per wallet</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-8">
        <div className="relative h-full items-center flex">
          <FaRegCircleCheck className="text-2xl" />
          {/* <div className="w-[1px] h-full absolute bg-border left-1/2 -translate-x-1/2 top-1/2 mt-3"></div> */}
        </div>
        <div className="border border-line p-4 rounded flex justify-between items-center flex-1">
          <div>
            <p>Whitelist 1 Mint - Whitelist 1000</p>
            <p className="mt-2">December 15 at 3:00 AM GMT+7</p>
          </div>
          <div>
            <div className="flex gap-2 items-center">
              <p className="">price: 0.007</p>
              <img className="h-5 w-5" src={eth.src} alt="" />
            </div>
            <p className="mt-2">Limit: 5 per wallet</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Phases;
