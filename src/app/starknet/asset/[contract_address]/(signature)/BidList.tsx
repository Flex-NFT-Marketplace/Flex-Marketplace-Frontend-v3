import FormatAddress from "@/components/FormatAddress";
import FormatPrice from "@/components/FormatPrice";
import AcceptBidPopup from "@/components/Popup/AcceptBidPopup";
import UnBidPopup from "@/components/Popup/UnBidPopup";
import useModal from "@/hooks/useModal";
import Button from "@/packages/@ui-kit/Button";
import { useNftContext } from "@/services/providers/NFTProvider";
import { ISignature, SignStatusEnum } from "@/types/ISignature";
import { formatTimestamp, timeElapsedFromTimestamp } from "@/utils/string";
import { useAccount } from "@starknet-react/core";
import { useState } from "react";

const BidList = () => {
  const { nft, onReload, collection, listBid } = useNftContext();
  const { address } = useAccount();
  const { isOpen, toggleModal } = useModal();
  const { isOpen: isOpenUnBid, toggleModal: toggleUnBid } = useModal();

  const [signature, setSignature] = useState<ISignature>();

  const renderAction = (signature: ISignature) => {
    if (signature.status == SignStatusEnum.BIDDING) {
      return <p className="text-buy">Processing...</p>;
    }

    if (signature.buyer_address === address) {
      return (
        <Button
          title="Accept"
          variant="primary"
          className="!h-6"
          onClick={() => {
            setSignature(signature);
            toggleModal();
          }}
        />
      );
    } else if (address === signature.signer) {
      return (
        <Button
          title="Cancel"
          onClick={() => {
            setSignature(signature);
            toggleUnBid();
          }}
          variant="outline"
          className=" border-cancel text-cancel"
        />
      );
    }

    return <></>;
  };

  return (
    <div className="table-container w-full overflow-auto">
      <AcceptBidPopup
        isOpen={isOpen}
        toggleModal={toggleModal}
        nft={nft}
        signature={signature}
        onReload={() => onReload()}
        schema={collection?.schema}
      />

      <UnBidPopup
        isOpen={isOpenUnBid}
        toggleModal={toggleUnBid}
        nft={nft}
        signature={signature}
        onReload={() => onReload()}
        schema={collection?.schema}
      />

      <table className="w-full min-w-[550px] font-normal">
        <thead>
          <tr className="h-10 text-left uppercase text-grays">
            <th>Unit Price</th>
            <th>Quantity</th>
            <th>Expiration</th>
            <th>From</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="h-10 font-normal">
          {listBid?.map((_, index) => (
            <tr key={index} className="h-8 text-left">
              <td>
                <FormatPrice price={_.price} currency={_.currency} />
              </td>
              <td>{_.amount}</td>
              <td>{timeElapsedFromTimestamp(_.sell_end)}</td>
              <td>
                <FormatAddress address={_.signer} />
              </td>
              <td>
                {renderAction(_)}

                {/* {address === _.signer ? (
                <Button
                  title="Edit"
                  mode="outline"
                  className="border-sell text-sell"
                />
              ) : (
                <Button title="Buy" onClick={() => onBuy(_)} />
              )} */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {listBid?.length === 0 && (
        <p className="text-center">No data available</p>
      )}
    </div>
  );
};

export default BidList;
