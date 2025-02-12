import Input from "@/packages/@ui-kit/Input";
import { copyToClipboard, isDigit, strShortAddress } from "@/utils/string";
import { Divider } from "antd";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import flex_logo from "@/assets/logo-flex.svg";
import ImageKit from "@/packages/@ui-kit/Image";
import { useAccountContext } from "@/services/providers/AccountProvider";
import Button from "@/packages/@ui-kit/Button";
import { IProfileStaging } from "@/types/IStagingNft";
import { MdOutlineContentCopy } from "react-icons/md";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { VscArrowSwap } from "react-icons/vsc";
import { useSocial } from "@/services/providers/SocialProvider";
import { useToast } from "@/packages/@ui-kit/Toast/ToastProvider";

interface HausDonateProps {
  hide: () => void;
  creator: IProfileStaging;
}

const HausDonate: React.FC<HausDonateProps> = ({ hide, creator }) => {
  const [amount, setAmount] = useState<number>(50);
  const [suggestedAmount, setSuggestedAmount] = useState<number[]>([
    500, 1000, 2000, 5000,
  ]);
  const { profileOwner } = useAccountContext();
  const [isLoadingDonate, setIsLoadingDonate] = useState<boolean>(false);
  const { handleDonate } = useSocial();
  const { onShowToast } = useToast();

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setAmount(0);
      return;
    }

    if (isDigit(e.target.value)) {
      setAmount(Number(e.target.value));
    }
  };

  const submitDonate = async () => {
    try {
      setIsLoadingDonate(true);

      await handleDonate(creator.address as string, amount);
      hide();
    } catch (error) {
      onShowToast("Something went wrong");
    } finally {
      setIsLoadingDonate(false);
    }
  };

  const handleCopyAddress = () => {
    try {
      copyToClipboard(creator.address as string);
      onShowToast("Copy address successfully");
    } catch (error) {
      onShowToast("Something went wrong");
    }
  };

  return (
    <div className="p-4 border border-border rounded-md flex flex-col gap-6 w-[500px] max-w-full">
      <div>
        <div className="flex justify-between items-center">
          <p className="uppercase font-bold text-xl">Thank Creator</p>
          <IoClose
            onClick={hide}
            className="text-grays hover:text-white cursor-pointer scale-150"
          />
        </div>
      </div>
      <Divider className="bg-border m-0" />
      <div className="flex w-full items-center gap-4">
        <ImageKit src="" className="aspect-square w-[96px]" />
        <div className="flex w-full flex-col gap-1">
          <div className="flex items-center gap-2">
            <h4 className="text-[24px] font-bold uppercase leading-7">
              {strShortAddress(creator?.address as string)}
            </h4>
            <TbRosetteDiscountCheckFilled className="text-[#63B1FF]" />
          </div>
          <div className="divide-gray flex gap-4 divide-x">
            <div className="flex gap-2">
              <p>{strShortAddress(creator?.address as string)}</p>
              <MdOutlineContentCopy
                onClick={handleCopyAddress}
                className="text-gray text-base hover:text-white cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p>Your BYTE balance: {profileOwner?.points}</p>
        <Input
          classContainer="!max-w-full"
          value={amount}
          onChange={handleChangeAmount}
        />
        <div className="flex gap-2">
          {suggestedAmount.map((amountSuggested, index) => (
            <div
              key={index}
              onClick={() => setAmount(amountSuggested)}
              className={`p-2 border border-border hover:bg-hover hover:border-grays cursor-pointer transition-all rounded flex items-center gap-1 ${amount == amountSuggested && "bg-hover border-grays"}`}
            >
              {amountSuggested}
              <ImageKit src={flex_logo.src} alt="flex logo" className="w-8" />
            </div>
          ))}
        </div>
      </div>
      <div>
        <Button
          loading={isLoadingDonate}
          onClick={submitDonate}
          title="Submit"
          variant="primary"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default HausDonate;
