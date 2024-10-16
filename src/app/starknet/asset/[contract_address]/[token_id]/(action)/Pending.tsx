import FormatAddress from "@/components/FormatAddress";
import LoadingAnimation from "@/components/LoadingAnimation";
import Button from "@/lib/@core/Button";
import { ISignature } from "@/types/ISignature";
import { useAccount } from "@starknet-react/core";
import { FaRegShareSquare } from "react-icons/fa";

interface PendingProps {
  signature: ISignature;
}

const Pending: React.FC<PendingProps> = (props) => {
  const { signature } = props;

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
