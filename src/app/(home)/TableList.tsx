import ActionNFT from "@/components/ActionNFT";
import FormatAddress from "@/components/FormatAddress";
import FormatPrice from "@/components/FormatPrice";
import FormatTime2 from "@/components/FormatTime2";
import ImageKit from "@/packages/@ui-kit/Image";
import { useActivityContext } from "@/services/providers/ActivityProvider";
import { LoadingHeaderContext } from "@/services/providers/market/LoadingHeaderProvider";
import { ISignature } from "@/types/ISignature";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

const TableList = () => {
  const { isLoading, signatures10 } = useActivityContext();
  const { setIsLoadingHeader } = useContext(LoadingHeaderContext);

  useEffect(() => {
    setIsLoadingHeader(isLoading);
  }, [isLoading]);

  const router = useRouter();

  const onNavigate = (path: string) => {
    router.push(path);
  };

  const onNavigateDetail = (signature: ISignature) => {
    onNavigate(
      "/starknet/asset/" +
        signature.nft.nftContract +
        "/" +
        signature.nft.tokenId
    );
  };

  const onNavigateCollection = (contractAddress: string) => {
    onNavigate("/collection/" + contractAddress);
  };

  return (
    <div className="relative h-full w-full flex-1 overflow-auto font-bold">
      <div className="sticky left-0 right-0 top-0 z-10 flex h-10 items-center border-stroke  font-bold uppercase text-grays">
        <div className="flex min-w-[120px] items-center justify-start max-md:min-w-[32px]">
          <p className="max-md:hidden">Action</p>
          <p className="hidden max-md:block max-md:pl-1">#</p>
        </div>
        <div className="flex w-full items-center justify-start">
          <p className="">Item</p>
        </div>
        <div className="flex min-w-[150px] items-center justify-end max-sm:min-w-[75px]">
          <p>Price</p>
        </div>
        <div className="hidden min-w-[150px] items-center justify-end lg:flex">
          <p>From</p>
        </div>
        <div className="hidden min-w-[150px] items-center justify-end lg:flex">
          <p>To</p>
        </div>
        <div className="flex min-w-[100px] items-center justify-end max-sm:min-w-[75px]">
          <p>Time</p>
        </div>
      </div>
      <div className="">
        {signatures10?.map((signature, i) => (
          <div
            onClick={() => onNavigateDetail(signature)}
            key={i}
            className="flex cursor-pointer items-center py-1 hover:bg-dark-black"
          >
            <div className="flex min-w-[120px] items-center justify-start max-md:min-w-[32px]">
              <ActionNFT status={signature?.status} isShowStatus={false} />
            </div>
            <div className="flex flex-1 items-center">
              <ImageKit
                src={signature?.nft?.image}
                alt=""
                className="h-[48px] w-[48px] sm:h-[52px] sm:w-[52px]"
              />
              <div>
                <p className="ml-4 truncate max-xl:max-w-64 max-sm:max-w-32">
                  {signature?.nft?.name}
                </p>
                <p
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigateCollection(signature?.nft.nftContract);
                  }}
                  className="ml-4 font-normal text-sm text-grays hover:text-white truncate max-xl:max-w-64 max-sm:max-w-32"
                >
                  {signature?.nft?.nftCollection?.name}
                </p>
              </div>
            </div>

            <div className="flex min-w-[150px] items-center justify-end max-sm:min-w-[75px]">
              <FormatPrice
                price={signature?.price}
                currency={signature?.currency}
              />
            </div>
            <div className="hidden min-w-[150px] items-center justify-end lg:flex">
              <FormatAddress address={signature?.signer} />
            </div>
            <div className="hidden min-w-[150px] items-center justify-end lg:flex">
              <FormatAddress address={signature?.buyer} />
            </div>
            <div className="flex min-w-[100px] items-center justify-end max-sm:min-w-[75px]">
              <FormatTime2 time={signature?.updatedAt} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableList;
