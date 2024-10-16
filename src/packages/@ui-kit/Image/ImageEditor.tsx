"use client";
import Image, { StaticImageData } from "next/image";
import ImageDefault from "./default.webp";
import { HTMLProps, useState, useRef, useEffect } from "react";
import LoadingIcon from "../Loading/LoadingIcon";
import clsx from "clsx";
import { TbPencilCog } from "react-icons/tb";

export interface ImageProps {
  width?: number;
  height?: number;
  src: string | undefined;
  alt?: string;
  className?: HTMLProps<HTMLButtonElement>["className"];
  unLoading?: boolean;
  onChange?: (file: File) => void;
}

const ImageEditor: React.FC<ImageProps> = (props) => {
  const {
    width = 1000,
    height = 1000,
    src,
    alt = "",
    className,
    unLoading = false,
    onChange,
  } = props;

  const [imageSrc, setImageSrc] = useState<string | StaticImageData>(
    ImageDefault,
  );
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleError = () => {
    setImageSrc(ImageDefault);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
        if (onChange) {
          onChange(file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (src == "") {
      setImageSrc(ImageDefault);
    } else if (src) {
      setImageSrc(src);
    } else {
      setImageSrc(ImageDefault);
    }
    setIsLoading(false);
  }, [src]);

  const classes = clsx("object-cover", className);
  const loadingClasses = clsx(
    "grid aspect-square h-full w-full place-items-center",
    className,
  );

  return (
    <div className="relative h-fit w-fit">
      {isLoading && !unLoading ? (
        <div className={loadingClasses}>
          <LoadingIcon />
        </div>
      ) : (
        <Image
          width={width}
          height={height}
          src={imageSrc}
          alt={alt}
          className={classes}
          onError={handleError}
          onLoad={handleLoad}
        />
      )}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="absolute bottom-0 right-0 aspect-square rounded-full bg-grays px-2 py-2 text-white"
      >
        <TbPencilCog />
      </button>
    </div>
  );
};

export default ImageEditor;
