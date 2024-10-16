import { calculateTimeDifferenceShort } from "@/utils/string";
import { useEffect } from "react";

interface IFormatTimeProps {
  time?: string;
  type?: "date" | "time";
}

const FormatTime2: React.FC<IFormatTimeProps> = (props) => {
  const { time } = props;

  return (
    <div>
      <p className="text-[#3B82F6]">{calculateTimeDifferenceShort(time || "")}</p>
    </div>
  );
};

export default FormatTime2;
