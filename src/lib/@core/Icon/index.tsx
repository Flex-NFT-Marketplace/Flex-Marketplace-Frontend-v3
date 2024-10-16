import clsx from "clsx";
import { HTMLProps } from "react";

interface IIconProps {
  children?: React.ReactNode;
  active?: boolean;
  className?: HTMLProps<HTMLElement>["className"];
  onClick?: () => void;
}

const Icon: React.FC<IIconProps> = (props) => {
  const { children, active = false, className, onClick } = props;

  const classes = clsx(
    "flex h-8 w-8 rounded cursor-pointer font-normal items-center text-xl justify-center border border-stroke transition-all duration-200 ease-in-out",
    { "bg-primary text-black hover:bg-white": active },
    { "text-grays hover:text-primary hover:border-primary": !active },
    className,
  );

  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
};

export default Icon;
