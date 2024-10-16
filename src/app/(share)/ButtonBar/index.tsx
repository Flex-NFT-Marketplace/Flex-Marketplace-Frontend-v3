"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import { AiOutlineHome } from "react-icons/ai";

interface IBottomBarItemProps {
  title: string;
  icon: React.ReactNode;
  path: string;
}

const BottomBarItem: React.FC<IBottomBarItemProps> = ({
  title,
  icon,
  path,
}) => {
  const currentPath = usePathname();

  const classes = clsx(
    "text-grays flex w-full flex-grow flex-col items-center justify-center gap-1",
    { "text-primary": currentPath == path },
  );

  return (
    <a className={classes}>
      {icon}
      <p className="text-xs font-normal">{title}</p>
    </a>
  );
};

const BottomBar = () => {
  const navigateItem = [
    {
      title: "Home",
      icon: <AiOutlineHome className="text-lg" />,
      path: "/",
    },
    {
      title: "Collection",
      icon: <AiOutlineHome className="text-lg" />,
      path: "/collections",
    },
    {
      title: "Activity",
      icon: <AiOutlineHome className="text-lg" />,
      path: "/activity",
    },
    {
      title: "EVO",
      icon: <AiOutlineHome className="text-lg" />,
      path: "/evo",
    },
    {
      title: "Cart",
      icon: <AiOutlineHome className="text-lg" />,
      path: "/cart",
    },
  ];

  return <></>;

  return (
    <div className="sticky bottom-0 left-0 right-0 flex h-[64px] items-center border-t border-stroke lg:hidden">
      {navigateItem.map((item, index) => (
        <BottomBarItem key={index} {...item} />
      ))}
    </div>
  );
};

export default BottomBar;
