import ImageKit from "@/packages/@ui-kit/Image";
import Input from "@/packages/@ui-kit/Input";
import { FaCalendarAlt, FaCheck } from "react-icons/fa";
import { ChangeEvent, useEffect, useState } from "react";
import Button from "@/packages/@ui-kit/Button";
import { useToast } from "@/packages/@ui-kit/Toast/ToastProvider";
import { IoIosArrowDown } from "react-icons/io";
import ModelV2 from "@/packages/@ui-kit/Modal/ModelV2";
import CreateGroup from "./CreateGroup";
import {
  DropTypeEnum,
  SetsTypeEnum,
  useCreateDrop,
} from "@/services/providers/CreateDropProvider";
import { RiShareBoxLine } from "react-icons/ri";
import CollectiblesInGroup from "./CollectiblesInGroup";
import { IDropGroup } from "@/types/Idrop";
import { useAccount } from "@starknet-react/core";
import { CallData, RpcProvider, uint256 } from "starknet";
import useModal from "@/hooks/useModal";
import SuccessCreated from "./SuccessCreated";
import { formatTimestamp } from "@/utils/string";

export const backgroundColors: { [key: string]: string } = {
  common: "#d3d3d3",
  rare: "#add8e6",
  legendary: "#ffd700",
  ultimate: "#ff4500",
};

export function getBackgroundColor(value: string) {
  return backgroundColors[value] || "transparent";
}

