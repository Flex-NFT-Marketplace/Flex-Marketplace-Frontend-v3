import { useState, useEffect } from "react";

const useCountdown = (targetDate: string): [number, number, number, number] => {
  const calculateTimeLeft = (): [number, number, number, number] => {
    let timeLeft: [number, number, number, number] = [0, 0, 0, 0];
    if (!targetDate) {
      return timeLeft;
    }
    const difference = +new Date(targetDate) - +new Date();
    if (difference > 0) {
      timeLeft = [
        Math.floor((difference / 1000) % 60), // seconds
        Math.floor((difference / 1000 / 60) % 60), // minutes
        Math.floor((difference / (1000 * 60 * 60)) % 24), // hours
        Math.floor(difference / (1000 * 60 * 60 * 24)), // days
      ];
    }

    return timeLeft;
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [targetDate, timeLeft]);

  return timeLeft;
};

export default useCountdown;
