const Recents = () => {
  return (
    <div className="w-[265px] max-lg:w-full">
      <div className="relative flex h-full flex-col overflow-auto border border-t-0 border-line pb-2 ">
        <div className="sticky top-0 border border-l-0 border-t-0 border-line bg-background px-6 pb-4 pt-8">
          <p className="text-xl font-bold uppercase">Recents</p>
        </div>
        {Array.from({ length: 30 }).map((_, index) => (
          <div key={index} className="p-2 px-6">
            <div className="flex items-center justify-between">
              <p className="font-bold">0x0023...7899</p>
              <p className="text-sm text-grays">5 mins</p>
            </div>
            <p className="text-sm text-grays">has claimed 0.025 ETH</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recents;
