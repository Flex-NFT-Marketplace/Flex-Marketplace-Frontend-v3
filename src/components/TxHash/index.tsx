import { FaRegShareSquare } from "react-icons/fa";
import FormatAddress from "../FormatAddress";

const TxHash: React.FC<{ txHash?: string }> = ({ txHash }) => {
  return (
    <div className="flex gap-2 underline">
      <a
        href={`https://starkscan.co/tx/${txHash}`}
        target="_blank"
        className="flex items-center gap-2"
        rel="noopener noreferrer"
      >
        <FormatAddress address={txHash} />
        <FaRegShareSquare />
      </a>
    </div>
  );
};

export default TxHash;
