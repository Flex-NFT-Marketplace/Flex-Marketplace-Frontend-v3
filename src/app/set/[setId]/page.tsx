"use client";
import ImageKit from "@/packages/@ui-kit/Image";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { MdOutlineContentCopy } from "react-icons/md";
import Button from "@/packages/@ui-kit/Button";
import { useEffect, useState } from "react";
import { FastAverageColor } from "fast-average-color";
import { useDropDetail } from "@/services/providers/DropDetailProvider";
import { getBackgroundColor } from "@/app/create-drop/step2";
import {
  copyToClipboard,
  strShortAddress,
  timeElapsedFromTimestamp,
} from "@/utils/string";
import { DropTypeEnum } from "@/services/providers/CreateDropProvider";
import Link from "next/link";
import avtDefault from "@/assets/avtDefault.webp";
import { toast } from "react-toastify";
import { useAccountContext } from "@/services/providers/AccountProvider";
import { useParams } from "next/navigation";
import { getSetById } from "@/services/api/flexhaus/social/getSetById";
import { IdropDetail, ISet } from "@/types/Idrop";
import { useGetDropDetail } from "@/services/api/flexhaus/dropDetail/useGetDropDetail";

const Set = () => {
  const { setId } = useParams();
  const { mutateAsync, isPending } = getSetById();
  const { mutateAsync: mutateAsyncDrop, isPending: isPendingGetDrop } =
    useGetDropDetail();
  const [setDetail, setSetDetail] = useState<ISet | undefined>(undefined);
  const [activeDrop, setActiveDrop] = useState<IdropDetail | undefined>(
    undefined
  );

  const {
    toggleLike,
    isSecured,
    secure,
    collectionDetail,
    getTotalLike,
    checkLiked,
  } = useDropDetail();
  const [timeLeft, setTimeLeft] = useState<string>("-");
  const [isLoadingSecure, setIsLoadingSecure] = useState(false);
  const [isLoadingLike, setIsLoadingLike] = useState(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [totalLike, setTotalLike] = useState<number>(0);
  const { reloadInfoOwner } = useAccountContext();

  const handleSecure = async (collectible: string) => {
    try {
      setIsLoadingSecure(true);
      await secure(collectible);
      await reloadInfoOwner();
    } catch (error) {
      toast("Something went wrong");
    } finally {
      setIsLoadingSecure(false);
    }
  };

  const handleLike = async (collectible: string) => {
    try {
      setIsLoadingLike(true);
      await toggleLike(collectible);
      await getDataLike();
    } catch (error) {
      toast("Something went wrong");
    } finally {
      setIsLoadingLike(false);
    }
  };

  const handleCopyAddress = () => {
    try {
      copyToClipboard(setDetail?.creator.address as string);
      toast("Copy address successfully");
    } catch (error) {
      toast("Something went wrong");
    }
  };

  useEffect(() => {
    if (setDetail) {
      if (setDetail) {
        getDrop(setDetail?.collectibles[0].nftContract);
      }
      const intervalId = setInterval(() => {
        if (new Date().getTime() < setDetail?.startTime) {
          setTimeLeft(
            "Starts in " + timeElapsedFromTimestamp(setDetail?.startTime / 1000)
          );
        } else if (new Date().getTime() < setDetail?.expiryTime) {
          setTimeLeft(
            "Ends in " + timeElapsedFromTimestamp(setDetail?.expiryTime / 1000)
          );
        } else {
          setTimeLeft("Expired");
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [setDetail]);

  const getSet = async (setId: string) => {
    const data = await mutateAsync(setId);
    setSetDetail(data);
  };

  const getDrop = async (contractAddress: string) => {
    const drop = await mutateAsyncDrop(contractAddress);
    setActiveDrop(drop);
  };

  useEffect(() => {
    if (setId) {
      getSet(setId as string);
    }
  }, [setId]);

  const getDataLike = async () => {
    if (activeDrop) {
      const isLiked = await checkLiked(activeDrop.collectible.nftContract);
      setIsLiked(isLiked);
      const totalLike = await getTotalLike(activeDrop.collectible.nftContract);
      setTotalLike(totalLike);
    }
  };

  useEffect(() => {
    getDataLike();
  }, [activeDrop]);

  if (!setDetail) return <div></div>;

  return (
    <div className="fixed-height-under-header mx-auto flex w-full max-w-[1440px] gap-9 bg-opacity-85 pt-8">
      <div className="flex h-fit w-full max-w-[465px] flex-col gap-4">
        <div className="relative overflow-visible rounded-lg">
          <div className="absolute left-0 top-0 -z-[1] h-[100%] w-[100%] blur-2xl brightness-75"></div>
          <ImageKit
            className="aspect-square rounded-lg"
            src={activeDrop?.collectible.avatar}
          />
        </div>

        <div className="no-scrollbar flex w-full gap-4 overflow-x-auto scroll-smooth">
          {setDetail.collectibles.map((drop, index) => (
            <div
              key={index}
              onClick={() => getDrop(drop.nftContract)}
              className={`relative w-[104px] cursor-pointer select-none overflow-hidden rounded border ${
                drop.nftContract === activeDrop?.collectible.nftContract
                  ? "border-white"
                  : "border-transparent"
              }`}
            >
              <ImageKit
                className="aspect-square w-full select-none"
                src={drop.avatar}
              />
              <div className="absolute left-0 top-0 z-[1] h-full w-full bg-transparent"></div>
            </div>
          ))}
        </div>
      </div>
      {activeDrop && (
        <div className="flex flex-1 flex-col gap-9">
          <div className="flex flex-col gap-5">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-4 uppercase">
                <h3 className="text-[32px] font-bold leading-9">
                  {activeDrop?.collectible?.name}
                </h3>
                <div
                  style={{
                    backgroundColor: getBackgroundColor(
                      activeDrop?.collectible?.rarity as string
                    ),
                  }}
                  className="h-fit rounded-sm border border-dark-black px-3 py-1 font-bold leading-4 text-black"
                >
                  {activeDrop?.collectible?.rarity}
                </div>
              </div>
              {/* <div className="flex gap-4 text-[20px]">
              <IoShareSocialOutline className="cursor-pointer" />
              <TbWorld className="cursor-pointer" />
              <FaSquareXTwitter className="cursor-pointer" />
              <SiFarcaster className="cursor-pointer" />
              <IoLogoDiscord className="cursor-pointer" />
            </div> */}
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-3">
                  <ImageKit
                    className="aspect-square w-full max-w-[52px] rounded-sm"
                    src={setDetail?.creator?.avatar || avtDefault.src}
                  />
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/drophaus/${setDetail?.creator?.address}`}
                        className="text-base font-bold leading-6"
                      >
                        {strShortAddress(setDetail?.creator?.address)}
                      </Link>
                      <TbRosetteDiscountCheckFilled className="text-base leading-4 text-[#63B1FF]" />
                    </div>
                    <div className="divide-gray flex items-center gap-4 divide-x">
                      <div className="flex items-center gap-2">
                        <p className="">
                          {strShortAddress(setDetail?.creator?.address)}
                        </p>
                        <MdOutlineContentCopy
                          onClick={handleCopyAddress}
                          className="text-gray text-base leading-4 hover:text-white cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {/* <Button

                  >
                    Support
                  </Button> */}
                  <Button
                    loading={isLoadingLike}
                    onClick={() =>
                      handleLike(activeDrop?.collectible?.nftContract)
                    }
                    variant="outline"
                  >
                    {isLiked ? "Liked" : "Like"} - {totalLike}
                  </Button>
                </div>
              </div>
              <p className="text-gray text-base leading-5">
                {collectionDetail?.description}
              </p>
            </div>
          </div>

          {activeDrop?.dropType.toLowerCase() ==
            DropTypeEnum.PROTECTED.toLowerCase() && (
            <div className="flex w-full flex-col gap-4 border border-[#3A3A3C] rounded-lg p-6">
              <div className="flex w-full items-center justify-between py-1 text-base font-bold uppercase leading-5">
                <p className="text-gray">Protect this collectible</p>
                <p className="text-white">{timeLeft}</p>
              </div>

              <Button
                loading={isLoadingSecure}
                onClick={() => handleSecure(activeDrop.collectible.nftContract)}
                disabled={
                  isSecured ||
                  !activeDrop.set ||
                  new Date().getTime() > setDetail?.expiryTime
                }
                title={`${isSecured ? "Protected" : "Protect"} - ${activeDrop.secureAmount}`}
                variant="primary"
                className="w-full py-3 capitalize"
              />
              {/* <div className="bg-conic-gradient w-full cursor-pointer p-[1px] duration-700 active:scale-95 disabled:pointer-events-none disabled:opacity-50">
            <div className="w-full rounded-none !bg-[#232733] py-1.5 text-center text-base font-bold capitalize leading-5 text-white">
              Protect - {dropDetail.secureAmount}
            </div>
          </div> */}
            </div>
          )}

          {/* {activeDrop.dropType.toLowerCase() ==
            DropTypeEnum.FREE.toLowerCase() && (
            <div className="flex w-full flex-col gap-4 border border-[#3A3A3C] p-6">
              <div className="flex w-full items-center justify-between py-1 text-base font-bold uppercase leading-5">
                <p className="text-gray">
                  Subcribe creator for a chance to get this NFT
                </p>
                <p className="text-white">{timeLeft}</p>
              </div>
            </div>
          )} */}

          <div className="flex flex-col gap-4">
            <div className="flex gap-1 border-b border-[#3A3A3C] pb-3 text-[20px] font-bold uppercase leading-6">
              <p className="">Metadata</p>
              <p>(3)</p>
            </div>
            <div className="grid w-full grid-cols-3 gap-2">
              <div className="flex w-full flex-col gap-1 border border-[#3A3A3C] rounded-lg px-4 py-2 text-base font-bold uppercase leading-5">
                <p className="text-gray">Name</p>
                <p className="text-white">{activeDrop.collectible.name}</p>
              </div>
              <div className="flex w-full flex-col gap-1 border border-[#3A3A3C] rounded-lg px-4 py-2 text-base font-bold uppercase leading-5">
                <p className="text-gray">Rarity</p>
                <p className="text-white">{activeDrop.collectible.rarity}</p>
              </div>
              <div className="flex w-full flex-col gap-1 border border-[#3A3A3C] rounded-lg px-4 py-2 text-base font-bold uppercase leading-5">
                <p className="text-gray">Drop amount</p>
                <p className="text-white">
                  {activeDrop.collectible.dropAmount}
                </p>
              </div>
            </div>
          </div>

          {/* Listings, Bids, Activities */}
          {/* <div className="flex flex-col gap-4">
          <div className="flex w-full justify-between border-b border-[#3A3A3C] pb-3">
            <div className="flex items-center gap-6 text-[20px] font-bold uppercase leading-6">
              <div className="flex cursor-pointer items-center gap-1 text-white transition-all hover:text-white">
                <p>Listings</p>
                <p>(52)</p>
              </div>
              <div className="text-gray flex cursor-pointer items-center gap-1 transition-all hover:text-white">
                <p>BIDS</p>
                <p>(52)</p>
              </div>
              <div className="text-gray flex cursor-pointer items-center gap-1 transition-all hover:text-white">
                <p>Activities</p>
                <p>(52)</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-[24px]">
              <GoArrowLeft className="text-gray cursor-pointer transition-all hover:text-white" />
              <GoArrowRight className="cursor-pointer text-white" />
            </div>
          </div>
          <table className="min-w-full overflow-hidden text-base font-bold">
            <thead>
              <tr className="text-gray uppercase leading-5">
                <th className="text-left">FROM</th>
                <th className="text-right">PRICE</th>
                <th className="text-right">QUANTITY</th>
                <th className="text-right">EXPIRATION</th>
                <th className="text-right"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="">
                <td className="py-1.5">0x0345...3456</td>
                <td className="py-1.5 text-right">-</td>
                <td className="py-1.5 text-right">-</td>
                <td className="py-1.5 text-right">-</td>
                <td className="py-1.5 text-right">
                  <Button
                    variant="outline"
                    className="h-fit w-full max-w-[72px] rounded-none py-[2px] text-center text-[14px] font-bold leading-5 text-primary outline outline-[1px] outline-primary"
                  >
                    List
                  </Button>
                </td>
              </tr>
              <tr className="">
                <td className="py-1.5">0x0345...3456</td>
                <td className="py-1.5 text-right">
                  4.72
                  <ImageKit
                    className="ml-1 inline-block h-4 w-4"
                    src="https://s3-alpha-sig.figma.com/img/e2e7/b83f/8c2917304d65411d11a40f6888a07845?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZP-9IqgvHzxCJixZc9mS9aWeIiEGD-27tTrzofK5A6-g1zRS-1gU9TO3P4FNrU2Dj68qcyzSU-0wWspGEatJWy5RXROTI5qki3dCk51fJMa-o3PoQ9rY8TyUJmjPn1eZeui6C9EWtHf86a8NXfycyw9IkWvdMFo6F-ZSSow2nNf6iQDbPukz7GpA25bPGZ0gZ1vQpcSXbLQybrIGw0CFVw8MwPHd8QPBGj1BBnPCngIMNteYuQQ6n0vrRS4qSrKAetvJMOGspeDwtcR-cfjdVEMWOBxPDVtHUGH-33RSAma-WgdgECwnqwik6IGSLJQtOpnskavowMXGKtSSvs0zow__"
                    alt="currency"
                  />
                </td>
                <td className="py-1.5 text-right">123</td>
                <td className="py-1.5 text-right">in 12 days</td>
                <td className="py-1.5 text-right">
                  <Button
                    variant="outline"
                    className="h-fit w-full max-w-[72px] rounded-none py-[2px] text-center text-[14px] font-bold leading-5 text-buy outline outline-[1px] outline-buy"
                  >
                    Buy
                  </Button>
                </td>
              </tr>
              <tr className="">
                <td className="py-1.5">0x0345...3456</td>
                <td className="py-1.5 text-right">
                  4.72
                  <ImageKit
                    className="ml-1 inline-block h-4 w-4"
                    src="https://s3-alpha-sig.figma.com/img/e2e7/b83f/8c2917304d65411d11a40f6888a07845?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZP-9IqgvHzxCJixZc9mS9aWeIiEGD-27tTrzofK5A6-g1zRS-1gU9TO3P4FNrU2Dj68qcyzSU-0wWspGEatJWy5RXROTI5qki3dCk51fJMa-o3PoQ9rY8TyUJmjPn1eZeui6C9EWtHf86a8NXfycyw9IkWvdMFo6F-ZSSow2nNf6iQDbPukz7GpA25bPGZ0gZ1vQpcSXbLQybrIGw0CFVw8MwPHd8QPBGj1BBnPCngIMNteYuQQ6n0vrRS4qSrKAetvJMOGspeDwtcR-cfjdVEMWOBxPDVtHUGH-33RSAma-WgdgECwnqwik6IGSLJQtOpnskavowMXGKtSSvs0zow__"
                    alt="currency"
                  />
                </td>
                <td className="py-1.5 text-right">123</td>
                <td className="py-1.5 text-right">in 12 days</td>
                <td className="py-1.5 text-right">
                  <Button
                    variant="outline"
                    className="h-fit w-full max-w-[72px] rounded-none py-[2px] text-center text-[14px] font-bold leading-5 text-buy outline outline-[1px] outline-buy"
                  >
                    Buy
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div> */}
        </div>
      )}
    </div>
  );
};

export default Set;
