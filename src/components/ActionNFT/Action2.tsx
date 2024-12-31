import ListSVG from "@/assets/actionNFT/local_offer.svg";
import BIDSVG from "@/assets/actionNFT/gavel.svg";
import UPLOADSVG from "@/assets/actionNFT/upload.svg";
import TRANSFER from "@/assets/actionNFT/swap_horiz.svg";
import SOLDSVG from "@/assets/actionNFT/local_grocery_store.svg";
import ORDERCANCELSVG from "@/assets/actionNFT/cancel.svg";
import clsx from "clsx";
import ImageKit from "@/packages/@ui-kit/Image";
import { LuSend } from "react-icons/lu";
import { MdOutlineGetApp } from "react-icons/md";

export enum HistoryType {
  Mint = "mint",
  FlexDropMint = "flexDropMint",
  WarpcastMint = "warpcastMint",
  Transfer = "transfer",
  CancelSale = "cancelSale",
  CancelOffer = "cancelOffer",
  Sale = "sale",
  Burn = "burn",
  Stake = "stake",
  Unstake = "unstake",
}

type SignStatus =
  | HistoryType.Mint
  | HistoryType.FlexDropMint
  | HistoryType.WarpcastMint
  | HistoryType.Transfer
  | HistoryType.CancelSale
  | HistoryType.CancelOffer
  | HistoryType.Sale
  | HistoryType.Burn
  | HistoryType.Stake
  | HistoryType.Unstake;

const ActionNFT2: React.FC<{ status?: string; isShowStatus?: boolean }> = ({
  status,
  isShowStatus = true,
}) => {
  const classes = clsx(
    "font-bold uppercase",
    { "text-[#4F92FF]": status === HistoryType.Transfer },
    { "text-[#B85EFF]": status === HistoryType.Mint },
    { "text-green-500": status === HistoryType.Sale },
    { "text-[#f7f546]": status === HistoryType.Stake },
    { "text-[#de8aff]": status === HistoryType.Unstake },
    { "max-md:hidden": !isShowStatus }
  );

  const RenderStatus = () => {
    switch (status) {
      case HistoryType.Transfer: {
        return (
          <div className="flex gap-2">
            <ImageKit src={TRANSFER} alt="" width={20} />
            <p className={classes}>{HistoryType.Transfer}</p>
          </div>
        );
      }

      case HistoryType.Mint: {
        return (
          <div className="flex gap-2">
            <ImageKit src={UPLOADSVG} alt="" width={20} />
            <p className={classes}>{HistoryType.Mint}</p>
          </div>
        );
      }

      case HistoryType.Sale: {
        return (
          <div className="flex gap-2">
            <ImageKit src={SOLDSVG} alt="" width={20} />
            <p className={classes}>{HistoryType.Sale}</p>
          </div>
        );
      }

      case HistoryType.Stake: {
        return (
          <div className="flex gap-2 items-center">
            <LuSend className={`${classes} w-3 h-3`} />
            <p className={classes}>{HistoryType.Stake}</p>
          </div>
        );
      }

      case HistoryType.Unstake: {
        return (
          <div className="flex gap-2 items-center">
            <MdOutlineGetApp className={`${classes} w-4 h-4`} />
            <p className={classes}>{HistoryType.Unstake}</p>
          </div>
        );
      }

      default:
        return (
          <div className="flex gap-2">
            <ImageKit src={ORDERCANCELSVG} alt="" width={20} />
            <p className={classes}>-</p>
          </div>
        );
    }
  };

  return <>{RenderStatus()}</>;
};

export default ActionNFT2;
