import ImageKit from "@/packages/@ui-kit/Image";
import arrow from "../../../public/arrow.png";
import Button from "@/packages/@ui-kit/Button";
const TraitManagement = () => {
  return (
    <div className="mx-auto flex w-full max-w-[718px] flex-col gap-6 px-5 py-8">
      <div className="flex w-full flex-col text-center">
        <p className="text-[24px] font-bold uppercase leading-[30px]">
          Trait management
        </p>
        <p className="text-base leading-5 text-gray">
          Each type can have numerous sub-type
        </p>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex w-full border border-border px-3 py-1.5">
            <p className="min-w-[68px] text-base leading-5 text-gray">Type:</p>
            <p>Outwear</p>
          </div>
          <div className="flex gap-2">
            <ImageKit className="w-[72px]" src={arrow.src} />
            <div className="flex w-full border border-border px-3 py-1.5">
              <p className="text-base leading-5 text-gray">Type:</p>
              <p>Outwear</p>
            </div>
          </div>
          <div className="flex gap-2">
            <ImageKit className="w-[72px]" src={arrow.src} />
            <div className="flex w-full border border-border px-3 py-1.5">
              <p className="text-base leading-5 text-gray">Type:</p>
              <p>Outwear</p>
            </div>
          </div>
        </div>
        <Button
          className="w-full rounded-none border-primary"
          variant="outline"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
export default TraitManagement;