const Step2 = () => {
  const {
    allState,
    setAllState,
    groupDrop,
    handleAddCollectibleToGroup,
    handleCreateNewGroup,
  } = useCreateDrop();
  const [invalidFields, setInvalidFields] = useState<string[]>([]);
  const [groupShowing, setGroupShowing] = useState<IDropGroup | undefined>(
    undefined
  );
  const { onShowToast } = useToast();
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const { account } = useAccount();

  // interal state
  const [isShowMultiple, setIsShowMultiple] = useState(false);
  const { isOpen: isOpenCreateGroup, toggleModal: toggleCreateGroup } =
    useModal();
  const {
    isOpen: isOpenCollectiblesInGroup,
    toggleModal: toggleCollectiblesInGroup,
  } = useModal();
  const { isOpen: isShowSuccess, toggleModal: toggleSuccess } = useModal();

  const handleCreate = async () => {
    const missingFields: string[] = [];
    if (!account) {
      onShowToast("Please connect your wallet");
      return;
    }

    if (!allState.perksId) {
      if (
        allState.dropType === DropTypeEnum.PROTECTED &&
        allState.protectedAmount <= 0
      ) {
        missingFields.push("protectedAmount");
      }
    } else {
      if (allState.fromTopSupporters <= 0) {
        missingFields.push("fromTopSupporters");
      }
      if (
        allState.toTopSupporters <= 0 ||
        allState.fromTopSupporters > allState.toTopSupporters
      ) {
        missingFields.push("toTopSupporters");
      }
    }

    if (allState.sets === SetsTypeEnum.GROUP && !allState.groupSelected) {
      missingFields.push("groupSelected");
    }

    if (allState.sets === SetsTypeEnum.INDIVIDUAL) {
      if (
        !allState.individualDropsStartDate ||
        !allState.individualDropsExpiryDate
      ) {
        missingFields.push("individualDropsDate");
      }
    }

    if (missingFields.length > 0) {
      setInvalidFields(missingFields);
      onShowToast("Please fill in all required fields");
      return;
    }

    if (allState.toTopSupporters > Number(allState.metadata3)) {
      onShowToast("To Top Supporters cannot be greater than the drop amount");
      return;
    }

    try {
      setIsLoadingCreate(true);

      const callData: any = CallData.compile({
        collectible: allState.contractAddress,
        drop_type: allState.dropType == DropTypeEnum.FREE ? 1 : 2,
        secure_amount: uint256.bnToUint256(
          allState.dropType == DropTypeEnum.FREE ? 0 : allState.protectedAmount
        ),
        is_random_to_subscribers: allState.isCheckRandomly ? 1 : 0,
        from_top_supporter: allState.fromTopSupporters,
        to_top_supporter: allState.toTopSupporters,
        start_time:
          allState.sets == SetsTypeEnum.GROUP
            ? allState.groupSelected!.startTime / 1000
            : allState.individualDropsStartDate!.toDate().getTime() / 1000, // /1000 to convert to seconds
        expire_time:
          allState.sets == SetsTypeEnum.GROUP
            ? allState.groupSelected!.expiryTime / 1000
            : allState.individualDropsExpiryDate!.toDate().getTime() / 1000, // /1000 to convert to seconds
      });

      const tx = await account.execute([
        {
          contractAddress:
            process.env.NEXT_PUBLIC_FLEXHAUS_CONTRACT ||
            "0x05be9d77cf191155fa6518751ff5e0f15256114134c8f313e91d9d72b2ad91bb",
          entrypoint: "create_drop",
          calldata: callData,
        },
      ]);

      const provider = new RpcProvider({
        nodeUrl: process.env.NEXT_PUBLIC_STARKNET_NODE_URL,
      });

      const txHash = await provider.waitForTransaction(tx.transaction_hash);

      if (txHash.isSuccess()) {
        if (allState.sets == SetsTypeEnum.GROUP) {
          await handleAddCollectibleToGroup(
            allState.groupSelected!._id,
            allState.contractAddress
          );
        }

        if (allState.sets == SetsTypeEnum.INDIVIDUAL) {
          await handleCreateNewGroup(
            allState.contractAddress,
            allState.individualDropsStartDate!.toDate().getTime(),
            allState.individualDropsExpiryDate!.toDate().getTime()
          );
        }
        toggleSuccess();
      }
    } catch (error) {
      console.log(error);
      onShowToast("Failed to create drop");
    } finally {
      setIsLoadingCreate(false);
    }
  };

  useEffect(() => {
    if (invalidFields.length > 0) {
      const timer = setTimeout(() => {
        setInvalidFields([]);
      }, 1000); // Duration should match the CSS animation duration
      return () => clearTimeout(timer);
    }
  }, [invalidFields]);

  const MultipleDropdown = () => {
    return (
      <div className="select-none absolute flex flex-col mt-2 left-0 top-full border border-border rounded-md p-4 w-full bg-black z-10 gap-8">
        {groupDrop.length > 0 ? (
          groupDrop?.map((group, index) => {
            return (
              <div
                onClick={() =>
                  setAllState((prevState) => ({
                    ...prevState,
                    groupSelected: group,
                  }))
                }
                key={index}
                className="flex justify-between items-center"
              >
                <div className="flex items-center gap-2.5">
                  <div className="grid aspect-square h-[15px] place-items-center rounded-full border-2 border-buy p-[2px] cursor-pointer">
                    {allState.groupSelected?._id == group._id && (
                      <div className="h-full w-full rounded-full bg-buy"></div>
                    )}
                  </div>
                  <p>
                    {formatTimestamp(group.startTime / 1000)} -{" "}
                    {formatTimestamp(group.expiryTime / 1000)}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <p>
                    {group.collectibles.length} Drop
                    {group.collectibles.length > 1 && "s"}
                  </p>
                  <RiShareBoxLine
                    onClick={(e) => {
                      e.stopPropagation();
                      setGroupShowing(group);
                      toggleCollectiblesInGroup();
                    }}
                    className="text-grays hover:text-white"
                  />
                </div>
              </div>
            );
          })
        ) : (
          <p>There are no group!</p>
        )}
      </div>
    );
  };

  return (
    <>
      <ModelV2 isShow={isOpenCreateGroup} hide={toggleCreateGroup}>
        <CreateGroup hide={toggleCreateGroup} />
      </ModelV2>
      <ModelV2
        isShow={isOpenCollectiblesInGroup}
        hide={toggleCollectiblesInGroup}
      >
        <CollectiblesInGroup
          hide={toggleCollectiblesInGroup}
          collectibles={groupShowing?.collectibles || []}
        />
      </ModelV2>
      <ModelV2
        isShow={isShowSuccess}
        hide={() => {
          return;
        }}
      >
        <SuccessCreated />
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

                {!allState.perksId && (
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
                      className={`grid aspect-square h-[15px] cursor-pointer place-items-center rounded-sm border-2 p-[1px] border-buy ${allState.dropType === DropTypeEnum.FREE && "opacity-50 pointer-events-none cursor-default"}`}
                    >
                      {allState.isCheckRandomly && (
                        <FaCheck className="h-full w-full text-buy" />
                      )}
                    </div>
                    <p
                      className={`font-bold ${allState.dropType == DropTypeEnum.PROTECTED && allState.isCheckRandomly ? "text-white" : "text-grays"}`}
                    >
                      Randomly to subscribers
                    </p>
                  </div>
                )}

                {allState.perksId && (
                  <div
                    className={`flex h-8 items-center justify-between rounded-md border border-line px-5 ${invalidFields.includes("distributionType") && "animate-shake"}`}
                  >
                    <div className="flex items-center gap-3">
                      {/* <div
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
                      </div> */}
                      <p className="font-bold text-grays">
                        From top supporters
                      </p>
                    </div>
                    <div
                      className={`flex items-center ${invalidFields.includes("fromTopSupporters") && "animate-shake"}`}
                    >
                      <p className="text-grays">Rank: |</p>
                      <Input
                        placeholder="Input numbers"
                        className="max-h-full w-[80px] border-none bg-transparent outline-none"
                        value={allState.fromTopSupporters}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          // if not a number, set to 0
                          if (isNaN(Number(e.target.value))) {
                            setAllState((prevState) => ({
                              ...prevState,
                              fromTopSupporters: 0,
                            }));
                            return;
                          }

                          setAllState((prevState) => ({
                            ...prevState,
                            fromTopSupporters: Number(e.target.value),
                          }));
                        }}
                      />
                    </div>
                  </div>
                )}

                {allState.perksId && (
                  <div
                    className={`flex h-8 items-center justify-between rounded-md border border-line px-5 ${invalidFields.includes("distributionType") && "animate-shake"}`}
                  >
                    <div className="flex items-center gap-3">
                      {/* <div
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
                    </div> */}
                      <p className="font-bold text-grays">To top supporters</p>
                    </div>
                    <div
                      className={`flex items-center ${invalidFields.includes("toTopSupporters") && "animate-shake"}`}
                    >
                      <p className="text-grays">Rank: |</p>
                      <Input
                        placeholder="Input numbers"
                        className="max-h-full w-[80px] border-none bg-transparent outline-none"
                        value={allState.toTopSupporters}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          // if not a number, set to 0
                          if (isNaN(Number(e.target.value))) {
                            setAllState((prevState) => ({
                              ...prevState,
                              toTopSupporters: 0,
                            }));
                            return;
                          }

                          setAllState((prevState) => ({
                            ...prevState,
                            toTopSupporters: Number(e.target.value),
                          }));
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
              {!allState.perksId && (
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
                          isCheckRandomly: true,
                        }))
                      }
                      className="grid aspect-square h-[15px] place-items-center rounded-full border-2 border-buy p-[2px] cursor-pointer"
                    >
                      {allState.dropType == DropTypeEnum.FREE && (
                        <div className="h-full w-full rounded-full bg-buy"></div>
                      )}
                    </div>
                    <p
                      className={`font-bold ${allState.dropType == DropTypeEnum.FREE ? "text-white" : "text-grays"}`}
                    >
                      Free
                    </p>
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
                      <p
                        className={`font-bold ${allState.dropType == DropTypeEnum.PROTECTED ? "text-white" : "text-grays"}`}
                      >
                        Protected
                      </p>
                    </div>
                    <div
                      className={`flex items-center ${allState.dropType == DropTypeEnum.PROTECTED ? "opacity-100" : "opacity-0"} ${invalidFields.includes("protectedAmount") && "animate-shake"}`}
                    >
                      <p className="text-grays">Amount: |</p>
                      <Input
                        placeholder="Input numbers"
                        className="max-h-full w-[50px] border-none bg-transparent outline-none"
                        value={allState.protectedAmount}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          // if not a number, set to 0
                          if (isNaN(Number(e.target.value))) {
                            setAllState((prevState) => ({
                              ...prevState,
                              protectedAmount: 0,
                            }));
                            return;
                          }

                          setAllState((prevState) => ({
                            ...prevState,
                            protectedAmount: Number(e.target.value),
                          }));
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

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
                    <p
                      className={`font-bold ${allState.sets == SetsTypeEnum.GROUP ? "text-white" : "text-grays"}`}
                    >
                      Group multiple drops:
                    </p>
                  </div>
                  <div
                    tabIndex={0}
                    onBlur={() => setIsShowMultiple(false)}
                    className={`${allState.sets == SetsTypeEnum.INDIVIDUAL && "opacity-50 pointer-events-none"} flex border border-border flex-1 rounded-md items-center justify-between cursor-pointer relative ${invalidFields.includes("groupSelected") && "animate-shake"}`}
                  >
                    <div
                      onClick={() => setIsShowMultiple((prev) => !prev)}
                      className="flex items-center justify-between flex-1 px-3 py-2"
                    >
                      <p>
                        {allState.groupSelected
                          ? `${formatTimestamp(allState.groupSelected.startTime / 1000)} - ${formatTimestamp(allState.groupSelected.expiryTime / 1000)}`
                          : "Choose"}
                      </p>
                      <IoIosArrowDown
                        className={`${isShowMultiple ? "rotate-180" : ""} transition-transform duration-200`}
                      />
                    </div>
                    {/* DropDown */}
                    {isShowMultiple && (
                      <div className="absolute left-0 top-full w-full z-10">
                        <MultipleDropdown />
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
                    <p
                      className={`font-bold ${allState.sets == SetsTypeEnum.INDIVIDUAL ? "text-white" : "text-grays"}`}
                    >
                      Individually distribute:
                    </p>
                  </div>
                  <div
                    className={`flex h-9 flex-1 cursor-pointer items-center justify-between rounded-md border border-border px-3 py-2 hover:border-primary ${allState.sets != SetsTypeEnum.INDIVIDUAL && "pointer-events-none opacity-50 "} ${invalidFields.includes("individualDropsDate") && "animate-shake"}`}
                  >
                    {allState.individualDropsStartDate &&
                    allState.individualDropsExpiryDate ? (
                      <p className="font-normal">
                        {formatTimestamp(
                          allState.individualDropsStartDate.toDate().getTime() /
                            1000
                        )}{" "}
                        -{" "}
                        {formatTimestamp(
                          allState.individualDropsExpiryDate
                            .toDate()
                            .getTime() / 1000
                        )}
                      </p>
                    ) : (
                      <p className="font-normal text-white/50">
                        01/01/2025 - 00:00
                      </p>
                    )}

                    <FaCalendarAlt
                      onClick={toggleCreateGroup}
                      className="text-grays"
                    />
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
          loading={isLoadingCreate}
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
