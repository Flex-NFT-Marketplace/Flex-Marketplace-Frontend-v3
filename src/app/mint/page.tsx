"use client";

import TxHash from "@/components/TxHash";
import { storefrontErc721 } from "@/constants/storefrontErc721";
import Input from "@/lib/@core/Input";
import Button from "@/packages/@ui-kit/Button";
import usePostMetadata from "@/services/api/usePostMetadata";
import { addresses } from "@/services/context/address";
import { useNotify } from "@/services/providers/NotifyProvider";
import { LoadingHeaderContext } from "@/services/providers/market/LoadingHeaderProvider";
import { encodeString } from "@/utils/string";
import { useAccount } from "@starknet-react/core";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Contract, RpcProvider, uint256 } from "starknet";

const provider = new RpcProvider({
  nodeUrl:
    process.env.NEXT_PUBLIC_STARKNET_NODE_URL ||
    "https://starknet-mainnet.g.alchemy.com/v2/PDWMhHtyi3_RVgU1VbNwTfZ9MscJffDZ",
});

const Mint = () => {
  const { status, account, address } = useAccount();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<any>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [mintPriceInWei, setMintPriceInWei] = useState("");
  const [txHash, setTxHash] = useState("");

  const _postMetadata = usePostMetadata();

  const [loading, setLoading] = useState(false);
  const { setIsLoadingHeader } = useContext(LoadingHeaderContext);

  useEffect(() => {
    setIsLoadingHeader(loading);
  }, [loading]);

  const { onShowNotify } = useNotify();

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const fileSize = file.size; // in bytes
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes

      if (fileSize > maxSize) {
        // File size exceeds 5MB
        onShowNotify("File size must be less than 5MB");
        fileInputRef.current.value = ""; // Clear the file input
      } else {
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string | null);
        };
        reader.readAsDataURL(file);

        onShowNotify("File uploaded successfully");
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    const handleCheckMintPrice = async () => {
      const storefrontNFT = new Contract(
        storefrontErc721.abi,
        addresses.FlexStorefrontNFT.address,
        provider,
      );

      const mintPrice = await storefrontNFT.getMintPrice();
      const mintPriceAmount = uint256
        .uint256ToBN(mintPrice.mint_price_amount)
        .toString();

      setMintPriceInWei(mintPriceAmount);
    };
    handleCheckMintPrice();
  }, []);

  const handleMint = async () => {
    if (status == "disconnected") onShowNotify("Please connect your wallet");
    else if (!name) onShowNotify("Please enter the item name");
    else if (!selectedFile) onShowNotify("Please select an image");
    else {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("external_url", externalLink);
      formData.append("file", selectedFile);

      const res = await _postMetadata.mutateAsync(formData);
      const uri = process.env.NEXT_PUBLIC_API_HOST_METADATA_URI + res.data;
      // execute minting
      try {
        const res: any = await account?.execute([
          {
            contractAddress: addresses.ethToken.address,
            entrypoint: "approve",
            calldata: [addresses.FlexStorefrontNFT.address, mintPriceInWei, 0],
          },
          {
            contractAddress: addresses.FlexStorefrontNFT.address,
            entrypoint: "mint",
            calldata: [
              {
                tokenURI: encodeString(uri),
              },
            ],
          },
        ]);
        setTxHash(res?.transaction_hash);
        onReloadData();
        await provider.waitForTransaction(res?.transaction_hash);
        setLoading(false);
      } catch (error) {
        onShowNotify("Failed to mint NFT");
      }

      setLoading(false);
    }
  };

  const onReloadData = () => {
    setName("");
    setDescription("");
    setExternalLink("");
    setPreview(null);
    setSelectedFile(null);
  };

  return (
    <div className="fixed-height-under-header mx-auto flex w-full max-w-[1440px] flex-col overflow-auto px-20 max-md:px-5">
      <h1 className="text-[44px] font-normal">Mint (and) Flex your NFT</h1>

      <div className="flex flex-wrap justify-center gap-10">
        <div className="w-[562px] max-w-full">
          <p>Image, Audio, Video</p>

          <div className="relative mt-3 flex aspect-square w-full flex-col items-center justify-center gap-4 border border-dashed border-stroke p-2">
            {preview && (
              <>
                <img
                  src={preview}
                  alt="Selected Image"
                  className=" h-full w-full"
                />

                <Button
                  className="absolute right-5 top-5"
                  title="Remove"
                  variant="secondary"
                  onClick={() => setPreview(null)}
                />
              </>
            )}

            {!preview && (
              <>
                <p className="text-grays">
                  PNG, GIF, WEBP, MP4 or MP3. Max 100mb.
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <Button title="Choose File" onClick={handleButtonClick} />
              </>
            )}
          </div>
        </div>

        <div className="mb-4 flex flex-1 basis-[400px] flex-col gap-8">
          <div className="flex flex-col gap-4">
            <p>Item name</p>
            <Input
              value={name}
              placeholder="e.g. “Big Shark Shoes with sparklings”"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <div className="flex gap-2">
              <p>External link </p>
              <p className="text-grays">(website/social media)</p>
            </div>

            <Input
              value={externalLink}
              className="mt-4"
              placeholder="Input your external link"
              onChange={(e) => setExternalLink(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <p>Item description</p>
              <p className="text-grays">(Optional)</p>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide information about your NFT"
              className="h-[200px] w-full border border-stroke bg-transparent p-4 outline-none focus:border-primary"
            ></textarea>
          </div>

          <p className="font-normal max-sm:text-center">
            Minting cost is only <span className="text-primary"> 0.0006 </span>
            ETH
          </p>

          {!txHash && (
            <div className="flex max-sm:self-center">
              <Button title="Mint" onClick={handleMint} loading={loading} />
            </div>
          )}

          {txHash && (
            <div>
              <div className="flex justify-between gap-4">
                <div>
                  <p className="text-3xl">Done</p>

                  <p className="text-grays">
                    You can go to Inventory to start listing
                  </p>
                </div>
              </div>
              <div className="flex justify-between">
                <Button title="Continue Minting" onClick={onReloadData} />
                <TxHash txHash={txHash} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mint;
