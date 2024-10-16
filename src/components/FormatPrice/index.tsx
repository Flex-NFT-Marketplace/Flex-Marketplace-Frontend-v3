import { FaEthereum } from "react-icons/fa";
import StrkSVG from "@/assets/strk.svg";
import EthSVG from "@/assets/EthereumBadge.svg";
import { HTMLProps } from "react";
import clsx from "clsx";
import Image from "next/image";

interface IFormatPriceProps {
  className?: HTMLProps<HTMLElement>["className"];
  price?: number;
  currency?: string;
  size?: "sm" | "md" | "lg" | "big";
  iconSize?: "sm" | "md" | "lg";
  decimal?: number;
}

const token = [
  {
    address:
      "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    label: "ETH",
  },
  {
    address:
      "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
    label: "STRK",
  },
];

const FormatPrice: React.FC<IFormatPriceProps> = (props) => {
  const {
    price,
    currency = token[0].address,
    className,
    size = "md",
    iconSize = "sm",
    decimal = 4,
  } = props;

  const classes = clsx("flex items-center gap-1 font-bold", className, {
    "text-sm": size == "sm",
    "text-md": size == "md",
    "text-lg": size == "lg",
  });

  const handleFormatPrice = (price: number) => {
    if (price == 0) {
      return "-";
    } else if (price < 0.0001) {
      return "<0.0001";
    } else return parseFloat(price.toFixed(decimal).toString());
  };

  if (price == 0 || !price) return <span>-</span>;

  const clsxSize = clsx(
    "mr-[0.15rem]",
    { "h-4 w-4": iconSize == "sm" },
    { "h-5 w-5": iconSize == "md" },
    { "h-6 w-6": iconSize == "lg" },
  );

  const clsxSizeETH = clsx(
    { "h-3 w-3": iconSize == "sm" },
    { "h-5 w-5": iconSize == "md" },
    { "h-6 w-6": iconSize == "lg" },
  );

  return (
    <div className={classes}>
      {currency == token[0].address && (
        <Image src={EthSVG} alt="" className={clsxSizeETH} />
      )}
      {currency == token[1].address && (
        <Image src={StrkSVG} alt="" className={clsxSize} />
      )}
      <p>{handleFormatPrice(price)}</p>
    </div>
  );
};

const FormatPriceWithIcon: React.FC<IFormatPriceProps> = (props) => {
  const {
    price,
    currency = token[0].address,
    className,
    size = "md",
    iconSize = "sm",
  } = props;

  const classes = clsx("flex items-center gap-1 font-bold", className, {
    "text-sm": size == "sm",
    "text-md": size == "md",
    "text-2xl": size == "lg",
    "text-[36px]": size == "big",
  });

  const handleFormatPrice = (price?: number) => {
    if (price == 0 || !price || price == undefined) {
      return "-";
    } else if (price < 0.00001) {
      return "<0.00001";
    } else return parseFloat(Number(price).toFixed(5).toString());
  };

  const clsxSize = clsx(
    "mr-[0.15rem]",
    { "h-4 w-4": iconSize == "sm" },
    { "h-5 w-5": iconSize == "md" },
    { "h-7 w-7": iconSize == "lg" },
  );

  const clsxSizeETH = clsx(
    { "h-4 w-4": iconSize == "sm" },
    { "h-5 w-5": iconSize == "md" },
    { "h-7 w-7": iconSize == "lg" },
  );

  return (
    <div className={classes}>
      {currency == token[0].address && (
        <Image src={EthSVG} alt="" className={clsxSizeETH} />
      )}
      {currency == token[1].address && (
        <Image src={StrkSVG} alt="" className={clsxSize} />
      )}
      <p>{handleFormatPrice(price)}</p>
    </div>
  );
};

export default FormatPrice;
export { FormatPriceWithIcon, FormatPrice };
