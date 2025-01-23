import ImageKit from "@/packages/@ui-kit/Image";
import React, { forwardRef, useState } from "react";
import bg_atemu from "@/assets/social/bg-atemu-lite.png";
import bg_atemu1 from "@/assets/social/avatar.png";
import logo_atemu from "@/assets/social/logo-atemu.png";

interface ICardProps {
  imageSrc?: string;
  className?: string;
}

const Card: React.FC<ICardProps> = forwardRef<HTMLDivElement, ICardProps>(
  ({ imageSrc, className }, ref) => {
    const [rotation, setRotation] = useState({ rX: "0deg", rY: "0deg" });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const item = e.currentTarget;
      const rect = item.getBoundingClientRect();
      const positionX = ((e.clientX - rect.left) / rect.width) * 100;
      const positionY = ((e.clientY - rect.top) / rect.height) * 100;

      setRotation({
        rX: `${0.5 * (positionY < 50 ? -1 : 1) * (50 - positionY)}deg`,
        rY: `${-0.5 * (50 - positionX)}deg`,
      });
    };

    const handleMouseOut = () => {
      setRotation({ rX: "0deg", rY: "0deg" });
    };

    return (
      <div
        ref={ref}
        className={`${className} rotating-card wrap w-[18vw] max-w-[262px] aspect-[2/3] perspective-1000`}
        onMouseMove={handleMouseMove}
        onMouseOut={handleMouseOut}
        style={{
          transform: `rotateX(${rotation.rX}) rotateY(${rotation.rY})`,
          transition: "transform 0.1s ease",
        }}
      >
        <div className="rotating-card-inner item relative w-full h-full">
          <div className="absolute w-full h-full rounded shadow-md flex items-center justify-center text-white transform rotateY-180">
            <img
              src={imageSrc}
              alt=""
              className="w-full h-full object-cover rounded scale-x-[-1]"
            />
          </div>
          <div className="rotating-card-front border-primary border absolute w-full h-full bg-black rounded shadow-md flex items-center justify-center text-white">
            <img
              src={logo_atemu.src}
              alt=""
              className="w-full h-full object-cover rounded"
            />
          </div>
        </div>
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
