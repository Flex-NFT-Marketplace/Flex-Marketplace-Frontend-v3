// Step1.tsx
import React, { useEffect, ChangeEvent, useState } from "react";
import { FiUpload } from "react-icons/fi";
import Input from "@/packages/@ui-kit/Input";
import ImageKit from "@/packages/@ui-kit/Image";
import Button from "@/packages/@ui-kit/Button";
import { useCreateDrop } from "./page";
import { useModal } from "@/packages/@ui-kit/Modal/useModal";
import SuccessDeployed from "./SuccessDeployed";
import { useToast } from "@/packages/@ui-kit/Toast/ToastProvider";
import ModelV2 from "@/packages/@ui-kit/Modal/ModelV2";
import Select from "react-select";

const Step1 = () => {
  const { allState, setAllState } = useCreateDrop();
  const [invalidFields, setInvalidFields] = useState<string[]>([]);
  const { isShow: isShowSuccess, toggle: toggleSuccess } = useModal();
  const { onShowToast } = useToast();

  const options = [
    { value: "", label: "Choose" },
    { value: "Common", label: "Common" },
    { value: "Uncommon", label: "Uncommon" },
    { value: "Rare", label: "Rare" },
    { value: "Epic", label: "Epic" },
    { value: "Legendary", label: "Legendary" },
  ];

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: "black",
      boxShadow: state.isFocused ? "0 0 0 0px #FFE720" : "none",
      borderColor: state.isFocused ? "#FFE720" : "#3A3A3C",
      "&:hover": {
        borderColor: state.isFocused ? "#FFE720" : "#3A3A3C",
      },
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "white",
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: "black",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#171921" : "black",
      color: "white",
      "&:active": {
        backgroundColor: "#3A3A3C",
      },
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: "#929292",
      "&:hover": {
        color: "#FFE720",
      },
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  };

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

  const handleDeploy = () => {
    console.log(123);

    const missingFields: string[] = [];

    if (!allState.tokenName.trim()) missingFields.push("tokenName");
    if (!allState.tokenSymbol.trim()) missingFields.push("tokenSymbol");
    if (!allState.fileNftImage) missingFields.push("fileNftImage");
    if (!allState.nftDescription.trim()) missingFields.push("nftDescription");
    if (!allState.metadata1.trim()) missingFields.push("metadata1");
    if (!allState.metadata2.trim()) missingFields.push("metadata2");
    if (!allState.metadata3) missingFields.push("metadata3");

    if (missingFields.length > 0) {
      setInvalidFields(missingFields);
      onShowToast("Please fill in all required fields");
      return;
    }

    toggleSuccess();
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
    <div className="mx-auto flex max-w-[1200px] animate-fade flex-col gap-8 px-2">
      <ModelV2
        isShow={isShowSuccess}
        hide={() => {
          return;
        }}
      >
        <SuccessDeployed />
      </ModelV2>
      <div>
        <p className="text-[32px] font-bold uppercase">{`Let's Deploy the Drop`}</p>
        <p className="text-grays">
          {`You’ll need to deploy an ERC-1155 contract onto the blockchain before you can create a drop`}
        </p>
      </div>

      <div className="flex max-w-[678px] flex-col gap-6">
        {/* Token Name and Symbol */}
        <div className="flex gap-5">
          <div className="flex-1">
            <p className="font-bold">
              Token Name <span className="text-cancel">*</span>
            </p>
            <Input
              name="tokenName"
              placeholder="Shark is here"
              classContainer={`mt-2 !max-w-full ${
                invalidFields.includes("tokenName") ? "animate-shake" : ""
              }`}
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
              classContainer={`mt-2 ${
                invalidFields.includes("tokenSymbol") ? "animate-shake" : ""
              }`}
              value={allState.tokenSymbol}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* NFT Image */}
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
                  className="h-full w-full object-cover"
                />
              ) : (
                <FiUpload className="text-xl text-gray-400" />
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
              <p className="font-bold text-white">Click to upload</p>
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

        {/* Description */}
        <div>
          <p className="font-bold">
            Description <span className="text-cancel">*</span>
          </p>
          <div className="mt-2 rounded-md border border-line px-5 py-2.5 hover:border-primary focus:border-primary">
            <textarea
              name="nftDescription"
              className={`mt-2 h-[76px] w-full resize-none bg-transparent outline-none placeholder:font-normal placeholder:text-white/50 ${
                invalidFields.includes("nftDescription") ? "animate-shake" : ""
              }`}
              placeholder="Input drop description"
              value={allState.nftDescription}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Metadata */}
        <div>
          <p className="font-bold">
            Metadata <span className="text-cancel">*</span>
          </p>
          <div className="mt-2 flex flex-col gap-2 max-sm:gap-4">
            {/* Metadata #1 */}
            <div className="flex max-sm:flex-col max-sm:gap-2 sm:items-center">
              <p className="w-[233px] text-grays">Metadata #1 - Name:</p>
              <Input
                name="metadata1"
                placeholder="Input"
                classContainer={`!max-w-full flex-1 ${
                  invalidFields.includes("metadata1") ? "animate-shake" : ""
                }`}
                value={allState.metadata1}
                onChange={handleChange}
              />
            </div>

            <div className="flex max-sm:flex-col max-sm:gap-2 sm:items-center relative">
              <p className="w-[233px] text-grays">Metadata #2 - Rarity:</p>
              <div className="flex-1">
                <Select
                  options={options}
                  value={options.find(
                    (option) => option.value === allState.metadata2
                  )}
                  onChange={(selectedOption) => {
                    setAllState((prevState) => ({
                      ...prevState,
                      metadata2: selectedOption ? selectedOption.value : "",
                    }));
                  }}
                  styles={customStyles}
                  placeholder="Choose"
                />
                {invalidFields.includes("metadata2") && (
                  <p className="mt-1 text-red-500 text-sm">
                    This field is required.
                  </p>
                )}
              </div>
            </div>

            {/* Metadata #3 */}
            <div className="flex max-sm:flex-col max-sm:gap-2 sm:items-center">
              <p className="w-[233px] text-grays">Metadata #3 - Drop Amount:</p>
              <Input
                name="metadata3"
                type="number"
                placeholder="Input"
                classContainer={`!max-w-full flex-1 ${
                  invalidFields.includes("metadata3") ? "animate-shake" : ""
                }`}
                value={allState.metadata3}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
      <Button
        id="btnStep1"
        title="Deploy"
        onClick={handleDeploy}
        className="hidden"
      />
    </div>
  );
};

export default Step1;
