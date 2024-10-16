"use client";

import Checkbox from "@/lib/@core/Checkbox";
import React, { useEffect, useState } from "react";
import { usePutUnStakeNFT } from "@/services/api/usePutUnStakeNFT";
import { useAccount } from "@starknet-react/core";
import { useNotify } from "@/services/providers/NotifyProvider";
import { CallData, RpcProvider, uint256 } from "starknet";
import TxHash from "../TxHash";
import Modal from "@/packages/@ui-kit/Modal";
import Button from "@/packages/@ui-kit/Button";
import { IoClose } from "react-icons/io5";
import ImageEditor from "@/packages/@ui-kit/Image/ImageEditor";
import FormatAddress from "../FormatAddress";
import { MdContentCopy } from "react-icons/md";
import Input from "@/packages/@ui-kit/Input";
import { useAccountContext } from "@/services/providers/AccountProvider";
import { useAuth } from "@/services/providers/AuthProvider";
import { IProfile } from "@/types/IProfile";

interface IEditProfilePopupProps {
  isOpen: boolean;
  toggleModal: () => void;
  profile: IProfile;
}

const EditProfilePopup: React.FC<IEditProfilePopupProps> = (props) => {
  const { isOpen, toggleModal, profile } = props;
  const { onUpdateProfile, getProfileByAddressOwner } = useAccountContext();
  const [avatar, setAvatar] = useState<string | null>(null);
  const { profileOwner } = useAccountContext();
  const [profileData, setProfileData] = useState<any>();

  const [uploading, setUploading] = useState(false);

  const handleUpdateProfile = () => {
    setUploading(true);
    const body = createProfileFormData(profileData);
    onUpdateProfile(body)
      .then(() => {
        toggleModal();
        getProfileByAddressOwner();
      })
      .finally(() => {
        setUploading(false);
      });
  };

  useEffect(() => {
    if (profileOwner) {
      setProfileData(profileOwner);
    }
  }, [profileOwner]);

  const addFormData = (
    formData: FormData,
    data: any,
    parentKey: string | null = null,
  ): FormData => {
    if (data && typeof data === "object" && !(data instanceof File)) {
      Object.keys(data).forEach((key) => {
        addFormData(
          formData,
          data[key],
          parentKey ? `${parentKey}[${key}]` : key,
        );
      });
    } else {
      if (data !== undefined && data !== null) {
        formData.append(parentKey as string, data);
      }
    }

    return formData;
  };

  const createProfileFormData = (profile: IProfile): FormData => {
    let formData = new FormData();

    // Add all other profile data
    formData = addFormData(formData, profile);

    // Append the avatar image separately, if it exists
    if (avatar) {
      formData.append("avatar", avatar);
    }

    return formData;
  };

  const onSetFormData = (key: string, value: string) => {
    const keys = key.split(".");

    if (keys.length > 1) {
      setProfileData((prevData: any) => {
        let updatedData = { ...prevData };
        let temp: any = updatedData;
        for (let i = 0; i < keys.length - 1; i++) {
          temp[keys[i]] = { ...temp[keys[i]] };
          temp = temp[keys[i]];
        }
        temp[keys[keys.length - 1]] = value;
        return updatedData;
      });
    } else {
      setProfileData({ ...profileData, [key]: value });
    }
  };

  return (
    <Modal isShow={isOpen} hide={toggleModal}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold">Edit Profile</p>
          <Button icon={<IoClose />} variant="icon" onClick={toggleModal} />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-center gap-4">
            <ImageEditor
              src={profileData?.avatar}
              className="h-20 w-20 rounded-full"
              onChange={(e: any) => setAvatar(e)}
            />
          </div>

          <Input
            title="Account Name"
            placeholder="Account Name"
            value={profileData?.nick_name}
            onChange={(e: any) => onSetFormData("nick_name", e.target.value)}
          />

          <div className="flex flex-col gap-2">
            <p>About</p>
            <textarea
              value={profileData?.about}
              onChange={(e: any) => onSetFormData("about", e.target.value)}
              placeholder="Provide information about your NFT"
              className="h-[100px] w-full rounded-md border border-stroke bg-transparent p-4 outline-none focus:border-primary"
            ></textarea>
          </div>

          <div className="flex flex-col gap-2">
            <p>Social</p>

            <Input
              placeholder="Input your website link"
              value={profileData?.social?.website}
              onChange={(e: any) =>
                onSetFormData("social.website", e.target.value)
              }
            />
            <Input
              placeholder="Input your X account"
              value={profileData?.social?.x}
              onChange={(e: any) => onSetFormData("social.x", e.target.value)}
            />
            <Input
              placeholder="Input your Telegram"
              value={profileData?.social?.telegram}
              onChange={(e: any) =>
                onSetFormData("social.telegram", e.target.value)
              }
            />
            <Input
              placeholder="Input your Warpcast"
              value={profileData?.social?.warpcast}
              onChange={(e: any) =>
                onSetFormData("social.warpcast", e.target.value)
              }
            />
            <Input
              placeholder="Input your Discord channel"
              value={profileData?.social?.discord}
              onChange={(e: any) =>
                onSetFormData("social.discord", e.target.value)
              }
            />
          </div>

          <Button
            loading={uploading}
            variant="primary"
            className="w-full"
            onClick={() => handleUpdateProfile()}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditProfilePopup;
