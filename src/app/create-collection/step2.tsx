import React, { useEffect, ChangeEvent, useState } from "react";
import Input from "@/packages/@ui-kit/Input";
import Button from "@/packages/@ui-kit/Button";
import { useCreateCollection } from "@/services/providers/CreateCollectionProvider";
import { useToast } from "@/packages/@ui-kit/Toast/ToastProvider";
import { isValidURL } from "@/utils/string";
import { toast } from "react-toastify";
const Step2 = () => {
  const { allState, setAllState } = useCreateCollection();
  const [invalidFields, setInvalidFields] = useState<string[]>([]);
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
    const missingFields: string[] = [];

    if (allState.website?.trim() && !isValidURL(allState.website?.trim())) {
      toast("Website link is invalid");
      return;
    }
    if (allState.xAccount?.trim() && !isValidURL(allState.xAccount?.trim())) {
      toast("X account is invalid");
      return;
    }
    if (allState.discord?.trim() && !isValidURL(allState.discord?.trim())) {
      toast("Discord is invalid");
      return;
    }
    if (
      allState.warpcastProfile?.trim() &&
      !isValidURL(allState.warpcastProfile?.trim())
    ) {
      toast("Warpcast profile is invalid");
      return;
    }

    if (!allState.projectName.trim()) missingFields.push("projectName");
    if (!allState.description.trim()) missingFields.push("description");

    if (missingFields.length > 0) {
      setInvalidFields(missingFields);
      toast("Please fill in all required fields");
      return;
    }
    setAllState((prev) => ({
      ...prev,
      activeStep: prev.activeStep + 1,
    }));
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
    <div className="mx-auto flex h-full max-w-[1200px] animate-fade flex-col justify-between gap-8 px-2 py-10">
      <div className="flex flex-col gap-8">
        <div>
          <p className="text-[32px] font-bold uppercase">{`Secondly, it’s about project info`}</p>
          <p className="text-grays">
            {`Provide project information to stand out from the crowd`}
          </p>
        </div>

        <div className="flex w-full flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="font-bold">
              Project name<span className="ml-1 text-cancel">*</span>
            </p>
            <Input
              className=""
              name="projectName"
              value={allState.projectName || ""}
              placeholder="Shark is here"
              onChange={handleChange}
              classContainer={`!max-w-full ${invalidFields.includes("projectName") ? "animate-shake" : ""}`}
            />
          </div>
          <div className="flex w-full gap-4 max-md:flex-col">
            <div className="flex w-full flex-col gap-2">
              <p className="font-bold">Website</p>
              <Input
                className=""
                placeholder="Input link"
                name="website"
                value={allState.website || ""}
                onChange={handleChange}
                classContainer={`!max-w-full`}
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <p className="font-bold">X account</p>
              <Input
                className=""
                name="xAccount"
                value={allState.xAccount || ""}
                placeholder="Input link"
                onChange={handleChange}
                classContainer={`!max-w-full`}
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <p className="font-bold">Discord</p>
              <Input
                className=""
                name="discord"
                value={allState.discord || ""}
                placeholder="Input link"
                onChange={handleChange}
                classContainer={`!max-w-full`}
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <p className="font-bold">Warpcast profile</p>
              <Input
                className=""
                name="warpcastProfile"
                value={allState.warpcastProfile || ""}
                onChange={handleChange}
                placeholder="Input link"
                classContainer={`!max-w-full`}
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-2">
            <p className="font-bold">
              Project description<span className="ml-1 text-cancel">*</span>
            </p>
            <Input
              className=""
              name="description"
              value={allState.description}
              onChange={handleChange}
              placeholder="Input collection description"
              classContainer={`!max-w-full ${invalidFields.includes("description") ? "animate-shake" : ""}`}
            />
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 flex w-full justify-end gap-2">
        <Button
          title="Back"
          className=" border-primary px-8 py-1.5 capitalize"
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
          className=" border-primary px-8 py-1.5 capitalize"
          onClick={handleDeploy}
        />
      </div>
    </div>
  );
};

export default Step2;
