import flexlogo from "@/assets/logoFlexMarketplace.svg";
import ImageKit from "@/packages/@ui-kit/Image";

const FlexCreate = () => {
  return (
    <div className="fixed-height-under-header mx-auto flex max-w-[1200px] animate-fade flex-col gap-8 px-2">
      <div>
        <ImageKit src={flexlogo.src} alt="flex logo" />
      </div>
    </div>
  );
};

export default FlexCreate;
