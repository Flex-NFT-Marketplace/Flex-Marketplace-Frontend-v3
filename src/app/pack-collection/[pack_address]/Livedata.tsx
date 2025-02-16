import ImageKit from "@/packages/@ui-kit/Image";
import Link from "next/link";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoLogoDiscord } from "react-icons/io5";
import live from "@/assets/social/live.svg";
import { useEffect, useState } from "react";

interface TradeData {
  p: string;
}

const createSocket = (
  url: string,
  onPriceUpdate: (price: number) => void
): WebSocket => {
  const socket = new WebSocket(url);
  socket.onmessage = (e: MessageEvent) => {
    try {
      const data: TradeData = JSON.parse(e.data);
      onPriceUpdate(parseFloat(data.p));
    } catch (error) {
      console.error(`Error parsing data from ${url}:`, error);
    }
  };
  return socket;
};

const LiveData = () => {
  const [strkPrice, setStrkPrice] = useState<number | null>(null);
  const [ethPrice, setEthPrice] = useState<number | null>(null);

  useEffect(() => {
    const wsStrk = createSocket(
      "wss://stream.binance.com:9443/ws/strkusdt@trade",
      setStrkPrice
    );
    const wsEth = createSocket(
      "wss://stream.binance.com:9443/ws/ethusdt@trade",
      setEthPrice
    );

    return () => {
      wsStrk.close();
      wsEth.close();
    };
  }, []);

  return (
    <div className="w-full fixed z-10 bg-black bottom-0 left-0 border-t border-gray">
      <div className=" flex justify-between items-center max-sm:px-4 px-8 max-w-[1440px] mx-auto w-full max-md:flex-col max-md:gap-1">
        <div className="flex items-center gap-4">
          <div className="flex gap-1 items-center">
            <ImageKit src={live.src} className="w-3 h-3" />
            <p className="font-bold text-[14px] leading-5">LIVE DATA</p>
          </div>
          <div className="h-8 w-[1px] bg-gray max-md:hidden "></div>
          <div className="flex gap-4 items-center">
            <Link href={"https://x.com/Flex_strk"} target={"_blank"}>
              <FaSquareXTwitter
                className={`aspect-square h-5 cursor-pointer text-gray hover:text-white`}
              />
            </Link>
            <Link href={"https://discord.gg/5592QUqB"} target={"_blank"}>
              <IoLogoDiscord
                className={`aspect-square h-5 text-gray hover:text-white`}
              />
            </Link>
          </div>
        </div>
        <div className="flex gap-6">
          <div className="h-8 w-[1px] bg-gray max-md:hidden"></div>
          <div className=" border-gray pl-6 items-center flex gap-6 flex-wrap gap-y-[2px] ">
            {/* <div className="flex gap-1 text-gray font-bold text-[14px] leading-5">
              <p>Starknet network:</p>
              <p className="text-green uppercase">150 TPS</p>
            </div> */}
            <div className="flex gap-1 text-gray font-bold text-[14px] leading-5">
              <p>STRK/USDT:</p>
              <p className="text-green uppercase">
                ${strkPrice?.toFixed(4) || "-"}
              </p>
            </div>
            <div className="flex gap-1 text-gray font-bold text-[14px] leading-5">
              <p>ETH/USDT:</p>
              <p className="text-green uppercase">
                ${ethPrice?.toFixed(2) || "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveData;
