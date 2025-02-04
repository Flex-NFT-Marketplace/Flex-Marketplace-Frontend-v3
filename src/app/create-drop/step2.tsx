import ImageKit from "@/packages/@ui-kit/Image";
import Input from "@/packages/@ui-kit/Input";
import { FaCalendarAlt, FaCheck } from "react-icons/fa";
import { DropTypeEnum, SetsTypeEnum, useCreateDrop } from "./page";
import { ChangeEvent, MouseEventHandler, useEffect, useState } from "react";
import Button from "@/packages/@ui-kit/Button";
import { useToast } from "@/packages/@ui-kit/Toast/ToastProvider";
import { IoIosArrowDown } from "react-icons/io";
import { IDrop, IGroupMultiple } from "@/types/ICollection";
import useModal from "@/hooks/useModal";
import ModelV2 from "@/packages/@ui-kit/Modal/ModelV2";
import CreateGroup from "./CreateGroup";

const Step2 = () => {
  const { allState, setAllState } = useCreateDrop();
  const [invalidFields, setInvalidFields] = useState<string[]>([]);
  const { onShowToast } = useToast();

  // interal state
  const [isShowMultiple, setIsShowMultiple] = useState(false);
  const { isOpen: isOpenCreateGroup, toggleModal: toggleCreateGroup } =
    useModal();

  const backgroundColors: { [key: string]: string } = {
    common: "#d3d3d3",
    rare: "#add8e6",
    legendary: "#ffd700",
    ultimate: "#ff4500",
  };

  function getBackgroundColor(value: string) {
    return backgroundColors[value] || "transparent";
  }
  const handleCreate = () => {
    const missingFields: string[] = [];

    if (!allState.isCheckRandomly && !allState.isCheckSupporters) {
      missingFields.push("distributionType");
    }
    if (allState.isCheckSupporters && allState.amountSupporters <= 0) {
      missingFields.push("amountSupporters");
    }

    // Validate Drop Type
    if (!allState.dropType) {
      missingFields.push("dropType");
    }
    if (
      allState.dropType === DropTypeEnum.PROTECTED &&
      allState.amountDrop <= 0
    ) {
      missingFields.push("amountDrop");
    }

    // Validate Sets
    if (!allState.sets) {
      missingFields.push("sets");
    }
    // if (
    //   allState.sets === SetsTypeEnum.GROUP &&
    //   !allState.multipleDrops.trim()
    // ) {
    //   missingFields.push("multipleDrops");
    // }
    if (
      allState.sets === SetsTypeEnum.INDIVIDUAL &&
      !allState.individualDrops.trim()
    ) {
      missingFields.push("individualDrops");
    }

    console.log(missingFields);

    if (missingFields.length > 0) {
      setInvalidFields(missingFields);
      onShowToast("Please fill in all required fields");
      return;
    }

    // If all validations pass, proceed with the creation logic
    console.log("All validations passed. Proceeding with creation.");
  };

  useEffect(() => {
    if (invalidFields.length > 0) {
      const timer = setTimeout(() => {
        setInvalidFields([]);
      }, 1000); // Duration should match the CSS animation duration
      return () => clearTimeout(timer);
    }
  }, [invalidFields]);

  const MultipleDropdown: React.FC<{ groups: IGroupMultiple[] }> = ({
    groups,
  }) => {
    return (
      <div className="select-none absolute flex flex-col mt-2 left-0 top-full border border-border rounded-md p-4 w-full bg-black z-10 gap-8">
        {groups.length > 0 ? (
          groups?.map((group) => {
            return (
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <div className="h-4 w-4 bg-white rounded-full"></div>
                  <p>{group.dateTime}</p>
                </div>
                <div className="flex items-center gap-1">
                  <p>{group.drops.length} Drops</p>
                </div>
              </div>
            );
          })
        ) : (
          <p>There are no group!</p>
        )}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="h-4 w-4 bg-white rounded-full"></div>
            <p>qưd</p>
          </div>
          <div className="flex items-center gap-1">
            <p>qưdqwd</p>
          </div>
        </div>
        <div onClick={toggleCreateGroup} className="group">
          <Button
            title="Create New"
            variant="primary"
            className="w-full pointer-events-none group-hover:bg-primary group-hover:text-black"
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <ModelV2 isShow={isOpenCreateGroup} hide={toggleCreateGroup}>
        <CreateGroup hide={toggleCreateGroup} />
      </ModelV2>
      <div className="mx-auto flex max-w-[1200px] animate-fade flex-col gap-10 px-2">
        <div className="flex justify-between gap-10 max-md:flex-col max-md:items-center">
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-[32px] font-bold uppercase">{`Your choice to distribute the drop`}</p>
              <p className="text-grays">{`Your drop will be distributed randomly to your subscribers, or directly to TOP Supporters`}</p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-1 flex-col gap-2">
                <p className="font-bold">
                  Choose to distribute your Drop{" "}
                  <span className="text-cancel">*</span>
                </p>

                <div
                  className={`flex h-8 items-center gap-3 rounded-md border border-line px-5 ${invalidFields.includes("distributionType") && "animate-shake"}`}
                >
                  <div
                    onClick={() => {
                      setAllState((prevState) => ({
                        ...prevState,
                        isCheckRandomly: !allState.isCheckRandomly,
                      }));
                    }}
                    className={`grid aspect-square h-[15px] cursor-pointer place-items-center rounded-sm border-2 p-[1px] ${allState.isCheckRandomly ? "border-buy" : "border-grays"}`}
                  >
                    {allState.isCheckRandomly && (
                      <FaCheck className="h-full w-full text-buy" />
                    )}
                  </div>
                  <p className="font-bold">Randomly to subscribers</p>
                </div>
                <div
                  className={`flex h-8 items-center justify-between rounded-md border border-line px-5 ${invalidFields.includes("distributionType") && "animate-shake"}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      onClick={() => {
                        setAllState((prevState) => ({
                          ...prevState,
                          isCheckSupporters: !allState.isCheckSupporters,
                        }));
                      }}
                      className={`grid aspect-square h-[15px] cursor-pointer place-items-center rounded-sm border-2 p-[1px] ${allState.isCheckSupporters ? "border-buy" : "border-grays"}`}
                    >
                      {allState.isCheckSupporters && (
                        <FaCheck className="h-full w-full text-buy" />
                      )}
                    </div>
                    <p className="font-bold text-grays">To top supporters</p>
                  </div>
                  <div
                    className={`flex items-center ${allState.isCheckSupporters ? "opacity-100" : "opacity-0"} ${invalidFields.includes("amountSupporters") && "animate-shake"}`}
                  >
                    <p className="text-grays">Amount: |</p>
                    <Input
                      placeholder="Input numbers"
                      className="max-h-full w-[50px] border-none bg-transparent outline-none"
                      value={allState.amountSupporters}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        // if not a number, set to 0
                        if (isNaN(Number(e.target.value))) {
                          setAllState((prevState) => ({
                            ...prevState,
                            amountSupporters: 0,
                          }));
                          return;
                        }

                        setAllState((prevState) => ({
                          ...prevState,
                          amountSupporters: Number(e.target.value),
                        }));
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-2">
                <p className="font-bold">
                  Type of Drop <span className="text-cancel">*</span>
                </p>

                <div className="flex h-8 items-center gap-3 rounded-md border border-line px-5">
                  <div
                    onClick={() =>
                      setAllState((prevState) => ({
                        ...prevState,
                        dropType: DropTypeEnum.FREE,
                      }))
                    }
                    className="grid aspect-square h-[15px] place-items-center rounded-full border-2 border-buy p-[2px] cursor-pointer"
                  >
                    {allState.dropType == DropTypeEnum.FREE && (
                      <div className="h-full w-full rounded-full bg-buy"></div>
                    )}
                  </div>
                  <p className="font-bold">Free</p>
                </div>
                <div className="flex h-8 items-center justify-between rounded-md border border-line px-5">
                  <div className="flex items-center gap-3">
                    <div
                      onClick={() =>
                        setAllState((prevState) => ({
                          ...prevState,
                          dropType: DropTypeEnum.PROTECTED,
                        }))
                      }
                      className="grid aspect-square h-[15px] place-items-center rounded-full border-2 border-buy p-[2px] cursor-pointer"
                    >
                      {allState.dropType == DropTypeEnum.PROTECTED && (
                        <div className="h-full w-full rounded-full bg-buy"></div>
                      )}
                    </div>
                    <p className="font-bold text-grays">Protected</p>
                  </div>
                  <div
                    className={`flex items-center ${allState.dropType == DropTypeEnum.PROTECTED ? "opacity-100" : "opacity-0"} ${invalidFields.includes("amountDrop") && "animate-shake"}`}
                  >
                    <p className="text-grays">Amount: |</p>
                    <Input
                      placeholder="Input numbers"
                      className="max-h-full w-[50px] border-none bg-transparent outline-none"
                      value={allState.amountDrop}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        // if not a number, set to 0
                        if (isNaN(Number(e.target.value))) {
                          setAllState((prevState) => ({
                            ...prevState,
                            amountDrop: 0,
                          }));
                          return;
                        }

                        setAllState((prevState) => ({
                          ...prevState,
                          amountDrop: Number(e.target.value),
                        }));
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-2">
                <p className="font-bold">
                  Sets <span className="text-cancel">*</span>
                </p>

                <div className="flex gap-3 max-sm:flex-col sm:h-8 sm:items-center">
                  <div
                    onClick={() =>
                      setAllState((prevState) => ({
                        ...prevState,
                        sets: SetsTypeEnum.GROUP,
                      }))
                    }
                    className="flex w-[233px] items-center gap-3 cursor-pointer"
                  >
                    <div className="grid aspect-square h-[15px] place-items-center rounded-full border-2 border-buy p-[2px]">
                      {allState.sets == SetsTypeEnum.GROUP && (
                        <div className="h-full w-full rounded-full bg-buy"></div>
                      )}
                    </div>
                    <p className="font-bold">Group multiple drops:</p>
                  </div>
                  <div
                    tabIndex={0}
                    onBlur={() => setIsShowMultiple(false)}
                    className={`${allState.sets == SetsTypeEnum.INDIVIDUAL && "opacity-50 pointer-events-none"} flex border border-border flex-1 rounded-md items-center justify-between cursor-pointer relative`}
                  >
                    <div
                      onClick={() => setIsShowMultiple((prev) => !prev)}
                      className="flex items-center justify-between flex-1 px-3 py-2"
                    >
                      <p>
                        {allState.multipleDropsSelected
                          ? allState.multipleDropsSelected.dateTime
                          : "Choose"}
                      </p>
                      <IoIosArrowDown
                        className={`${isShowMultiple ? "rotate-180" : ""} transition-transform duration-200`}
                      />
                    </div>
                    {/* DropDown */}
                    {isShowMultiple && (
                      <div className="absolute left-0 top-full w-full z-10">
                        <MultipleDropdown groups={allState.multipleDrops} />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-3 max-sm:flex-col sm:h-8 sm:items-center">
                  <div
                    onClick={() =>
                      setAllState((prevState) => ({
                        ...prevState,
                        sets: SetsTypeEnum.INDIVIDUAL,
                      }))
                    }
                    className="flex w-[233px] items-center gap-3 cursor-pointer"
                  >
                    <div className="grid aspect-square h-[15px] place-items-center rounded-full border-2 border-buy p-[2px]">
                      {allState.sets == SetsTypeEnum.INDIVIDUAL && (
                        <div className="h-full w-full rounded-full bg-buy"></div>
                      )}
                    </div>
                    <p className="font-bold">Individually distribute:</p>
                  </div>
                  <div
                    className={`flex h-9 flex-1 cursor-pointer items-center justify-between rounded-md border border-border px-3 py-2 hover:border-primary ${allState.sets != SetsTypeEnum.INDIVIDUAL && "pointer-events-none opacity-50"}`}
                  >
                    <p className="font-normal text-white/50">Choose</p>
                    <FaCalendarAlt className="text-grays" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              borderColor: getBackgroundColor(allState.metadata2),
            }}
            className="rounded-md border border-dashed bg-dark-black p-4 max-md:w-fit"
          >
            <div className="relative">
              <ImageKit
                src={allState?.imagePreview || ""}
                className="aspect-square h-[300px] w-[300px] "
              />
              <div
                style={{
                  backgroundColor: getBackgroundColor(allState.metadata2),
                }}
                className="absolute bottom-0 right-2 translate-y-1/2 rounded border border-background px-3 py-1"
              >
                <p className="font-bold uppercase text-black">
                  {allState.metadata2}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <p className="font-bold">{allState?.tokenName || "-"}</p>
              <p className="mt-1 text-sm">Creator name</p>
            </div>
            <div className="mt-5 flex flex-col gap-1">
              <div className="rounded-md bg-[#232733] px-4 py-1 text-sm font-bold">
                <p className="text-grays">Name</p>
                <p>{allState.metadata1 || "-"}</p>
              </div>
              <div className="rounded-md bg-[#232733] px-4 py-1 text-sm font-bold">
                <p className="text-grays">Rarity</p>
                <p>{allState.metadata2 || "-"}</p>
              </div>
              <div className="rounded-md bg-[#232733] px-4 py-1 text-sm font-bold">
                <p className="text-grays">Amount</p>
                <p>{allState.metadata3 || "-"}</p>
              </div>
            </div>
          </div>
        </div>
        <Button
          id="btnStep2"
          title="Create"
          onClick={handleCreate}
          className="self-end !w-[150px]"
        />
      </div>
    </>
  );
};

export default Step2;
