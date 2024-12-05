import { FormatPriceWithIcon } from "@/components/FormatPrice";
import UnListPopup from "@/components/Popup/UnListPopup";
import useModal from "@/hooks/useModal";
import Button from "@/packages/@ui-kit/Button";
import useListActionNft from "@/services/context/useListActionNft";
import { useNftContext } from "@/services/providers/NFTProvider";
import { INft } from "@/types/INft";
import { ISignature } from "@/types/ISignature";
import { IStagingNft } from "@/types/IStagingNft";
import { formatTimestamp } from "@/utils/string";
import { useAccount } from "@starknet-react/core";
import { useEffect } from "react";

interface CancelOrderProps {
  nftData: IStagingNft | undefined;
  signature: ISignature | undefined;
  schema?: string;
}

const CancelOrder: React.FC<CancelOrderProps> = (props) => {
  const { address } = useAccount();
  const { nftData, signature, schema } = props;
  const { isOpen, toggleModal } = useModal();

  const { onCancelOrder } = useListActionNft();
  const { onReload, isOwner, collection, getNft } = useNftContext();

  const onCancel = async () => {
    try {
      await onCancelOrder(signature?._id as string);
      getNft();
    } catch (error) {
      error;
    }
  };

  return (
    <div className="flex flex-col justify-between  gap-4 rounded-md border border-stroke  px-4 py-4">
      <UnListPopup
        isOpen={isOpen}
        toggleModal={toggleModal}
        nft={nftData}
        signature={signature}
        onReload={() => onReload()}
        schema={schema}
      />
      <div className="flex justify-between">
        <p className="font-normal uppercase text-grays">Price</p>

        <div className="flex items-center gap-1 font-normal">
          <p className="uppercase text-grays">Time end:</p>
          <p>{formatTimestamp(signature?.sell_end)}</p>
        </div>
      </div>
      {/* <FormatPrice
        price={signature?.price}
        className="text-[36px]"
        currency={signature?.currency}
        iconSize="lg"
      /> */}
      <div className="flex items-center gap-4">
        <FormatPriceWithIcon
          price={signature?.price}
          size="big"
          iconSize="lg"
          className="text-primary"
          currency={signature?.currency}
        />
        {/* <p className="text-grays">($5,340)</p> */}
      </div>
      <Button
        className="mt-2 w-full !border-cancel !text-cancel"
        title="Cancel Order"
        variant="outline"
        onClick={() => {
          onCancel();
        }}
      />{" "}
    </div>
  );
};

export default CancelOrder;
