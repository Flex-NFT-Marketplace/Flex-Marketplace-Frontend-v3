import { useCreateDrop } from "./page";

const Steps = () => {
  const { allState } = useCreateDrop();

  const getColorStep = (step: number) => {
    const color =
      allState.activeStep > step
        ? "#FFE720"
        : allState.activeStep == step
          ? "#FFE720"
          : "#FFFFFF80";
    return color;
  };

  return (
    <div className="flex items-center gap-x-2">
      <div
        style={{ borderColor: getColorStep(1) }}
        className={`grid aspect-square h-6 place-items-center rounded-full border`}
      >
        <p className={`text-sm`} style={{ color: getColorStep(1) }}>
          1
        </p>
      </div>
      <div
        className={`h-[1px] w-[52px]`}
        style={{ background: getColorStep(1) }}
      ></div>
      <div
        style={{ borderColor: getColorStep(2) }}
        className={`grid aspect-square h-6 place-items-center rounded-full border`}
      >
        <p className={`text-sm`} style={{ color: getColorStep(2) }}>
          2
        </p>
      </div>
    </div>
  );
};

export default Steps;
