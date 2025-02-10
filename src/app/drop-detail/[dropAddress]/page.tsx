"use client";
import ImageKit from "@/packages/@ui-kit/Image";
import { TbWorld } from "react-icons/tb";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { IoLogoDiscord, IoShareSocialOutline } from "react-icons/io5";
import { SiFarcaster } from "react-icons/si";
import { FaSquareXTwitter } from "react-icons/fa6";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { MdOutlineContentCopy } from "react-icons/md";
import Button from "@/packages/@ui-kit/Button";
import { useEffect, useRef, useState } from "react";
import { FastAverageColor } from "fast-average-color";
import { useDropDetail } from "@/services/providers/DropDetailProvider";
import { getBackgroundColor } from "@/app/create-drop/step2";
import {
  copyToClipboard,
  strShortAddress,
  timeElapsedFromTimestamp,
} from "@/utils/string";
import { useToast } from "@/packages/@ui-kit/Toast/ToastProvider";
import { DropTypeEnum } from "@/services/providers/CreateDropProvider";

const Drop = () => {
  const srcList = [
    "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSC4DtHTGprsp7K8u0ZlfSDmIDplvQYH5vniT0I3rpcl6wqBh8b",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Golden_tabby_and_white_kitten_n01.jpg/1200px-Golden_tabby_and_white_kitten_n01.jpg",
    "https://cdnphoto.dantri.com.vn/COm1qksauO2sqAC-gVVI2DdH_1I=/thumb_w/1020/2023/01/24/khoa-hocdocx-1674520013659.png",
    "https://image.baophapluat.vn/1200x630/Uploaded/2024/aeg-azonlde/2023_01_24/anh-nen-dien-thoai-cute-con-meo-de-thuong-mien-phi-tai-3-8131.jpg",
    "https://mekoong.com/wp-content/uploads/2022/10/in-cat_in_glasses.jpg",
  ];

  const [activeSrc, setActiveSrc] = useState<number>(0);
  const [mainColor, setMainColor] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { onShowToast } = useToast();
  const { isLiked, toggleLike, totalLike, isSecured, secure, dropDetail } =
    useDropDetail();
  const [timeLeft, setTimeLeft] = useState<string>("-");
  const [isLoadingSecure, setIsLoadingSecure] = useState(false);
  const [isLoadingLike, setIsLoadingLike] = useState(false);

  const handleSecure = async (collectible: string) => {
    try {
      setIsLoadingSecure(true);
      await secure(collectible);
    } catch (error) {
      onShowToast("Something went wrong");
    } finally {
      setIsLoadingSecure(false);
    }
  };

  const handleLike = async (collectible: string) => {
    try {
      setIsLoadingLike(true);
      await toggleLike(collectible);
    } catch (error) {
      onShowToast("Something went wrong");
    } finally {
      setIsLoadingLike(false);
    }
  };

  const handleCopyAddress = () => {
    try {
      copyToClipboard(dropDetail?.creator?.address as string);
      onShowToast("Copy address successfully");
    } catch (error) {
      onShowToast("Something went wrong");
    }
  };

  const handleScroll = (ref: React.RefObject<HTMLDivElement>) => {
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const onMouseDown = (e: MouseEvent | TouchEvent) => {
      if (!ref.current) return;
      isDown = true;
      ref.current.classList.add("active");
      startX =
        e instanceof MouseEvent
          ? e.pageX - ref.current.offsetLeft
          : e.touches[0].pageX - ref.current.offsetLeft;
      scrollLeft = ref.current.scrollLeft;
    };

    const onMouseLeave = () => {
      if (!ref.current) return;
      isDown = false;
      ref.current.classList.remove("active");
    };

    const onMouseUp = () => {
      if (!ref.current) return;
      isDown = false;
      ref.current.classList.remove("active");
    };

    const onMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!isDown || !ref.current) return;
      e.preventDefault();
      const x =
        e instanceof MouseEvent
          ? e.pageX - ref.current.offsetLeft
          : e.touches[0].pageX - ref.current.offsetLeft;
      const walk = (x - startX) * 2;
      ref.current.scrollLeft = scrollLeft - walk;
    };

    const current = ref.current;
    current?.addEventListener("mousedown", onMouseDown);
    current?.addEventListener("mouseleave", onMouseLeave);
    current?.addEventListener("mouseup", onMouseUp);
    current?.addEventListener("mousemove", onMouseMove);

    current?.addEventListener("touchstart", onMouseDown);
    current?.addEventListener("touchend", onMouseUp);
    current?.addEventListener("touchmove", onMouseMove);

    return () => {
      current?.removeEventListener("mousedown", onMouseDown);
      current?.removeEventListener("mouseleave", onMouseLeave);
      current?.removeEventListener("mouseup", onMouseUp);
      current?.removeEventListener("mousemove", onMouseMove);

      current?.removeEventListener("touchstart", onMouseDown);
      current?.removeEventListener("touchend", onMouseUp);
      current?.removeEventListener("touchmove", onMouseMove);
    };
  };

  // Hàm bắt đầu interval
  const startInterval = () => {
    if (intervalRef.current === null) {
      intervalRef.current = setInterval(() => {
        setActiveSrc((prev) => (prev === srcList.length - 1 ? 0 : prev + 1));
      }, 2500);
    }
  };

  const stopInterval = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startInterval();

    return () => {
      stopInterval();
    };
  }, []);

  useEffect(() => {
    handleScroll(scrollRef);
  }, []);

  useEffect(() => {
    if (activeSrc !== undefined) {
      const fac = new FastAverageColor();
      fac
        .getColorAsync(srcList[activeSrc])
        .then((color) => {
          setMainColor(color.hex);
        })
        .catch((error) => {
          console.error("Error getting average color:", error);
        });
    }
  }, [activeSrc]);

  useEffect(() => {
    if (dropDetail) {
      const intervalId = setInterval(() => {
        if (new Date().getTime() < dropDetail.set?.startTime) {
          setTimeLeft(
            "Starts in " +
              timeElapsedFromTimestamp(dropDetail.set?.startTime / 1000)
          );
        } else if (new Date().getTime() < dropDetail.set?.expiryTime) {
          setTimeLeft(
            "Ends in " +
              timeElapsedFromTimestamp(dropDetail.set?.expiryTime / 1000)
          );
        } else {
          setTimeLeft("Expired");
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [dropDetail]);

  if (!dropDetail) return <div></div>;

  return (
    <div className="fixed-height-under-header mx-auto flex w-full max-w-[1440px] gap-9 bg-opacity-85 pt-8">
      <div
        className="flex h-fit w-full max-w-[465px] flex-col gap-4"
        onMouseEnter={stopInterval}
        onMouseLeave={startInterval}
      >
        <div className="relative overflow-visible rounded-lg">
          <div
            className="absolute left-0 top-0 -z-[1] h-[100%] w-[100%] blur-2xl brightness-75"
            style={{ background: mainColor }}
          ></div>
          <ImageKit
            className="aspect-square rounded-lg"
            src={srcList[activeSrc]}
          />
        </div>

        <div
          ref={scrollRef}
          className="no-scrollbar grid w-full grid-flow-col gap-4 overflow-x-auto scroll-smooth"
        >
          {srcList.map((src, index) => (
            <div
              key={index}
              onClick={() => setActiveSrc(index)}
              className={`relative w-[104px] cursor-pointer select-none overflow-hidden rounded border ${
                activeSrc === index ? "border-white" : "border-transparent"
              }`}
            >
              <ImageKit
                className="aspect-square w-full select-none"
                src={src}
              />
              <div className="absolute left-0 top-0 z-[1] h-full w-full bg-transparent"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-9">
        <div className="flex flex-col gap-5">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-4 uppercase">
              <h3 className="text-[32px] font-bold leading-9">
                {dropDetail?.collectible?.name}
              </h3>
              <div
                style={{
                  backgroundColor: getBackgroundColor(
                    dropDetail?.collectible?.rarity
                  ),
                }}
                className="h-fit rounded-sm border border-dark-black px-3 py-1 font-bold leading-4 text-black"
              >
                {dropDetail?.collectible?.rarity}
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
                  src="https://s3-alpha-sig.figma.com/img/0271/2576/db54e48be34970895bdc776931ad8ee9?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=c7ow2DDOT6FzNNu8xFavdyJh2s~OAfbgfHXvCXk694fPtSCDwcCiR9GKDxMoE-rQ6wB7qHdcSCGLaniz-qPVASP8nYDGox7rJTXrMM1LAAZGdeJNs6c2T~53lK8pns-h~XzUBH-fApVJlxpLhgc3c~thZqz7Mn9n0iLecqYtUwqe4yAZ7eKB~VT0zL9dQBBmh2WUL7letcK-WZjXTymenRrmC6ggoyVPk0Ky-AyWtYrwy4DR6eDu2L4QE5KWNBw5~6JhgrHJnWt6yccbd5esy9cfI9OBMPn9KByBfpg1-Kv3HQLAj4kZb0C5rtzKlnIxRR2-yHJ77-uD~mhxURxzmg__"
                />
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1">
                    <p className="text-base font-bold leading-6">
                      {strShortAddress(dropDetail?.creator?.address)}
                    </p>
                    <TbRosetteDiscountCheckFilled className="text-base leading-4 text-[#63B1FF]" />
                  </div>
                  <div className="divide-gray flex items-center gap-4 divide-x">
                    <div className="flex items-center gap-2">
                      <p className="">
                        {strShortAddress(dropDetail?.creator?.address)}
                      </p>
                      <MdOutlineContentCopy
                        onClick={handleCopyAddress}
                        className="text-gray text-base leading-4 hover:text-white cursor-pointer"
                      />
                    </div>
                    {/* <div className="flex items-center gap-2 pl-4 font-bold leading-4">
                      <p className=" text-gray">Items</p>
                      <p className="text-white">19.9k</p>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                // className="h-fit !rounded-none px-4 py-[2px] text-base font-bold leading-5 text-black"
                >
                  Support
                </Button>
                <Button
                  loading={isLoadingLike}
                  onClick={() => handleLike(dropDetail.collectible.nftContract)}
                  variant="outline"
                >
                  {isLiked ? "Liked" : "Like"} - {totalLike}
                </Button>
              </div>
            </div>
            <p className="text-gray text-base leading-5">
              Zoolana.io is a groundbreaking mobile strategy game being built on
              Solana. Players will trade assets, raise armies, and play with
              friends in a game with strategic...
            </p>
          </div>
        </div>

        {dropDetail.dropType.toLowerCase() ==
          DropTypeEnum.PROTECTED.toLowerCase() && (
          <div className="flex w-full flex-col gap-4 border border-[#3A3A3C] p-6">
            <div className="flex w-full items-center justify-between py-1 text-base font-bold uppercase leading-5">
              <p className="text-gray">Protect this collectible</p>
              <p className="text-white">{timeLeft}</p>
            </div>

            <Button
              loading={isLoadingSecure}
              onClick={() => handleSecure(dropDetail.collectible.nftContract)}
              disabled={
                isSecured ||
                !dropDetail.set ||
                new Date().getTime() > dropDetail.set?.expiryTime
              }
              title={`${isSecured ? "Protected" : "Protect"} - ${dropDetail.secureAmount}`}
              variant="primary"
              className="w-full rounded-none py-3 capitalize"
            />
            {/* <div className="bg-conic-gradient w-full cursor-pointer p-[1px] duration-700 active:scale-95 disabled:pointer-events-none disabled:opacity-50">
            <div className="w-full rounded-none !bg-[#232733] py-1.5 text-center text-base font-bold capitalize leading-5 text-white">
              Protect - {dropDetail.secureAmount}
            </div>
          </div> */}
          </div>
        )}

        <div className="flex flex-col gap-4">
          <div className="flex gap-1 border-b border-[#3A3A3C] pb-3 text-[20px] font-bold uppercase leading-6">
            <p className="">Metadata</p>
            <p>(3)</p>
          </div>
          <div className="grid w-full grid-cols-3 gap-2">
            <div className="flex w-full flex-col gap-1 border border-[#3A3A3C] px-4 py-2 text-base font-bold uppercase leading-5">
              <p className="text-gray">Name</p>
              <p className="text-white">{dropDetail.collectible.name}</p>
            </div>
            <div className="flex w-full flex-col gap-1 border border-[#3A3A3C] px-4 py-2 text-base font-bold uppercase leading-5">
              <p className="text-gray">Rarity</p>
              <p className="text-white">{dropDetail.collectible.rarity}</p>
            </div>
            <div className="flex w-full flex-col gap-1 border border-[#3A3A3C] px-4 py-2 text-base font-bold uppercase leading-5">
              <p className="text-gray">Drop amount</p>
              <p className="text-white">{dropDetail.collectible.dropAmount}</p>
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
    </div>
  );
};

export default Drop;
