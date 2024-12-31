// components/ImageKit.tsx
"use client";

import Image, { StaticImageData } from "next/image";
import ImageDefault from "./default.webp";
import { HTMLProps, useEffect, useState } from "react";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { convertIpfsUrl, ipfsPrefix } from "@/utils/string";

export interface ImageProps {
  width?: number;
  height?: number;
  src?: string;
  alt?: string;
  className?: HTMLProps<HTMLImageElement>["className"];
  unLoading?: boolean;
}

const ModelViewer = dynamic(() => import("./ModelViewer"), { ssr: false });

const ImageKit: React.FC<ImageProps> = ({
  width = 1000,
  height = 1000,
  src,
  alt = "",
  className,
  unLoading = false,
}) => {
  const convertIPFSLink = (src: string): string => {
    if (typeof src == "string" && src.startsWith(ipfsPrefix)) {
      return convertIpfsUrl(src);
    }
    return src;
  };

  const [imageSrc, setImageSrc] = useState<string | StaticImageData>(
    convertIPFSLink(src || "") || ImageDefault
  );
  const [isLoading, setIsLoading] = useState<boolean>(!src);
  const [is3D, setIs3D] = useState<boolean>(false);

  const handleError = () => {
    setImageSrc(ImageDefault);
    setIsLoading(false);
    setIs3D(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (src) {
      setImageSrc(convertIPFSLink(src));
      setIsLoading(true);
      const is3DModel = /\.(glb|gltf)$/i.test(src);

      setIs3D(is3DModel);
    } else {
      setImageSrc(ImageDefault);
      setIsLoading(false);
      setIs3D(false);
    }
  }, [src]);

  const classes = clsx("object-cover", className);

  return (
    <>
      {is3D && typeof imageSrc === "string" ? (
        <ModelViewer modelUrl={imageSrc} width={width} height={height} />
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
      {isLoading && !unLoading && <div className="loading-spinner"></div>}
    </>
  );
};

export default ImageKit;
