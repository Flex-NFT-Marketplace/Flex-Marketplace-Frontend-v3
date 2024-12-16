import Button from "@/packages/@ui-kit/Button";
import ImageKit from "@/packages/@ui-kit/Image";
import { PiArrowsVerticalFill } from "react-icons/pi";
import { useCreateCollection } from "./page";
import { ChangeEvent } from "react";
import { useToast } from "@/packages/@ui-kit/Toast/ToastProvider";

const Step3 = () => {
  const { allState, setAllState } = useCreateCollection();
  const { onShowToast } = useToast();

  const addStraits = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAllState((prevState) => ({
        ...prevState,
        listStraits: [...prevState.listStraits, file],
      }));
    }
  };

  const handleDeploy = () => {
    if (!allState.listStraits.length) {
      onShowToast("Please upload straits");
      return;
    }

    setAllState((prev) => ({
      ...prev,
      activeStep: prev.activeStep + 1,
    }));
  };
  return (
    <div className="mx-auto flex h-full max-w-[1200px] animate-fade gap-8 px-2 max-lg:flex-col">
      <div className="flex-1 pt-10 lg:overflow-auto">
        <p className="text-[32px] font-bold uppercase">{`Thirdly, adding straits is crucial`}</p>
        <p className="text-grays">
          {`Upload each image as NFT and then set-up traits for each.`}
        </p>
        <p className="mt-6 text-2xl font-bold uppercase">uploaded: 1,256</p>
        <div className="mt-6 grid grid-cols-3 gap-5">
          <div className="flex aspect-square flex-col items-center justify-center rounded border border-dashed border-line px-5">
            <p className="text-center font-bold">PNG, GIF, WEBP Max 1mb.</p>
            <label
              htmlFor="uploadStraits"
              className="mt-4 w-full cursor-pointer rounded-lg border border-primary py-2 text-center text-primary transition-all hover:bg-line active:scale-95"
            >
              Upload file
            </label>
            <input
              onChange={addStraits}
              id="uploadStraits"
              type="file"
              className="hidden"
            />
          </div>
          {allState.listStraits?.map((item, index) => (
            <div
              key={index}
              className="group relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded border border-transparent transition-all hover:border-primary"
            >
              <ImageKit
                src={URL.createObjectURL(item) || ""}
                className="rounded"
              />
              <Button
                title="View"
                className="absolute bottom-4 left-1/2 w-[80%] -translate-x-1/2 opacity-0 transition-all group-hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="relative flex h-full flex-col justify-between border-y-0 border-line lg:max-w-[400px] lg:border">
        <div>
          <div className="border-b border-line px-6 py-4">
            <p className="font-bold uppercase">trait management</p>
          </div>
          <div className="p-6">
            <div className="rounded border border-line p-4">
              <p>
                Users are required to upload the file excel to map the metadata
                and NFT image.
                <br />
                <br />
                Please follow the{" "}
                <span className="cursor-pointer text-[#63B1FF] hover:underline">
                  Guideline
                </span>
                .
              </p>
            </div>
            <div className="mt-6 rounded border border-line p-4">
              <div className="flex">
                <p className="w-20 text-grays">Type:</p>
                <div className="flex flex-1 items-center justify-between">
                  <p>Outwear</p>
                  <PiArrowsVerticalFill className="rotate-45" />
                </div>
              </div>
              <div className="mt-3 flex items-center">
                <p className="w-20 text-grays">Type:</p>
                <div className="flex flex-1 items-center gap-1 overflow-auto">
                  {Array.from({ length: 5 }, (_, index) => (
                    <div key={index} className="rounded bg-white/15 px-3 py-1">
                      <p>Hoodie</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 rounded border border-line p-4">
              <div className="flex">
                <p className="w-20 text-grays">Type:</p>
                <div className="flex flex-1 items-center justify-between">
                  <p>Outwear</p>
                  <PiArrowsVerticalFill className="rotate-45" />
                </div>
              </div>
              <div className="mt-3 flex items-center">
                <p className="w-20 text-grays">Type:</p>
                <div className="flex flex-1 items-center gap-1 overflow-auto">
                  {Array.from({ length: 5 }, (_, index) => (
                    <div key={index} className="rounded bg-white/15 px-3 py-1">
                      <p>Hoodie</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Button
              title="Upload file excel"
              variant="outline"
              className="mt-5 w-full border-white text-white"
            />
          </div>
        </div>
        <div className="bottom-10 flex w-full justify-center gap-2 lg:sticky">
          <Button
            title="Back"
            className="rounded-none border-primary px-8 py-1.5 capitalize"
            variant="outline"
            onClick={() =>
              setAllState((prev) => ({
                ...prev,
                activeStep: prev.activeStep - 1,
              }))
            }
          />
          <Button
            title="Next"
            className="rounded-none border-primary px-8 py-1.5 capitalize"
            onClick={handleDeploy}
          />
        </div>
      </div>
    </div>
  );
};

export default Step3;
