import ActionNFT from "@/components/ActionNFT";
import ActionNFT2 from "@/components/ActionNFT/Action2";
import FormatAddress from "@/components/FormatAddress";
import FormatPrice from "@/components/FormatPrice";
import FormatTime from "@/components/FormatTime";
import TxHash from "@/components/TxHash";
import { useGetActivity } from "@/services/api/useGetActivity";
import {
  calculateDaysElapsed,
  calculateTimeDifferenceShort,
  convertWeiToEther,
} from "@/utils/string";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ActivityType {
  _id: string;
  tokenId: string;
  nftContract: string;
  txHash: string;
  index: number;
  __v: number;
  amount: number;
  chain: string;
  createdAt: Date;
  from: From;
  nft: string;
  nftCollection: string;
  price: number;
  priceInUsd: number;
  timestamp: number;
  to: From;
  type: string;
  updatedAt: Date;
}

interface From {
  _id: string;
  username: string;
  address: string;
  isVerified: boolean;
}

const Activity = () => {
  const { contract_address, token_id } = useParams();
  const [activitys, setActivitys] = useState<ActivityType[]>([]);
  const _getActivity = useGetActivity();

  const handleGetData = async () => {
    try {
      const res = await _getActivity.mutateAsync({
        contractAddress: contract_address as string,
        tokenId: token_id as string,
      });
      setActivitys(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetData();
  }, [contract_address, token_id]);

  return (
    <div className="w-full overflow-auto">
      <div className="relative mt-2 h-fit max-h-[300px] w-full min-w-[755px] overflow-auto">
        <div className="sticky left-0 right-0 top-0 z-10 flex items-center py-2 font-bold uppercase text-grays">
          <div className="w-[100px] flex-1 items-center justify-end">
            <p>Activity</p>
          </div>
          <div className="flex w-[100px] items-center justify-center">
            <p>Price</p>
          </div>
          <div className="flex w-[150px] items-center justify-center">
            <p>From</p>
          </div>
          <div className="flex w-[150px] items-center justify-center">
            <p>To</p>
          </div>
          <div className="flex w-[100px] items-center justify-center">
            <p>Time</p>
          </div>
          <div className="flex w-[150px] items-center justify-end">
            <p>Hash</p>
          </div>
        </div>
        <div className="mt-2 flex flex-col gap-2">
          {activitys?.map((_, i) => (
            <div
              key={i}
              className="flex cursor-pointer items-center py-1 font-normal hover:bg-dark-black"
            >
              <div className="flex w-[100px] flex-1 items-center">
                <ActionNFT2 status={_.type || ""} />
              </div>

              <div className="flex w-[100px] items-center justify-center">
                <FormatPrice price={convertWeiToEther(_.price.toString())} />
              </div>
              <div className="flex w-[150px] items-center justify-center">
                <FormatAddress address={_.from.address || ""} />
              </div>
              <div className="flex w-[150px] items-center justify-center">
                <FormatAddress address={_.to.address || ""} />
              </div>
              <div className="flex w-[100px] items-center justify-center">
                {calculateDaysElapsed(_.timestamp)}
              </div>
              <div className="flex w-[150px] items-center justify-end">
                <TxHash txHash={_.txHash}></TxHash>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activity;
