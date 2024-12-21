import Button from "@/packages/@ui-kit/Button";
import Input from "@/packages/@ui-kit/Input";
import { FaCalendarDays, FaCheck } from "react-icons/fa6";
import { PiWarningCircle } from "react-icons/pi";
import { Phase, useCreateCollection } from "./page";
import { ChangeEvent, useEffect } from "react";
import { useAccount } from "@starknet-react/core";
import { useToast } from "@/packages/@ui-kit/Toast/ToastProvider";

const PhaseItem = ({ phase }: { phase: Phase }) => {
  const { allState, setAllState } = useCreateCollection();
  const { address } = useAccount();

  const handleChangePhaseName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    phase.phaseName = value;
    handleChange();
  };

  const handleChangeMaxMintPerWallet = (e: ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value))) {
      return;
    }
    const value = Number(e.target.value);
    if (value < 1) phase.maxMintPerWallet = "";
    else phase.maxMintPerWallet = value.toString();
    handleChange();
  };

  const handleChangeMintPrice = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const regex = /^(\d+(\.\d*)?|\.\d*)$/;
    if (value === "" || regex.test(value)) {
      phase.mintPrice = value;
      handleChange();
    }
  };

  const handleToggleFreeMint = () => {
    phase.isFreeMint = !phase.isFreeMint;
    handleChange();
  };

  const handleChangeReceiverWallet = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    phase.receiverWallet = value;
    handleChange();
  };

  const validateHexStrings = (jsonContent: any) => {
    const hexRegex = /^[0-9A-Fa-f]+$/;
    for (const key in jsonContent) {
      if (jsonContent.hasOwnProperty(key)) {
        const value = jsonContent[key];
        if (
          typeof value !== "string" ||
          !hexRegex.test(value.replace("0x", ""))
        ) {
          return false;
        }
      }
    }
    return true;
  };

  const isWhitelistValid = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e: any) {
          try {
            const jsonContent = JSON.parse(e.target.result);
            const isValidHex = validateHexStrings(jsonContent);
            if (isValidHex) {
              phase.whiteListArray = jsonContent.map((i: string) =>
                i.toLowerCase().trim()
              );
              // setWhitelistArray(
              //   jsonContent.map((i: string) => i.toLowerCase().trim()),
              // );
            } else {
              alert(
                "Some values in the JSON are not valid hex strings. hex strings: (0-9)(a-f)"
              );
              event.target.value = "";
            }
          } catch (error) {
            console.error("Invalid JSON:", error);
            alert("The file content is not valid JSON");
            event.target.value = ""; // Reset the input
          }
        };
        reader.readAsText(file);
      }
    }
  };

  const handleToggleReceiverWallet = () => {
    phase.isSelf = !phase.isSelf;
    if (address) {
      phase.receiverWallet = address;
    }

    handleChange();
  };

  const handleChange = () => {
    const newPhases = allState.phases.map((item) => {
      if (item.phaseId == phase.phaseId) {
        return phase;
      } else {
        return item;
      }
    });

    setAllState((prev) => ({
      ...prev,
      phases: newPhases,
    }));
  };

  useEffect(() => {
    console.log(phase);
  }, [phase]);

  return (
    <div className="flex gap-5 pb-10 md:h-[280px]">
      <div className="w-[193px] max-md:hidden">
        <p>
          Phase name <span className="text-cancel">*</span>
        </p>
        <Input
          value={phase?.phaseName || ""}
          placeholder={`Phase ${phase.phaseId + 1}`}
          classContainer="mt-2"
          onChange={handleChangePhaseName}
        />
      </div>
      <div className="relative mt-4 w-[1px] min-w-[1px] bg-border max-md:hidden md:h-[280px]">
        <div className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border border-border bg-black"></div>
      </div>
      <div className="flex flex-1 flex-col gap-6">
        <div className="flex-1 md:hidden">
          <p>
            Phase name <span className="text-cancel">*</span>
          </p>
          <Input
            value={phase?.phaseName || ""}
            placeholder={`Phase ${phase.phaseId + 1}`}
            classContainer="mt-2 w-full !max-w-full"
            onChange={handleChangePhaseName}
          />
        </div>
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex-1">
            <p>
              Start date <span className="text-cancel">*</span>
            </p>
            <div className="mt-2 flex items-center justify-between rounded-md border border-line bg-background px-3">
              <p className="py-2">{phase?.startDate || "01/01/2023"}</p>
              <FaCalendarDays />
            </div>
          </div>
          <div className="flex-1">
            <p>
              End date <span className="text-cancel">*</span>
            </p>
            <div className="mt-2 flex items-center justify-between rounded-md border border-line bg-background px-3">
              <p className="py-2">{phase?.endDate || "01/01/2023"}</p>
              <FaCalendarDays />
            </div>
          </div>
        </div>
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p>
                Mint price <span className="text-cancel">*</span>{" "}
                <PiWarningCircle className="inline-block" />
              </p>
              <div className="flex items-center gap-3">
                <div
                  onClick={handleToggleFreeMint}
                  className={`grid aspect-square h-[15px] cursor-pointer place-items-center rounded-sm border-2 border-primary p-[1px]`}
                >
                  {phase.isFreeMint && (
                    <FaCheck className="h-full w-full border-primary text-primary" />
                  )}
                </div>
                <p className="font-bold text-grays">Free-mint</p>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between rounded-md border border-line bg-background px-3">
              <Input
                name={`mintPrice${phase?.phaseId}`}
                value={phase?.mintPrice || ""}
                placeholder="0"
                className="border-none !p-0"
                classContainer={`!max-w-full w-full ${phase.isFreeMint && "pointer-events-none opacity-50"}`}
                onChange={handleChangeMintPrice}
              />
              <p className="whitespace-nowrap text-grays">| ETH</p>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p>
                Max mint per wallet <span className="text-cancel">*</span>{" "}
                <PiWarningCircle className="inline-block" />
              </p>
              {/* <div className="flex items-center gap-3">
                <div
                  onClick={handleToggleFreeEarnings}
                  className={`grid aspect-square h-[15px] cursor-pointer place-items-center rounded-sm border-2 border-primary p-[1px]`}
                >
                  {phase.isFreeEarnings && (
                    <FaCheck className="h-full w-full border-primary text-primary" />
                  )}
                </div>
                <p className="font-bold text-grays">Free</p>
              </div> */}
            </div>
            <div className="mt-2 flex items-center justify-between rounded-md border border-line bg-background px-3">
              <Input
                value={phase?.maxMintPerWallet || ""}
                placeholder="0"
                className="border-none !p-0"
                classContainer={`!max-w-full w-full ${phase.isFreeEarnings && "pointer-events-none opacity-50"}`}
                onChange={handleChangeMaxMintPerWallet}
              />
              {/* <p className="py-2">{phase?.earningsPercentage || "0"}</p> */}
              {/* <p className="text-grays">%</p> */}
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p>
              Receiver wallet <span className="text-cancel">*</span>{" "}
              <PiWarningCircle className="inline-block" />
            </p>
            <div
              className={`mt-2 w-full border border-line hover:border-gray-400`}
            >
              <input
                type="file"
                className="w-full bg-transparent px-5 py-2"
                accept=".json"
                onChange={(e) => {
                  e.preventDefault();
                  isWhitelistValid(e);
                }}
              />
            </div>
          </div>
          <Input
            value={phase?.receiverWallet || ""}
            classContainer={`w-full !max-w-full mt-2 ${phase.isSelf && "pointer-events-none opacity-50"}`}
            placeholder="0x00..."
            onChange={handleChangeReceiverWallet}
          />
        </div>
      </div>
    </div>
  );
};

