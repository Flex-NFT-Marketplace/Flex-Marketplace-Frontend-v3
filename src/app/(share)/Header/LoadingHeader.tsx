const LoadingHeader = () => {
  return (
    <div className="loader absolute bottom-0 left-0 h-1 w-full ">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className={`absolute h-full w-2/12 -translate-x-full animate-pulse rounded-br-full rounded-tr-full bg-primary`}
        ></div>
      ))}
    </div>
  );
};

export default LoadingHeader;
