import FormatAddress from "@/components/FormatAddress";
import FormatPrice from "@/components/FormatPrice";
import UnListPopup from "@/components/Popup/UnListPopup";
import useModal from "@/hooks/useModal";
import Button from "@/packages/@ui-kit/Button";
import ImageKit from "@/packages/@ui-kit/Image";
import { useAccountContext } from "@/services/providers/AccountProvider";
import { ISignature } from "@/types/ISignature";
import { IStagingNft } from "@/types/IStagingNft";
import { timeElapsedFromTimestamp } from "@/utils/string";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Listing = () => {
  const { orders, onReload } = useAccountContext();
  const { isOpen: isOpenUnListModal, toggleModal: toggleUnListModal } =
    useModal();

  const [nft, setNft] = useState<IStagingNft>();
  const [signature, setSignature] = useState<ISignature>();

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

  if (orders?.length == 0)
    return (
      <div className="px-8 py-4">
        <p>No listing found</p>
      </div>
    );

  return (
    <div className="overflow-auto">
      <UnListPopup
        isOpen={isOpenUnListModal}
        toggleModal={() => {
          toggleUnListModal();
        }}
        nft={nft}
        signature={signature as ISignature}
        onReload={() => onReload(nft as IStagingNft)}
      />
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
            {orders?.map((_, index) => (
              <tr
                key={index}
                className=" cursor-pointer text-right font-normal transition-all hover:bg-grays/20"
              >
                <td onClick={() => onNavigateDetail(_)}>
                  <div className="relative flex flex-1 cursor-pointer items-center">
                    <ImageKit
                      src={_?.nft?.image}
                      alt=""
                      className=" h-[52px] w-[52px]"
                    />

                    <p className="ml-4 truncate font-normal">{_?.nft?.name}</p>
                  </div>
                </td>
                <td>
                  <FormatPrice price={_?.price} currency={_?.currency} />
                </td>
                <td className="text-start">{_?.amount}</td>
                <td className="text-start">
                  {timeElapsedFromTimestamp(_?.sellEnd)}
                </td>
                <td className="text-start">
                  <FormatAddress address={_?.signer} />
                </td>
                <td>
                  <div className="flex justify-end">
                    <Button
                      title="Cancel Order"
                      variant="outline"
                      className="!border-cancel !text-cancel"
                      onClick={() => {
                        setNft(_.nft);
                        setSignature(_);
                        toggleUnListModal();
                      }}
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

export default Listing;