const Step4 = () => {
  const { allState, setAllState } = useCreateCollection();
  const { onShowToast } = useToast();

  const isValidPhase = (phase: Phase) => {
    let isValid = true;
    if (!phase.phaseName.trim()) {
      onShowToast("Please fill in phase name");
      isValid = false;
    }
    // dont't forget check startDate and endDate

    if (!phase.isFreeEarnings && !phase.maxMintPerWallet) {
      onShowToast("Please fill in earnings percentage");
      isValid = false;
    }

    if (
      !isNaN(Number(phase.maxMintPerWallet)) ||
      Number(phase.maxMintPerWallet) % 1 != 0 ||
      Number(phase.maxMintPerWallet) < 0
    ) {
      isValid = false;
      onShowToast("Max mint per wallet must be grater 0");
      return;
    }

    if (!phase.isFreeMint && !phase.mintPrice) {
      onShowToast("Please fill in mint price");
      isValid = false;
    }

    if (isNaN(Number(phase.mintPrice))) {
      onShowToast("Mint price must be a number");
      isValid = false;
    }

    if (Number(phase.mintPrice) < 0) {
      onShowToast("Mint price must be greater than 0");
      isValid = false;
    }

    if (!phase.isSelf && !phase.receiverWallet.trim()) {
      onShowToast("Please fill in receiver wallet");
      isValid = false;
    }

    return isValid;
  };

  const handleAddNewPhase = () => {
    let newPhaseAvailable = true;
    allState.phases.map((phase) => {
      if (!isValidPhase(phase)) {
        newPhaseAvailable = false;
      }
    });
    if (newPhaseAvailable) {
      setAllState((prev) => ({
        ...prev,
        phases: [
          ...prev.phases,
          {
            phaseId: prev.phases[prev.phases.length - 1].phaseId + 1,
            phaseName: "",
            startDate: "",
            endDate: "",
            maxMintPerWallet: "",
            isFreeEarnings: false,
            mintPrice: "",
            isFreeMint: false,
            receiverWallet: "",
            isSelf: false,
            whiteListArray: [],
          },
        ],
      }));
    }
  };

  return (
    <div className="mx-auto flex max-w-[1200px] animate-fade flex-col gap-8 px-2">
      <div>
        <p className="text-[32px] font-bold uppercase">{`Finally, let's set the sale info`}</p>
        <p className="text-grays">{`Set up the sale info`}</p>
      </div>
      <div className="mt-8">
        {allState.phases.map((item, index) => (
          <PhaseItem key={index} phase={item} />
        ))}

        <div className="flex gap-5 pb-10">
          <Button
            onClick={handleAddNewPhase}
            title="Add new phase"
            variant="outline"
            className="border-[#63B1FF] text-[#63B1FF] max-md:w-full md:!w-[193px]"
          />

          <div className="relative mt-4 max-md:hidden">
            <div className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border border-border bg-black"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4;
