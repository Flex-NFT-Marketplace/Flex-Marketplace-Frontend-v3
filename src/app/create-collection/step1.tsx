// Step1.tsx
import React, { useEffect, ChangeEvent, useState } from "react";
import Input from "@/packages/@ui-kit/Input";
import Button from "@/packages/@ui-kit/Button";
import { useCreateCollection } from "./page";
import { useToast } from "@/packages/@ui-kit/Toast/ToastProvider";
import { FiUpload } from "react-icons/fi";
import ImageKit from "@/packages/@ui-kit/Image";
import { PiWarningCircle } from "react-icons/pi";
import { FaCheck } from "react-icons/fa";
import { useAccount } from "@starknet-react/core";

const Step1 = () => {
  const { allState, setAllState } = useCreateCollection();
  const [invalidFields, setInvalidFields] = useState<string[]>([]);
  const { address } = useAccount();
  const { onShowToast } = useToast();
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;

    if (target instanceof HTMLInputElement) {
      if (target.type === "file") {
        const file = target.files ? target.files[0] : null;
        setAllState((prevState) => ({
          ...prevState,
          [target.name]: file,
        }));

        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setAllState((prevState) => ({
              ...prevState,
              imagePreview: reader.result as string,
            }));
          };
          reader.readAsDataURL(file);
        } else {
          setAllState((prevState) => ({
            ...prevState,
            imagePreview: null,
          }));
        }
      } else {
        const value =
          target.type === "number" ? Number(target.value) : target.value;
        setAllState((prevState) => ({
          ...prevState,
          [target.name]: value,
        }));
      }
    } else if (
      target instanceof HTMLTextAreaElement ||
      target instanceof HTMLSelectElement
    ) {
      setAllState((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    }
  };

  const handleToggleFreeEarnings = () => {
    setAllState((prev) => ({
      ...prev,
      isFreeEarnings: !prev.isFreeEarnings,
    }));
  };

  const handleChangeCreatorEarnings = (e: ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value))) {
      return;
    }
    if (Number(e.target.value) < 0) {
      allState.creatorEarnings = 0;
    } else if (Number(e.target.value) > 100) {
      allState.creatorEarnings = 100;
    } else {
      allState.creatorEarnings = Number(e.target.value);
    }

    setAllState((prev) => ({
      ...prev,
      creatorEarnings: allState.creatorEarnings,
    }));
  };

  const handleToggleReciverWallet = () => {
    if (!address) return;

    if (!allState.isSelfReceiverWallet) {
      setAllState((prev) => ({
        ...prev,
        isSelfReceiverWallet: !prev.isSelfReceiverWallet,
        receiverWallet: address,
      }));
      return;
    }
    setAllState((prev) => ({
      ...prev,
      isSelfReceiverWallet: !prev.isSelfReceiverWallet,
    }));
  };

  const handleReciverWallet = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAllState((prev) => ({
      ...prev,
      receiverWallet: value,
    }));
  };

  const handleDeploy = () => {
    const missingFields: string[] = [];

    if (!allState.tokenName.trim()) missingFields.push("tokenName");
    if (!allState.tokenSymbol.trim()) missingFields.push("tokenSymbol");
    if (!allState.fileNftImage) missingFields.push("fileNftImage");
    if (!allState.receiverWallet && !allState.isSelfReceiverWallet)
      missingFields.push("receiverWallet");
    if (!allState.creatorEarnings && !allState.isFreeEarnings)
      missingFields.push("creatorEarnings");

    if (missingFields.length > 0) {
      setInvalidFields(missingFields);
      onShowToast("Please fill in all required fields");
      return;
    }
    setAllState((prev) => ({
      ...prev,
      activeStep: prev.activeStep + 1,
    }));
    return;
  };

  useEffect(() => {
    if (invalidFields.length > 0) {
      const timer = setTimeout(() => {
        setInvalidFields([]);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [invalidFields]);

  return (
    <div className="mx-auto flex h-full max-w-[1200px] flex-1 animate-fade flex-col justify-between gap-8 px-2 py-10">
      <div className="flex flex-col gap-8">
        <div>
          <p className="text-[32px] font-bold uppercase">{`Let's Deploy the Drop`}</p>
          <p className="text-grays">
            {`You’ll need to deploy an ERC-1155 contract onto the blockchain before you can create a drop`}
          </p>
        </div>

        <div className="flex max-w-[678px] flex-col gap-6">
          <div className="flex gap-5">
            <div className="flex-1">
              <p className="font-bold">
                Token Name <span className="text-cancel">*</span>
              </p>
              <Input
                name="tokenName"
                placeholder="Shark is here"
                classContainer={`mt-2 !max-w-full ${invalidFields.includes("tokenName") ? "animate-shake" : ""}`}
                value={allState.tokenName}
                onChange={handleChange}
              />
            </div>

            <div className="max-sm:flex-1 sm:max-w-[212px]">
              <p className="font-bold">
                Token Symbol <span className="text-cancel">*</span>
              </p>
              <Input
                name="tokenSymbol"
                placeholder="SHARK"
                classContainer={`mt-2 !max-w-full ${invalidFields.includes("tokenSymbol") ? "animate-shake" : ""}`}
                value={allState.tokenSymbol}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <p className="font-bold">
              NFT Image <span className="text-cancel">*</span>
            </p>
            <div className="mt-2 flex items-center gap-4 rounded-md border border-line px-5 py-6">
              <label
                htmlFor="nftImage"
                className="grid aspect-square h-[72px] w-[72px] cursor-pointer place-items-center overflow-hidden rounded-md border border-line"
              >
                {allState.imagePreview ? (
                  <ImageKit
                    src={allState.imagePreview}
                    alt="NFT Image"
                    className="h-full w-full"
                  />
                ) : (
                  <FiUpload className="text-xl" />
                )}
                <input
                  type="file"
                  id="nftImage"
                  name="fileNftImage"
                  accept="image/*"
                  className="hidden"
                  onChange={handleChange}
                />
              </label>
              <div>
                <p className="font-bold">Click to upload</p>
                <p className="mt-2 text-grays">
                  Recommend size: 512 x 512. File types: JPEG, PNG, SVG, GIF
                </p>
                {allState.fileNftImage && (
                  <p className="mt-2 text-green-500">
                    Selected File: {allState.fileNftImage.name}
                  </p>
                )}
                {invalidFields.includes("fileNftImage") && (
                  <p className="mt-2 text-red-500">This field is required.</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p>
                  % Creator earnings <span className="text-cancel">*</span>{" "}
                  <PiWarningCircle className="inline-block" />
                </p>
                <div className="flex items-center gap-3">
                  <div
                    onClick={handleToggleFreeEarnings}
                    className={`grid aspect-square h-[15px] cursor-pointer place-items-center rounded-sm border-2 border-primary p-[1px]`}
                  >
                    {allState.isFreeEarnings && (
                      <FaCheck className="h-full w-full border-primary text-primary" />
                    )}
                  </div>
                  <p className="font-bold text-grays">Free-mint</p>
                </div>
              </div>
              <div
                className={`mt-2 flex items-center justify-between rounded-md border border-line bg-background px-3  ${invalidFields.includes("creatorEarnings") && !allState.creatorEarnings && "animate-shake"}`}
              >
                <Input
                  value={allState.creatorEarnings}
                  placeholder="0"
                  className="border-none !p-0"
                  classContainer={`!max-w-full w-full ${allState.isFreeEarnings && "pointer-events-none opacity-50"}`}
                  onChange={(e: any) => handleChangeCreatorEarnings(e)}
                />
                <p className="whitespace-nowrap text-grays">| ETH</p>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p>
                  Receiver wallet <span className="text-cancel">*</span>{" "}
                  <PiWarningCircle className="inline-block" />
                </p>
                <div className="flex items-center gap-3">
                  <div
                    onClick={handleToggleReciverWallet}
                    className={`grid aspect-square h-[15px] cursor-pointer place-items-center rounded-sm border-2 border-primary p-[1px]`}
                  >
                    {allState.isSelfReceiverWallet && (
                      <FaCheck className="h-full w-full border-primary text-primary" />
                    )}
                  </div>
                  <p className="font-bold text-grays">Self</p>
                </div>
              </div>
              <div
                className={`mt-2 flex items-center justify-between rounded-md border border-line bg-background px-3  ${invalidFields.includes("receiverWallet") && !allState.isSelfReceiverWallet && "animate-shake"}`}
              >
                <Input
                  value={allState.receiverWallet || ""}
                  placeholder="0"
                  className="border-none !p-0"
                  classContainer={`!max-w-full w-full ${allState.isSelfReceiverWallet && "pointer-events-none opacity-50"}`}
                  onChange={handleReciverWallet}
                />
                <p className="whitespace-nowrap text-grays">| ETH</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-5"></div>
      </div>

      <div className="sticky bottom-0 flex justify-end">
        <Button
          id="btnStep1"
          className="border-primary !px-20 py-1.5 !font-bold capitalize"
          title="Deploy"
          onClick={handleDeploy}
        />
      </div>
    </div>
  );
};

export default Step1;
