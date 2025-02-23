import Input from "@/packages/@ui-kit/Input";
import { copyToClipboard, isDigit, strShortAddress } from "@/utils/string";
import { Divider, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useAccountContext } from "@/services/providers/AccountProvider";
import { useToast } from "@/packages/@ui-kit/Toast/ToastProvider";
import { useAccount } from "@starknet-react/core";
import { PiApproximateEqualsBold } from "react-icons/pi";
import QRCode from "react-qr-code";
import { useGetPaymentWallet } from "@/services/api/flexhaus/social/useGetPaymentWallet";
import { useGetTokenPerPoints } from "@/services/api/flexhaus/social/useGetTokenPerPoints";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { CallData, RpcProvider, uint256 } from "starknet";
import Button from "@/packages/@ui-kit/Button";
import { toast } from "react-toastify";

interface DepositPointsProps {
  hide: () => void;
}

export type IPaymentAddress = {
  address: string;
  deadline: number;
  _id: string;
};

const DepositPoints: React.FC<DepositPointsProps> = ({ hide }) => {
  const [amount, setAmount] = useState<number>(1000);
  const { profileOwner, reloadInfoOwner } = useAccountContext();
  const { address, account } = useAccount();
  const [paymentAddress, setPaymentAddress] = useState<string>("");
  const [tokenPerPoints, setTokenPerPoints] = useState<{
    strkPerPoint: number;
    ethPerPoint: number;
  }>({ strkPerPoint: 0, ethPerPoint: 0 });
  const [loadingSentETH, setLoadingSentETH] = useState<boolean>(false);
  const [loadingSentSTRK, setLoadingSentSTRK] = useState<boolean>(false);

  const provider = new RpcProvider({
    nodeUrl: process.env.NEXT_PUBLIC_STARKNET_NODE_URL,
  });

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

  const convertByteToEth = (byte: number): number => {
    return byte * tokenPerPoints.ethPerPoint;
  };

  const convertByteToStrk = (byte: number): number => {
    return byte * tokenPerPoints.strkPerPoint;
  };

  const handleCopyAddress = (address: string) => {
    try {
      copyToClipboard(address);
      toast("Copy address successfully");
    } catch (error) {
      toast("Something went wrong");
    }
  };

  const quickSentEth = async (points: number) => {
    if (!account) {
      toast("Please connect your wallet");
      return;
    }

    if (!paymentAddress) {
      toast("Error while getting payment address");
      return;
    }

    const ethByPoint = convertByteToEth(points);

    try {
      setLoadingSentETH(true);

      const execute = await account.execute([
        {
          contractAddress:
            "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7", // ETH
          entrypoint: "transfer",
          calldata: CallData.compile({
            recipient: paymentAddress,
            amount: uint256.bnToUint256(BigInt(Math.floor(ethByPoint * 1e18))),
          }),
        },
      ]);

      const tx = await provider.waitForTransaction(execute.transaction_hash);

      if (tx.isSuccess()) {
        await reloadInfoOwner();
        toast("Successfully sent");
        hide();
      } else {
        toast("Error while sending");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSentETH(false);
    }
  };

  const quickSentStrk = async (points: number) => {
    if (!account) {
      toast("Please connect your wallet");
      return;
    }
    if (!paymentAddress) {
      toast("Error while getting payment address");
      return;
    }
    const strkByPoint = convertByteToStrk(points);
    try {
      setLoadingSentSTRK(true);
      const execute = await account.execute([
        {
          contractAddress:
            "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d", // STRK
          entrypoint: "transfer",
          calldata: CallData.compile({
            recipient: paymentAddress,
            amount: uint256.bnToUint256(BigInt(Math.floor(strkByPoint * 1e18))),
          }),
        },
      ]);
      const tx = await provider.waitForTransaction(execute.transaction_hash);
      if (tx.isSuccess()) {
        toast("Successfully sent");
        hide();
      } else {
        toast("Error while sending");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSentSTRK(false);
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
        <p>Get BYTE</p>
        <Input
          classContainer="!max-w-full"
          value={amount}
          onChange={handleChangeAmount}
        />
        <div className="flex items-center gap-4">
          <Button
            loading={loadingSentETH}
            onClick={() => quickSentEth(amount)}
            className="flex-1"
            variant="primary"
          >
            <p>{convertByteToEth(amount)} ETH</p>
          </Button>
          <Button
            loading={loadingSentSTRK}
            onClick={() => quickSentStrk(amount)}
            className="flex-1"
            variant="primary"
          >
            {convertByteToStrk(amount)} STRK
          </Button>
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
