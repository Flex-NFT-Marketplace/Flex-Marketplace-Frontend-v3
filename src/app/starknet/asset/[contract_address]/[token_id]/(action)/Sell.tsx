"use client";

import useModal from "@/hooks/useModal";
import SellPopup from "../../../../../../components/Popup/SellPopup";
import { INft } from "@/types/INft";
import { useNftContext } from "@/services/providers/NFTProvider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/packages/@ui-kit/Button";

type SellProps = {
  nftData: INft | undefined;
  schema?: string;
};

const Sell: React.FC<SellProps> = (props) => {
  const { isOpen, toggleModal } = useModal();
  const { nftData, schema = "ERC721" } = props;
  const { onReload } = useNftContext();

  return (
    <div className="flex flex-col justify-between gap-4 rounded-md border border-stroke px-4 py-4">
      <SellPopup
        isOpen={isOpen}
        toggleModal={toggleModal}
        nftData={nftData}
        onReload={onReload}
        schema={schema}
      />
      <p className="text-2xl font-bold uppercase">Not listed</p>
      <Button title="List for sale" onClick={toggleModal} className="w-full" />
    </div>
  );
};

export default Sell;
