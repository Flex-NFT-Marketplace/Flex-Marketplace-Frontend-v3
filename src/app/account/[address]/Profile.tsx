"use client";
import FormatAddress from "@/components/FormatAddress";
import { IoSettings } from "react-icons/io5";
import { useAccountContext } from "@/services/providers/AccountProvider";
import { strShortAddress } from "@/utils/string";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdContentCopy } from "react-icons/md";
import UserImg from "@/assets/user.png";
import Button from "@/packages/@ui-kit/Button";
import EditProfilePopup from "@/components/Popup/EditProfilePopup";
import { useModal } from "@/packages/@ui-kit/Modal/useModal";
import { useAuth } from "@/services/providers/AuthProvider";
import ImageKit from "@/packages/@ui-kit/Image";
import { getCookie } from "@/helpers/cookie";
import { ACCESS_TOKEN } from "@/constants/cookies";

const Profile = () => {
  const { address } = useParams();
  const { profile, setAddress, profileOwner } = useAccountContext();
  const { signMessageValidate } = useAuth();

  const { isShow: isShowEditProfile, toggle: toggleShowEditProfile } =
    useModal();

  useEffect(() => {
    setAddress(address as string);
  }, [address]);
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText((address as string) || "");
      setCopied(true);
    } catch (err) {
      console.error("Failed to copy address:", err);
    } finally {
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const openEditProfile = () => {
    const token = getCookie(ACCESS_TOKEN);
    if (!token) {
      signMessageValidate().then((res) => {
        if (res) {
          toggleShowEditProfile();
        }
      });
      return;
    } else toggleShowEditProfile();
  };

  return (
    <div className="flex  items-center justify-between border-b border-stroke px-8 py-3 max-md:px-5">
      <EditProfilePopup
        isOpen={isShowEditProfile}
        toggleModal={toggleShowEditProfile}
        profile={profileOwner as any}
      />

      <div className="flex gap-3 max-sm:items-center">
        {/* <ImageKit
          src={
            profile?.avatar ||
            profile?.image == "https://starknet.id/api/identicons/0" ||
            profile?.image.includes("tomato-quiet-ape-126")
              ? UserImg.src
              : profile?.image
          }
          alt=""
          className="h-[52px] w-[52px] rounded-sm"
        /> */}

        <ImageKit
          // src={profile?.avatar || profile?.image || UserImg.src}
          src={UserImg.src}
          alt=""
          className="h-[52px] w-[52px] rounded-sm"
        />

        <div className="flex flex-col justify-center">
          <p className="text-2xl font-bold">
            {
              // profile?.username ||
              //   profile?.nick_name ||
              strShortAddress(address as string)
            }
          </p>

          <div className="flex items-center max-sm:flex-col max-sm:items-start">
            <div className="flex items-center">
              <FormatAddress address={address as string} />
              <MdContentCopy
                className="ml-2 cursor-pointer text-sm text-grays"
                onClick={copyAddress}
              />
              <p className="ml-2 text-xs"> {copied ? "Copied!" : ""}</p>
            </div>
            <div className="mx-4 h-4 w-[1px] bg-stroke max-sm:hidden"></div>
            <div className="flex gap-2">
              <p className="text-sm text-grays">Listed</p>
              <p className="ml-2 text-sm">-k</p>
              <p className="ml-5 text-sm text-grays">Est.Value</p>
              <p className="ml-2 text-sm">-%</p>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="flex gap-7 font-normal">
        <Button
          icon={<IoSettings />}
          variant="icon"
          onClick={openEditProfile}
        />
      </div> */}
    </div>
  );
};

export default Profile;
