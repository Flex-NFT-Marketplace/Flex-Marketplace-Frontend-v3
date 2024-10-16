import LoadingAnimation from "@/components/LoadingAnimation";

const LoadingData = () => {
  return (
    <div className="flex flex-col justify-between  gap-4 border border-dashed border-buy px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <p className="text-[24px] font-normal text-buy">Loading</p>
          <LoadingAnimation />
        </div>
      </div>
    </div>
  );
};

export default LoadingData;
