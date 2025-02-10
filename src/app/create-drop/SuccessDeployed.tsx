import Button from "@/packages/@ui-kit/Button";
import ImageKit from "@/packages/@ui-kit/Image";
import { useCreateDrop } from "@/services/providers/CreateDropProvider";

const SuccessDeployed = () => {
  const { allState, setAllState } = useCreateDrop();

  return (
    <div className="flex h-fit w-[700px] max-w-full flex-col gap-6 rounded-lg border-2 border-border px-5 py-8">
      <div className="flex flex-col text-center">
        <p className="text-[24px] font-bold uppercase leading-[30px]">
          Successfully Deployed
        </p>
        <p className="text-base leading-5 text-gray">
          Your Drop has been deployed
        </p>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4 border border-border p-5 max-sm:flex-col">
          <div className="aspect-square w-full max-w-[95px] overflow-hidden">
            <ImageKit
              className="h-full w-full"
              src={allState?.imagePreview || ""}
            />
          </div>
          <div className="flex w-full flex-col gap-2 text-base font-bold leading-5">
            <p className="uppercase text-[#F9FAFB]">
              {allState?.tokenName || "-"}
            </p>
            <div className="flex w-full justify-between">
              <p className="text-[#9CA3AF]">Token symbol:</p>
              <p className="text-right">{allState?.tokenSymbol || "-"}</p>
            </div>
            <div className="flex w-full justify-between">
              <p className="text-[#9CA3AF]">Base URI:</p>
              <p className="max-w-[150px] truncate text-primary">
                {allState.base_uri}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-1 border-b border-border  pb-3 text-[20px] font-bold leading-6">
            <p className="uppercase ">Metadata</p>
            <p>(3)</p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-1 flex-col gap-1 border border-border px-4 py-2 text-base font-bold uppercase leading-5">
              <p className="line-clamp-1 text-gray">Name</p>
              <p className="line-clamp-1">{allState?.metadata1 || "-"}</p>
            </div>
            <div className="flex flex-1 flex-col gap-1 border border-border px-4 py-2 text-base font-bold uppercase leading-5">
              <p className="line-clamp-1 text-gray">Rarity</p>
              <p className="line-clamp-1">{allState?.metadata2 || "-"}</p>
            </div>
            <div className="flex flex-1 flex-col gap-1 border border-border px-4 py-2 text-base font-bold uppercase leading-5">
              <p className="line-clamp-1 text-gray">Drop amount</p>
              <p className="line-clamp-1">{allState?.metadata3 || "-"}</p>
            </div>
          </div>
        </div>
        <Button
          title="Next"
          className="h-fit w-full rounded-none py-3 capitalize"
          onClick={() =>
            setAllState((prev) => ({
              ...prev,
              activeStep: prev.activeStep + 1,
            }))
          }
        />
      </div>
    </div>
  );
};

export default SuccessDeployed;
