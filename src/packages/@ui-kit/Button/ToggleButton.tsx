import clsx from "clsx";
import { IoCloudyNightOutline } from "react-icons/io5";

export interface ToggleButtonProps {
  children?: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "icon" | "no-anni";
  disabled?: boolean;
  actived?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = (props) => {
  const { actived, onClick, icon } = props;

  const classes = clsx(
    "inline-flex aspect-square h-9 items-center justify-center rounded-md border border-line hover:bg-line font-bold",
    {
      "bg-primary text-background hover:bg-primary/80 hover:text-background":
        actived,
    },
  );

  return (
    <button className={classes} onClick={onClick}>
      {icon ? icon : <IoCloudyNightOutline />}
    </button>
  );
};

export default ToggleButton;
