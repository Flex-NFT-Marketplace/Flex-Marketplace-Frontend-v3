import { FormatPriceWithIcon } from "@/components/FormatPrice";
import Button from "@/lib/@core/Button";
import ImageKit from "@/packages/@ui-kit/Image";
import { useRouter } from "next/navigation";
import { FaFire } from "react-icons/fa6";

interface OpenEditionsCardProps {
  openEdition: any;
}

const OpenEditionsCard: React.FC<OpenEditionsCardProps> = ({ openEdition }) => {
  return (
    <div
      className="flex w-[262px] cursor-pointer flex-col justify-between rounded border-2 border-stroke bg-[#080804] transition-all hover:border-white"
      onClick={() => {
        window.open(
          "https://beta-open-editions.hyperflex.market/open-edition/" +
            openEdition?.nftCollection?.nftContract,
          "none",
        );
      }}
    >
      <div className="relative aspect-square w-full">
        {/* <div className="absolute right-2 top-2 flex items-center gap-2 rounded-sm bg-[#171921bf] p-2">
          <div className="h-1 w-1 rounded-full bg-primary"></div>
          <p>Expires 6D 12H</p>
        </div> */}
        <ImageKit
          src={openEdition?.nftCollection?.avatar}
          alt=""
          className="h-full max-h-[258px] w-full rounded-tl-sm rounded-tr-sm"
        />
      </div>

      <div className="flex flex-col gap-2 px-4 py-3">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold">
          {openEdition?.nftCollection?.name}
        </p>
        <div className="flex">
          <div className="flex w-1/2 flex-col">
            <p className="text-grays">Supply</p>
            <p>Unlimited</p>
          </div>
          <div className="flex w-1/2 flex-col pl-4">
            <p className="text-grays">Price</p>
            {/* {openEdition?.mintPrice == 0 ? (
              "Free"
            ) : (
              <FormatPriceWithIcon price={openEdition?.mintPrice} />
            )} */}
            -
          </div>
        </div>

        {/* <div className="flex items-center justify-between">
          <Button
            className="w-full"
            onClick={() => {
              window.open(
                "https://beta-open-editions.hyperflex.market/open-edition/" +
                openEdition?.nftCollection?.nftContract,
                "_self",
              );
            }}
            title="Mint"
          />
        </div> */}
      </div>
    </div>
  );
};

export default OpenEditionsCard;
