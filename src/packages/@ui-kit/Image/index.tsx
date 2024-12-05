"use client";

import Image, { StaticImageData } from "next/image";
import ImageDefault from "./default.webp";
import { HTMLProps, useEffect, useState } from "react";
import clsx from "clsx";

export interface ImageProps {
  width?: number;
  height?: number;
  src?: string; // Đánh dấu là optional
  alt?: string;
  className?: HTMLProps<HTMLImageElement>["className"]; // Sửa type cho đúng
  unLoading?: boolean;
}

const ImageKit: React.FC<ImageProps> = ({
  width = 1000,
  height = 1000,
  src,
  alt = "",
  className,
  unLoading = false,
}) => {
  // Khởi tạo imageSrc với src từ props hoặc ImageDefault
  const [imageSrc, setImageSrc] = useState<string | StaticImageData>(
    src || ImageDefault
  );
  const [isLoading, setIsLoading] = useState<boolean>(!src); // Nếu src không có, đã không còn loading

  const handleError = () => {
    setImageSrc(ImageDefault);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (src) {
      setImageSrc(src);
      setIsLoading(true); // Bắt đầu lại trạng thái loading khi src thay đổi
    } else {
      setImageSrc(ImageDefault);
      setIsLoading(false);
    }
  }, [src]);

  const classes = clsx("object-cover", className);

  return (
    <>
      <Image
        width={width}
        height={height}
        src={imageSrc}
        alt={alt}
        className={classes}
        onError={handleError}
        onLoad={handleLoad}
      />
      {isLoading && !unLoading && (
        <div className="loading-spinner">Loading...</div> // Tùy chọn hiển thị loader
      )}
    </>
  );
};

export default ImageKit;
