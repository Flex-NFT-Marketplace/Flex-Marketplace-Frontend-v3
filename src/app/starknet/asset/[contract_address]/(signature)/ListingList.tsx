import FormatAddress from "@/components/FormatAddress";
import FormatPrice from "@/components/FormatPrice";
import BuyPopup from "@/components/Popup/BuyPopup";
import UnListPopup from "@/components/Popup/UnListPopup";
import useModal from "@/hooks/useModal";
import Button from "@/packages/@ui-kit/Button";
import { useNftContext } from "@/services/providers/NFTProvider";
import { ISignature, SignStatusEnum } from "@/types/ISignature";
import { timeElapsedFromTimestamp } from "@/utils/string";
import { useAccount } from "@starknet-react/core";
import { useState } from "react";

const ListingList = () => {
  const { address } = useAccount();
  const { listAsk, nftStaging, onReload, collection } = useNftContext();
  const { isOpen, toggleModal } = useModal();
  const { isOpen: isOpenUnListModal, toggleModal: toggleUnListModal } =
    useModal();

  const [signature, setSignature] = useState<ISignature>();

  const onBuy = (signature: ISignature) => {
    setSignature(signature);
    toggleModal();
  };

  const onCancel = (signature: ISignature) => {
    setSignature(signature);
    toggleUnListModal();
  };

  const renderAction = (signature: ISignature) => {
    if (signature.status == SignStatusEnum.BUYING) {
      return <p className="text-buy">Processing...</p>;
    }

    if (signature.signer === address) {
      return (
        <Button
          title="Edit"
          variant="outline"
          className="border-cancel text-cancel"
          onClick={() => {
            onCancel(signature);
          }}
        />
      );
    } else {
      return (
        <Button
          title="Buy"
          onClick={() => {
            onBuy(signature);
          }}
        />
      );
    }
  };

  return (
    <div className="table-container w-full overflow-auto">
      <BuyPopup
        isOpen={isOpen}
        toggleModal={toggleModal}
        nft={nftStaging}
        signature={signature}
        onReload={() => onReload()}
        schema={collection?.standard}
      />

      <UnListPopup
        isOpen={isOpenUnListModal}
        toggleModal={() => {
          toggleUnListModal();
        }}
        nft={nftStaging}
        signature={signature as ISignature}
        onReload={() => onReload()}
      />

      <table className="min-w-[550px] overflow-auto font-normal w-full">
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
          {listAsk?.map((_, index) => (
            <tr key={index} className="h-8 text-left">
              <td>
                <FormatPrice price={_.price} currency={_.currency} />
              </td>
              <td>{_.amount}</td>
              <td>{timeElapsedFromTimestamp(_.sell_end)}</td>
              <td>
                <FormatAddress address={_.signer} />
              </td>
              <td>{renderAction(_)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {listAsk?.length === 0 && (
        <p className="text-center">No data available</p>
      )}
    </div>
  );
};

export default ListingList;
