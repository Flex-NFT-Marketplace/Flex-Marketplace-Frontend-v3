import Input from "@/packages/@ui-kit/Input";
import { copyToClipboard, isDigit, strShortAddress } from "@/utils/string";
import { Divider, Tooltip } from "antd";
import { useEffect, useState } from "react";
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
import { useAccount } from "@starknet-react/core";
import { PiApproximateEqualsBold } from "react-icons/pi";
import QRCode from "react-qr-code";
import { useGetPaymentWallet } from "@/services/api/flexhaus/social/useGetPaymentWallet";
import { useGetTokenPerPoints } from "@/services/api/flexhaus/social/useGetTokenPerPoints";
import { IoMdInformationCircleOutline } from "react-icons/io";

interface DepositPointsProps {
  hide: () => void;
}

export type IPaymentAddress = {
  address: string;
  deadline: number;
  _id: string;
};

const DepositPoints: React.FC<DepositPointsProps> = ({ hide }) => {
  const [amount, setAmount] = useState<number>(50);
  const [suggestedAmount, setSuggestedAmount] = useState<number[]>([
    500, 1000, 2000, 5000,
  ]);
  const { profileOwner } = useAccountContext();
  const [isLoadingDonate, setIsLoadingDonate] = useState<boolean>(false);
  const { onShowToast } = useToast();
  const { address } = useAccount();
  const [paymentAddress, setPaymentAddress] = useState<string>("");
  const [tokenPerPoints, setTokenPerPoints] = useState<{
    strkPerPoint: string;
    ethPerPoint: string;
  }>({ strkPerPoint: "0", ethPerPoint: "0" });

  const bytePerEth = 1000;
  const bytePerStrk = 10;

  const _getPaymentWallet = useGetPaymentWallet();
  const getPaymentWallet = async () => {
    const wallet: IPaymentAddress = await _getPaymentWallet.mutateAsync();
    setPaymentAddress(wallet.address);
  };

  const _getTokenPerPoint = useGetTokenPerPoints();
  const getTokenPerPoint = async () => {
    const tokenPerPoints = await _getTokenPerPoint.mutateAsync();
    setTokenPerPoints(tokenPerPoints);
  };

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setAmount(0);
      return;
    }

    if (isDigit(e.target.value)) {
      setAmount(Number(e.target.value));
    }
  };

  const convertEthtoByte = (eth: number) => {
    return eth * Number(tokenPerPoints.ethPerPoint);
  };

  const convertByteToEth = (byte: number) => {
    return byte / bytePerEth;
  };

  const convertStrkToByte = (strk: number) => {
    return strk * bytePerStrk;
  };

  const convertByteToStrk = (byte: number) => {
    return byte / bytePerStrk;
  };

  const handleCopyAddress = (address: string) => {
    try {
      copyToClipboard(address);
      onShowToast("Copy address successfully");
    } catch (error) {
      onShowToast("Something went wrong");
    }
  };

  useEffect(() => {
    if (address) {
      getPaymentWallet();
    }
  }, [address]);

  useEffect(() => {
    getTokenPerPoint();
  }, []);

  if (!address) {
    return <></>;
  }

  return (
    <div className="p-4 border border-border rounded-md flex flex-col gap-6 w-[500px] max-w-full">
      <div>
        <div className="flex justify-between items-center">
          <p className="uppercase font-bold text-xl">deposit points</p>
          <IoClose
            onClick={hide}
            className="text-grays hover:text-white cursor-pointer scale-150"
          />
        </div>
      </div>
      <Divider className="bg-border m-0" />
      <p>Your BYTE balance: {profileOwner?.points}</p>
      <div className="flex items-center gap-4">
        <div className="flex-1 text-center flex items-center gap-2 justify-center border border-border rounded-md py-2">
          1000 BYTE
          <span>
            <PiApproximateEqualsBold />
          </span>
          {Number(tokenPerPoints.ethPerPoint) * 1000} ETH
        </div>
        <div className="flex-1 text-center flex items-center gap- justify-center border border-border rounded-md py-2 gap-2">
          1000 BYTE
          <span>
            <PiApproximateEqualsBold />
          </span>
          {Number(tokenPerPoints.strkPerPoint) * 1000} STRK
        </div>
      </div>
      <div>
        <p>
          Sent your tokens to this address to receive BYTE{" "}
          <Tooltip
            rootClassName="border border-border rounded"
            title="What is BYTE? 
          BYTE is a new unit of exchange introduced exclusively for the Flexdrops event. It empowers you to protect collectibles, support creators through donations, and unlock a wide array of enticing rewards."
          >
            <span>
              <IoMdInformationCircleOutline className="inline-block text-xl text-grays hover:text-white" />
            </span>
          </Tooltip>
        </p>
        <div className="flex flex-col gap-2 mt-4 items-center">
          {paymentAddress && (
            <div className="p-2 border-2 border-white">
              <QRCode value={paymentAddress} />
            </div>
          )}

          <p
            className="cursor-pointer"
            onClick={() => handleCopyAddress(paymentAddress)}
          >
            {strShortAddress(paymentAddress as string)}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p>Example</p>
        <Input
          classContainer="!max-w-full"
          value={amount}
          onChange={handleChangeAmount}
        />
        <div className="flex items-center gap-4">
          <div className="flex-1 text-center flex items-center gap-2 justify-center border border-border rounded-md py-2">
            {amount * Number(tokenPerPoints.ethPerPoint)} ETH
          </div>
          <div className="flex-1 text-center flex items-center gap- justify-center border border-border rounded-md py-2">
            {amount * Number(tokenPerPoints.strkPerPoint)} STRK
          </div>
        </div>
      </div>
      {/* <div>
        <Button
          loading={isLoadingDonate}
          //   onClick={submitDonate}
          title="Submit"
          variant="primary"
          className="w-full"
        />
      </div> */}
    </div>
  );
};

export default DepositPoints;
