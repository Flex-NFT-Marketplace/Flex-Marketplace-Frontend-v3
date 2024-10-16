import { useEffect, useState } from "react";

const LoadingAnimation = () => {
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setLoading((prev) => prev + 1);
    }, 200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (loading + 1 > 9) setLoading(0);
  });

  return (
    <div className="flex items-center gap-1">
      <div
        className={`border-line h-3 w-3 border  ${
          loading >= 1 ? "bg-buy" : "bg-transparent"
        }`}
      ></div>
      <div
        className={`border-line h-3 w-3 border ${
          loading >= 2 ? "bg-buy" : "bg-transparent"
        }`}
      ></div>
      <div
        className={`border-line h-3 w-3 border ${
          loading >= 3 ? "bg-buy" : "bg-transparent"
        }`}
      ></div>
      <div
        className={`border-line h-3 w-3 border ${
          loading >= 4 ? "bg-buy" : "bg-transparent"
        }`}
      ></div>
      <div
        className={`border-line h-3 w-3 border ${
          loading >= 5 ? "bg-buy" : "bg-transparent"
        }`}
      ></div>
      <div
        className={`border-line h-3 w-3 border ${
          loading >= 6 ? "bg-buy" : "bg-transparent"
        }`}
      ></div>
      <div
        className={`border-line h-3 w-3 border ${
          loading >= 7 ? "bg-buy" : "bg-transparent"
        }`}
      ></div>
      <div
        className={`border-line h-3 w-3 border ${
          loading >= 8 ? "bg-buy" : "bg-transparent"
        }`}
      ></div>
    </div>
  );
};

export default LoadingAnimation;
