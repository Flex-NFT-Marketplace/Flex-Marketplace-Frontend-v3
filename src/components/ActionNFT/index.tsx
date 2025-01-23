import ListSVG from "@/assets/actionNFT/local_offer.svg";
import BIDSVG from "@/assets/actionNFT/gavel.svg";
import SOLDSVG from "@/assets/actionNFT/local_grocery_store.svg";
import ORDERCANCELSVG from "@/assets/actionNFT/cancel.svg";
import clsx from "clsx";
import ImageKit from "@/packages/@ui-kit/Image";

export enum SignStatusEnum {
  LISTING = "LISTING",
  BUYING = "BUYING",
  SOLD = "SOLD",
  BID = "BID",
  CANCEL = "CANCEL",
  ORDER_CANCEL = "ORDER_CANCEL",
  REVERTED = "REVERTED",
  BIDDING = "BIDDING",
}

type SignStatus =
  | SignStatusEnum.BID
  | SignStatusEnum.BUYING
  | SignStatusEnum.CANCEL
  | SignStatusEnum.LISTING
  | SignStatusEnum.SOLD
  | SignStatusEnum.ORDER_CANCEL
  | SignStatusEnum.REVERTED
  | SignStatusEnum.BIDDING;

const ActionNFT: React.FC<{ status?: SignStatus; isShowStatus?: boolean }> = ({
  status,
  isShowStatus = true,
}) => {
  const classes = clsx(
    "font-normal uppercase",
    { "text-[#FF9F0A]": status === SignStatusEnum.BID },
    { "text-[#63B1FF]": status === SignStatusEnum.LISTING },
    { "text-[#63B1FF]": status === SignStatusEnum.BUYING },
    { "text-sell": status === SignStatusEnum.CANCEL },
    { "text-green": status === SignStatusEnum.SOLD },
    { "text-primary": status === SignStatusEnum.ORDER_CANCEL },
    { "text-red": status === SignStatusEnum.REVERTED },
    { "text-primary": status === SignStatusEnum.BIDDING },
    { "max-md:hidden": !isShowStatus }
  );

  const RenderStatus = () => {
    switch (status) {
      case SignStatusEnum.BID: {
        return (
          <div className="flex gap-2">
            <ImageKit src={BIDSVG} alt="" width={20} height={20} />
            <p className={classes}>{SignStatusEnum.BID}</p>
          </div>
        );
      }

      case SignStatusEnum.LISTING: {
        return (
          <div className="flex gap-2">
            <ImageKit src={ListSVG} alt="" width={20} height={20} />
            <p className={classes}>{SignStatusEnum.LISTING}</p>
          </div>
        );
      }

      case SignStatusEnum.BUYING: {
        return (
          <div className="flex gap-2">
            <ImageKit src={ListSVG} alt="" width={20} height={20} />
            <p className={classes}>{SignStatusEnum.BUYING}</p>
          </div>
        );
      }

      case SignStatusEnum.BIDDING: {
        return (
          <div className="flex gap-2">
            <ImageKit src={ListSVG} alt="" width={20} height={20} />
            <p className={classes}>{SignStatusEnum.BIDDING}</p>
          </div>
        );
      }

      case SignStatusEnum.ORDER_CANCEL: {
        return (
          <div className="flex gap-2">
            <ImageKit src={ORDERCANCELSVG} alt="" width={20} height={20} />
            <p className={classes}>CANCEL</p>
          </div>
        );
      }

      case SignStatusEnum.SOLD: {
        return (
          <div className="flex gap-2">
            <ImageKit src={SOLDSVG} alt="" width={20} height={20} />
            <p className={classes}>{SignStatusEnum.SOLD}</p>
          </div>
        );
      }
      default:
        return (
          <div className="flex gap-2">
            <ImageKit src={ORDERCANCELSVG} alt="" width={20} height={20} />
            <p className={classes}>CANCEL</p>
          </div>
        );
    }
  };

  return <>{RenderStatus()}</>;
};

export default ActionNFT;
