import { IoWallet } from "react-icons/io5";

export interface DropdownItemProps {
  icon?: React.ReactNode;
  title: string;
  onClick?: () => void;
}

const DropdownItem: React.FC<DropdownItemProps> = (props) => {
  const { icon, title, onClick } = props;

  return (
    <button
      className="flex cursor-pointer items-center gap-1 rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-line"
      onClick={onClick}
    >
      {icon}
      <p className="whitespace-nowrap font-bold">{title}</p>
    </button>
  );
};

export default DropdownItem;
