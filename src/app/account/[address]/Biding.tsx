import FormatAddress from "@/components/FormatAddress";
import FormatPrice from "@/components/FormatPrice";
import UnBidPopup from "@/components/Popup/UnBidPopup";
import useModal from "@/hooks/useModal";
import Button from "@/lib/@core/Button";
import ImageKit from "@/packages/@ui-kit/Image";
import { useAccountContext } from "@/services/providers/AccountProvider";
import { ISignature } from "@/types/ISignature";
import { timeElapsedFromTimestamp } from "@/utils/string";
import { useRouter } from "next/navigation";

const Biding = () => {
  const { bids, onReload } = useAccountContext();
  // const { isOpen: isOpenUnBid, toggleModal: toggleUnBid } = useModal();
  // const [nftCancelBid, setNftCancelBid] = useState<IStagingNft>();

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

  // const showUnBid = (nft: IStagingNft) => {
  //   setNftCancelBid(nft);
  //   toggleUnBid();
  // };

  if (bids?.length == 0)
    return (
      <div className="px-8 py-4">
        <p>No listing found</p>
      </div>
    );

  return (
    <div>
      {/* {nftCancelBid && (
        <UnBidPopup
          isOpen={isOpenUnBid}
          toggleModal={toggleUnBid}
          nft={nftCancelBid}
          signature={nftCancelBid.signature4}
          onReload={() => onReload(nftCancelBid)}
          schema={nftCancelBid?.nftCollection.standard}
        />
      )} */}

      <div className="table-container w-full overflow-auto px-8 py-4">
        <table className="w-full min-w-[550px] font-normal">
          <thead>
            <tr className="h-10 text-left uppercase text-grays">
              <th>Item</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Expiration</th>
              <th>From</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody className="h-10 font-normal">
            {bids?.map((_, index) => (
              <tr
                key={index}
                className=" text-right font-normal transition-all  hover:bg-grays/20"
              >
                <td onMouseDown={() => onNavigateDetail(_)}>
                  <div className="relative flex flex-1 items-center">
                    <ImageKit
                      src={_.nft.image}
                      alt=""
                      className=" h-[52px] w-[52px]"
                    />

                    <p className="ml-4 truncate font-normal ">{_.nft.name}</p>
                  </div>
                </td>
                <td>
                  <FormatPrice price={_?.price} currency={_?.currency} />
                </td>
                <td className="text-start">{_?.amount}</td>
                <td className="text-start">
                  {timeElapsedFromTimestamp(_?.sell_end)}
                </td>
                <td className="text-start">
                  <FormatAddress address={_?.signer} />
                </td>
                <td>
                  <div className="flex justify-end">
                    <Button
                      onClick={() => onNavigateDetail(_)}
                      title="Cancel Bid"
                      mode="outline"
                      className="border-sell text-sell rounded-md"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Biding;
