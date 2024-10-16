import { useGetProfile } from "@/services/api/useGetProfile";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface IAddressShortProps {
  address?: string;
  convertName?: boolean;
}

const FormatAddress: React.FC<IAddressShortProps> = (props) => {
  const { address, convertName = false } = props;
  const router = useRouter();
  const [name, setName] = useState("");
  const [isName, setIsName] = useState(false);

  const _getProfile = useGetProfile();

  useEffect(() => {
    try {
      if (address && convertName && address!.length > 3) {
        _getProfile.mutateAsync(address as string).then((res) => {
          const newName = res.name;

          if (newName) {
            setName(newName.substring(0, 11));
            setIsName(true);
          } else {
            setName(handleShortAddress(address || ""));
          }
        });
      } else {
        setName(handleShortAddress(address || ""));
      }
    } catch (error) {}
  }, [address, convertName]);

  const handleShortAddress = (address: string) => {
    if (!address) return "-";
    const start = address.substring(0, 4);
    const end = address.substring(address.length - 4);
    return `${start}...${end}`;
  };

  return (
    <div className="">
      <p className={`font-semibold ${isName && "text-[#B85EFF]"}`}>{name}</p>
    </div>
  );
};

export default FormatAddress;
