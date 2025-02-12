import Button from "@/packages/@ui-kit/Button";
import ImageKit from "@/packages/@ui-kit/Image";
import { PiArrowsVerticalFill } from "react-icons/pi";

import { ChangeEvent, useState } from "react";
import { useToast } from "@/packages/@ui-kit/Toast/ToastProvider";
import { IoClose, IoCloseCircleOutline } from "react-icons/io5";
import AddType from "./AddType";
import ModelV2 from "@/packages/@ui-kit/Modal/ModelV2";
import useModal from "@/hooks/useModal";
import EditType from "./EditType";
import { GoCheckCircle } from "react-icons/go";
import ViewNFT from "./ViewNFT";
import EditNFT from "./EditNFT";
import {
  NftTrait,
  TraitManager,
  useCreateCollection,
} from "@/services/providers/CreateCollectionProvider";

const Step3 = () => {
  const { allState, setAllState } = useCreateCollection();
  const { onShowToast } = useToast();
  const { isOpen: isOpenAddType, toggleModal: toggleAddType } = useModal();
  const { isOpen: isOpenEditType, toggleModal: toggleEditType } = useModal();
  const { isOpen: isOpenViewNFT, toggleModal: toggleViewNFT } = useModal();
  const { isOpen: isOpenEditNFT, toggleModal: toggleEditNFT } = useModal();
  const [editTraitSelected, setEditTraitSelected] = useState<
    TraitManager | undefined
  >();
  const [nftViewing, setNftViewing] = useState<NftTrait | undefined>();
  const [nftEditing, setNftEditing] = useState<NftTrait | undefined>();

  const addStraits = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const maxSizeInBytes = 1 * 1024 * 1024;

      if (file.size > maxSizeInBytes) {
        onShowToast("File is larger than 1MB");
        return;
      }

      setAllState((prevState) => ({
        ...prevState,
        listStraits: [...allState.listStraits, { image: file, traits: [] }],
      }));
      e.target.value = ""; // reset value
    }
  };

  const removeStraits = (indexRemove: number) => {
    const newStraits = allState.listStraits.filter(
      (item, index) => index != indexRemove
    );

    setAllState((preState) => ({
      ...preState,
      listStraits: newStraits,
    }));
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
      <ModelV2 isShow={isOpenAddType} hide={toggleAddType}>
        <AddType hide={toggleAddType} />
      </ModelV2>
      <ModelV2 isShow={isOpenEditType} hide={toggleEditType}>
        <EditType trait={editTraitSelected} hide={toggleEditType} />
      </ModelV2>
      <ModelV2 isShow={isOpenViewNFT} hide={toggleViewNFT}>
        <ViewNFT nft={nftViewing} hide={toggleViewNFT} />
      </ModelV2>
      <ModelV2 isShow={isOpenEditNFT} hide={toggleEditNFT}>
        <EditNFT nft={nftEditing} hide={toggleEditNFT} />
      </ModelV2>
      <div className="flex-1 pt-10 lg:overflow-auto">
        <p className="text-[32px] font-bold uppercase">{`Thirdly, adding straits is crucial`}</p>
        <p className="text-grays">
          {`Upload each image as NFT and then set-up traits for each.`}
        </p>
        <p className="mt-6 text-2xl font-bold uppercase">
          uploaded: {allState.listStraits.length}
        </p>
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
              accept=".png, .gif, .webp"
            />
          </div>
          {allState.listStraits?.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setNftEditing(item);
                toggleEditNFT();
              }}
              className="cursor-pointer group relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded border border-transparent transition-all hover:border-primary"
            >
              {item.traits.length > 0 ? (
                <GoCheckCircle className="absolute top-4 left-4 text-buy text-2xl" />
              ) : (
                <IoCloseCircleOutline className="absolute top-4 left-4 text-cancel text-2xl" />
              )}

              <ImageKit
                src={URL.createObjectURL(item.image) || ""}
                className="rounded"
              />
              <IoClose
                onClick={(e) => {
                  e.stopPropagation();
                  removeStraits(index);
                }}
                className="absolute top-4 right-4 group-hover:block hidden text-2xl text-grays hover:text-white cursor-pointer"
              />
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setNftViewing(item);
                  toggleViewNFT();
                }}
              >
                <Button
                  title="View"
                  className="absolute bottom-4 left-1/2 w-[80%] -translate-x-1/2 opacity-0 transition-all group-hover:opacity-100"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-full relative flex h-full flex-col justify-between border-y-0 border-line lg:w-[400px] lg:border">
        <div>
          <div className="border-b border-line px-6 py-4">
            <p className="font-bold uppercase">trait management</p>
          </div>

          <div className="p-6 flex flex-col gap-4">
            {allState.traitManager.map((item, index) => {
              return (
                <div key={index} className="rounded border border-line p-4">
                  <div className="flex">
                    <p className="w-20 text-grays">Type:</p>
                    <div className="flex flex-1 items-center justify-between">
                      <p>{item.type}</p>
                      <div className="p-1 rounded aspect-square hover:bg-hover cursor-pointer">
                        <PiArrowsVerticalFill
                          className="rotate-45"
                          onClick={() => {
                            setEditTraitSelected(item);
                            toggleEditType();
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center">
                    <p className="w-20 text-grays">Sub-type:</p>
                    <div className="flex flex-1 items-center gap-1 flex-wrap">
                      {item.subType.map((subType, index) => (
                        <div
                          key={index}
                          className="rounded bg-white/15 px-3 py-1"
                        >
                          <p>{subType}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
            <Button
              onClick={toggleAddType}
              title="Add type"
              variant="primary"
              className="w-full"
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
