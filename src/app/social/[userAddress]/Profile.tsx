"use client";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { VscArrowSwap } from "react-icons/vsc";
import { MdCardGiftcard, MdOutlineContentCopy } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { RiPencilLine } from "react-icons/ri";
import ImageKit from "@/packages/@ui-kit/Image";
import Button from "@/packages/@ui-kit/Button";
import { IoLogoDiscord, IoShareSocialOutline } from "react-icons/io5";
import { FaTelegram } from "react-icons/fa";
import { SiFarcaster } from "react-icons/si";
import { FaSquareXTwitter } from "react-icons/fa6";
import ModalV2 from "@/packages/@ui-kit/Modal/ModelV2";
import CreateEditPerks from "./CreatePerks";
import { useModal } from "@/packages/@ui-kit/Modal/useModal";
import { useSocial } from "@/services/providers/SocialProvider";
import { IPerks } from "@/types/Iperks";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useToast } from "@/packages/@ui-kit/Toast/ToastProvider";
import {
  copyToClipboard,
  formattedContractAddress,
  strShortAddress,
  timeElapsedFromTimestamp,
} from "@/utils/string";

const Profile = () => {
  const { isShow: isShowCreateEditPerks, toggle: toggleCreateEditPerks } =
    useModal();
  const [perksEditing, setPerksEditing] = useState<IPerks | null>(null);
  const { userAddress } = useParams();
  const { onShowToast } = useToast();
  const [timeLeft, setTimeLeft] = useState<string>("-");
  const [processTime, setProcessTime] = useState<string>("0%");

  const { perks, isOwner, toggleSubcribe, isSubcribed, totalSub } = useSocial();

  const handleToggleSubcribe = async () => {
    try {
      await toggleSubcribe(userAddress as string);
    } catch (error) {
      onShowToast("Something went wrong");
    } finally {
    }
  };

  const handleCopyAddress = () => {
    try {
      copyToClipboard(userAddress as string);
      onShowToast("Copy address successfully");
    } catch (error) {
      onShowToast("Something went wrong");
    }
  };

  const handleOpenEditPerks = () => {
    if (!perks) return;
    const miniSecOneDay = 1000 * 60 * 60 * 24;
    // cannot edit peaks before 24 hours
    if (perks.startTime < new Date().getTime() + miniSecOneDay) {
      onShowToast("Peaks can be edited only after 24 hours");
      return;
    }

    setPerksEditing(perks);
    toggleCreateEditPerks();
  };

  const calculateTimeAndProcess = () => {
    if (!perks) return;

    if (new Date().getTime() < perks.startTime) {
      setTimeLeft(
        "Starts in " + timeElapsedFromTimestamp(perks.startTime / 1000)
      );
      setProcessTime("0%");
    }

    if (new Date().getTime() < perks.snapshotTime) {
      setTimeLeft(
        "Snapshot in " + timeElapsedFromTimestamp(perks.snapshotTime / 1000)
      );

      const deltaTime = perks.snapshotTime - perks.startTime;
      const process =
        ((new Date().getTime() - perks.startTime) * 100) / deltaTime;
      setProcessTime(process + "%");
    } else {
      setTimeLeft("Expired");
      setProcessTime("100%");
    }
  };

  useEffect(() => {
    if (perks) {
      calculateTimeAndProcess();
      const intervalId = setInterval(() => {
        calculateTimeAndProcess();
      }, 1000 * 60);

      return () => clearInterval(intervalId);
    }
  }, [perks]);

  return (
    <>
      <ModalV2 isShow={isShowCreateEditPerks} hide={toggleCreateEditPerks}>
        <CreateEditPerks hide={toggleCreateEditPerks} perks={perksEditing} />
      </ModalV2>
      <div className="fixed-height-under-header top-16 mt-0 flex flex-col border-r border-[#3A3A3C] xl:sticky xl:w-[447px] xl:overflow-auto">
        <div className="flex w-full flex-col gap-6 pb-8 pl-8 pr-4 pt-4">
          <div className="flex w-full flex-col gap-4">
            <ImageKit src="" className="aspect-square w-[96px]" />
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center gap-2">
                <h4 className="text-[24px] font-bold uppercase leading-7">
                  {strShortAddress(userAddress as string)}
                </h4>
                <TbRosetteDiscountCheckFilled className="text-[#63B1FF]" />
                <VscArrowSwap className="text-white" />
              </div>
              <div className="divide-gray flex gap-4 divide-x">
                <div className="flex gap-2">
                  <p>{strShortAddress(userAddress as string)}</p>
                  <MdOutlineContentCopy
                    onClick={handleCopyAddress}
                    className="text-gray text-base hover:text-white cursor-pointer"
                  />
                </div>
                <div className="flex gap-5 pl-4 font-bold">
                  <div className="flex gap-2">
                    <p className="text-gray">Subs</p>
                    <p>{totalSub}</p>
                  </div>
                  {/* <div className="flex gap-2">
                    <p className="text-gray">Support</p>
                    <p>140K</p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          {isOwner ? (
            <Button title="Edit profile" variant="outline" className="w-full" />
          ) : (
            <div className="flex gap-2">
              <div className="grid h-full aspect-square place-items-center border border-border rounded-md hover:bg-hover cursor-pointer">
                <MdCardGiftcard />
              </div>
              {isSubcribed ? (
                <Button
                  onClick={handleToggleSubcribe}
                  title="Unsubcribe"
                  variant="outline"
                  className="flex-1"
                />
              ) : (
                <Button
                  onClick={handleToggleSubcribe}
                  title="Subscribe"
                  variant="primary"
                  className="flex-1"
                />
              )}
            </div>
          )}
        </div>

        {/* About */}
        {/* <div className="flex w-full flex-col gap-4 border-b border-t border-[#3A3A3C] pb-8 pl-8 pr-4 pt-4">
          <div className="flex w-full justify-between">
            <h3 className="text-[20px] font-bold uppercase leading-6">about</h3>
            <div className="flex gap-4 text-[20px]">
              <IoShareSocialOutline />
              <TbWorld />
              <FaTelegram />
              <FaSquareXTwitter />
              <SiFarcaster />
              <IoLogoDiscord />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-gray text-base leading-5">
              Photography drops every week from Andrew Mason. Andrew Mason is a
              New York City and Los Angeles based photographer, videographer,
              content creator, and editor. Andrew has had a camera in hand since
              age 11 and his work is inspired by a love for art, design...
            </p>
            <p className="font-bold text-[#63B1FF] ">Read more</p>
          </div>
        </div> */}

        <div className="flex w-full flex-col gap-8 pb-8 pl-8 pr-4 pt-4">
          <div className="flex w-full flex-col gap-4">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-1">
                <h3 className="text-[20px] font-bold uppercase leading-6">
                  Perks
                </h3>
                {perks && isOwner && (
                  <RiPencilLine
                    onClick={handleOpenEditPerks}
                    className="text-gray text-base hover:text-white cursor-pointer"
                  />
                )}
              </div>

              {isOwner ? (
                perks ? (
                  <Link href={`/create-drop?perks=${perks._id}`}>
                    <Button
                      title="Create rewards"
                      variant="outline"
                      className="border-white text-white"
                    />
                  </Link>
                ) : (
                  <Button
                    onClick={toggleCreateEditPerks}
                    title="Create Perks"
                    variant="outline"
                    className="border-white text-white"
                  />
                )
              ) : (
                <></>
              )}
            </div>
            {perks ? (
              <div className="text-gray flex flex-col gap-3 text-base leading-5">
                <div dangerouslySetInnerHTML={{ __html: perks.perks }} />
              </div>
            ) : (
              <div className="text-gray flex flex-col gap-3 text-base leading-5">
                <p>{`🤔 What is perks?`}</p>
                <p>{`Perks are customized rewards that creators offer to fans to show appreciation, foster engagement, and highlight what they value on the channel.`}</p>
                <p>{`They serve as a way to deliver rewards to your supporters and help communicate your unique brand and values.`}</p>
                <p>{`//For example:`}</p>
                <p>
                  <span>{`✨Monday:`}</span>
                  <br />
                  <span>
                    {`Base/Common Drop (Open Supply) available to be protected for 1
                week`}
                  </span>
                </p>
                <p>
                  <span>{`✨Friday:`}</span>
                  <br />
                  <span>
                    {`Rare (X Supply) Randomly distributed among all Thankers`}
                  </span>
                </p>
                <p>
                  <span>{`Legendary (Y Supply):`}</span>
                  <br />
                  <span>{`Top 100 Thankers locked in to secure`}</span>
                  <br />
                  <span>{`400 Randomly Distributed among all Thankers`}</span>
                </p>
                <p>
                  <span>{`Ultimate (1 of 1)`}</span>
                  <br />
                  <span>{`Rewarded to the Top thanker at the end of the snapshot`}</span>
                </p>
              </div>
            )}
          </div>
          <div className="flex w-full flex-col gap-4">
            <div className="flex w-full justify-between text-base font-bold leading-5">
              <p className="uppercase">{timeLeft}</p>
              <p className="text-gray uppercase">Till snapshot</p>
            </div>
            <div className="relative h-[2px] w-full bg-[#3A3A3C]">
              <div
                style={{ width: processTime }}
                className="absolute left-0 top-0 h-[2px] bg-white "
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
