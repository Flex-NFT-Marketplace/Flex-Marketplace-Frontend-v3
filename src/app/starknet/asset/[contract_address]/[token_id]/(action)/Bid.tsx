"use client";

import useModal from "@/hooks/useModal";
import { INft } from "@/types/INft";
import { useNftContext } from "@/services/providers/NFTProvider";
import BidPopup from "@/components/Popup/BidPopup";
import Button from "@/packages/@ui-kit/Button";
import { useAccount, useConnect } from "@starknet-react/core";
import { useStarknetkitConnectModal } from "starknetkit";
import { IStagingNft } from "@/types/IStagingNft";

type SellProps = {
  nftData: IStagingNft | undefined;
  schema?: string;
};

const Bid: React.FC<SellProps> = (props) => {
  const { isOpen, toggleModal } = useModal();
  const { nftData, schema = "ERC721" } = props;
  const { onReload } = useNftContext();

  const { status } = useAccount();
  const { connect, connectors } = useConnect();
  const { starknetkitConnectModal } = useStarknetkitConnectModal({
    connectors: connectors as any,
  });

  const onConnect = async () => {
    const { connector } = await starknetkitConnectModal();
    await connect({ connector });
  };

  return (
    <div className="flex flex-col justify-between gap-4 rounded-md border border-stroke px-4 py-4">
      <BidPopup
        isOpen={isOpen}
        toggleModal={toggleModal}
        nftData={nftData}
        onReload={onReload}
        schema={schema}
      />
      <p className="text-2xl font-bold  uppercase">Not listed</p>
      <Button
        title="Place Bid"
        variant="secondary"
        onClick={() => {
          if (status === "disconnected") {
            onConnect();
            return;
          }
          toggleModal();
        }}
        className="w-full"
      />
    </div>
  );
};

export default Bid;
