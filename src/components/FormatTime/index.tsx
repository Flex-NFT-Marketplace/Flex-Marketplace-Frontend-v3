interface IFormatTimeProps {
  time?: string;
  type?: "date" | "time";
}

const FormatTime: React.FC<IFormatTimeProps> = (props) => {
  const { time } = props;

  const handleTimeReturn = (time: string) => {
    const date = new Date(Number(time) * 1000);
    return date.toLocaleDateString();
  };

  const handleTimeAgo = (time: string) => {
    const currentTime = Date.now();
    const givenTime = Number(time) * 1000;

    const differenceInSeconds = Math.floor((currentTime - givenTime) / 1000);

    if (differenceInSeconds < 60) {
      return `${differenceInSeconds}s`;
    }

    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    if (differenceInMinutes < 60) {
      return `${differenceInMinutes}m`;
    }

    const differenceInHours = Math.floor(differenceInMinutes / 60);
    if (differenceInHours < 24) {
      return `${differenceInHours}h`;
    }

    const differenceInDays = Math.floor(differenceInHours / 24);
    return `${differenceInDays} d`;
  };

  return (
    <div>
      <p className="text-[#3B82F6]">{handleTimeAgo(time || "")}</p>
    </div>
  );
};

export default FormatTime;
