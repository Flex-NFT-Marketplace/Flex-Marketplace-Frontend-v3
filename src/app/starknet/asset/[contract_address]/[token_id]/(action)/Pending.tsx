import FormatAddress from "@/components/FormatAddress";
import LoadingAnimation from "@/components/LoadingAnimation";
import { useNftContext } from "@/services/providers/NFTProvider";
import { ISignature } from "@/types/ISignature";
import { useEffect } from "react";
import { FaRegShareSquare } from "react-icons/fa";

interface PendingProps {
  signature: ISignature;
}

const Pending: React.FC<PendingProps> = (props) => {
  const { signature } = props;

  const { onReload, nftStaging } = useNftContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      onReload();
    }, 10000);

    return () => clearTimeout(timer);
  }, [nftStaging]);

  return (
    <div className="flex flex-col justify-between  gap-4 border border-dashed border-buy bg-[#171921] px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <p className="text-[24px] font-normal text-buy">
            Transaction processing
          </p>
          <LoadingAnimation />
        </div>

        <div className="flex gap-2 underline">
          <a
            href={`https://voyager.online/tx/${signature.transaction_hash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FormatAddress address={signature.transaction_hash} />
            <FaRegShareSquare />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Pending;
