import ListSVG from "@/assets/actionNFT/local_offer.svg";
import BIDSVG from "@/assets/actionNFT/gavel.svg";
import UPLOADSVG from "@/assets/actionNFT/upload.svg";
import TRANSFER from "@/assets/actionNFT/swap_horiz.svg";
import SOLDSVG from "@/assets/actionNFT/local_grocery_store.svg";
import ORDERCANCELSVG from "@/assets/actionNFT/cancel.svg";
import clsx from "clsx";
import ImageKit from "@/packages/@ui-kit/Image";

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
    { "max-md:hidden": !isShowStatus },
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
