"use client";
import Image, { StaticImageData } from "next/image";
import ImageDefault from "./default.webp";
import { HTMLProps, useEffect, useState } from "react";
import clsx from "clsx";
import { formatLink } from "@/utils/string";
export interface ImageProps {
  width?: number;
  height?: number;
  src: string | undefined;
  alt?: string;
  className?: HTMLProps<HTMLButtonElement>["className"];
  unLoading?: boolean;
}

const ImageKit: React.FC<ImageProps> = (props) => {
  const {
    width = 1000,
    height = 1000,
    src = "",
    alt = "",
    className,
    unLoading = false,
  } = props;

  const [imageSrc, setImageSrc] = useState<string | StaticImageData>("");
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setImageSrc(ImageDefault);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (src || src == "") {
      setImageSrc(src);
      setIsLoading(false);
    } else {
      setImageSrc(ImageDefault);
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
    </>
  );
};

export default ImageKit;
