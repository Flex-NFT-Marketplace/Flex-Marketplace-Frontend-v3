"use client";

import Button from "@/packages/@ui-kit/Button";
import ImageKit from "@/packages/@ui-kit/Image";
import Input from "@/packages/@ui-kit/Input";
import { getShortTraits } from "@/utils/string";
import { ChangeEvent, useEffect, useState } from "react";
import { AiFillDiscord } from "react-icons/ai";
import { FaTelegram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";
import { RiGlobalLine } from "react-icons/ri";
import { SiFarcaster } from "react-icons/si";
import { useMutation } from "@tanstack/react-query";
import { axiosWithAccessToken } from "@/axiosConfig/axiosConfig";
import usePostMetadata from "@/services/api/usePostMetadata";
import { toast } from "react-toastify";

interface EditProfileModelProps {
  hide: () => void;
}

const updateProfile = () => {
  return useMutation({
    mutationKey: ["UPDATE_PROFILE"],
    mutationFn: async (bodyData: {
      username?: string;
      email?: string;
      avatar: string;
      cover?: string;
      about: string;
      social: {
        twitter?: string;
        telegram?: string;
        discord?: string;
        website?: string;
        warpcast?: string;
      };
    }) => {
      const { data } = await axiosWithAccessToken.post("user/update-profile", {
        ...bodyData, // Sửa lại để gửi bodyData trực tiếp thay vì nested
      });
      return data;
    },
  });
};

const EditProfileModel: React.FC<EditProfileModelProps> = ({ hide }) => {
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );
  const [fileAvt, setFileAvt] = useState<File | null>(null);
  const [socialLinks, setSocialLinks] = useState({
    website: "",
    telegram: "",
    twitter: "",
    warpcast: "",
    discord: "",
  });
  const [about, setAbout] = useState<string>("");
  const _postMetadata = usePostMetadata();

  const { mutate, isPending } = updateProfile();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as any;

    if (name === "fileNftImage" && files && files[0]) {
      const file = files[0];
      if (file.size > 1 * 1024 * 1024) {
        toast("File size exceeds 1MB limit!");
        return;
      }
      const validTypes = [
        "image/jpeg",
        "image/png",
        "image/svg+xml",
        "image/gif",
      ];
      if (!validTypes.includes(file.type)) {
        toast("Invalid file type! Please upload JPEG, PNG, SVG, or GIF.");
        return;
      }

      setFileAvt(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else if (name === "nftDescription") {
      setAbout(value);
    } else {
      setSocialLinks((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleUpdate = async () => {
    if (!fileAvt) {
      toast("Please upload an avatar!");
      return;
    }
    if (!about.trim()) {
      toast("Please enter about information!");
      return;
    }

    const avatarUrl = await uploadAvatar(fileAvt);

    const socialData: {
      twitter?: string;
      telegram?: string;
      discord?: string;
      website?: string;
      warpcast?: string;
    } = {};
    if (socialLinks.twitter) socialData.twitter = socialLinks.twitter;
    if (socialLinks.telegram) socialData.telegram = socialLinks.telegram;
    if (socialLinks.discord) socialData.discord = socialLinks.discord;
    if (socialLinks.website) socialData.website = socialLinks.website;
    if (socialLinks.warpcast) socialData.warpcast = socialLinks.warpcast;

    const bodyData = {
      about: about,
      avatar: avatarUrl,
      social: socialData,
    };

    mutate(bodyData, {
      onSuccess: (data) => {
        toast("Profile updated successfully:", data);
        hide();
      },
      onError: (error) => {
        console.error("Update failed:", error);
        toast("Failed to update profile. Please try again.");
      },
    });
  };

  const uploadAvatar = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("name", "avatar");
    formData.append("file", file);

    // Gửi file lên server để lấy metadata ID
    const res = await _postMetadata.mutateAsync(formData);
    const uri = `${process.env.NEXT_PUBLIC_API}metadata/${res.data}`;

    // Fetch dữ liệu JSON từ uri
    const response = await fetch(uri);
    if (!response.ok) {
      throw new Error(`Failed to fetch metadata from ${uri}`);
    }
    const metadata = await response.json();

    // Lấy field image từ JSON và trả về
    if (!metadata.image) {
      throw new Error("Image URL not found in metadata");
    }
    console.log(metadata.image);

    return metadata.image;
  };

  return (
    <div className="p-4 border border-border rounded-md flex flex-col gap-4 w-[600px] max-w-full">
      <p className="text-2xl text-primary uppercase text-center font-bold">
        Edit Profile
      </p>

      <div className="flex flex-col gap-2">
        <div>
          <p className="font-bold">
            Avatar <span className="text-cancel">*</span>
          </p>
          <div className="mt-2 flex items-center gap-4 rounded-md border border-line px-5 py-6">
            <label
              htmlFor="nftImage"
              className="grid aspect-square h-[72px] w-[72px] cursor-pointer place-items-center overflow-hidden rounded-md border border-line"
            >
              {imagePreview ? (
                <ImageKit
                  src={imagePreview}
                  alt="AVT Image"
                  className="h-full w-full object-cover"
                />
              ) : (
                <FiUpload className="text-xl text-gray-400" />
              )}
              <input
                type="file"
                id="nftImage"
                name="fileNftImage"
                accept="image/*"
                className="hidden"
                onChange={handleChange}
              />
            </label>
            <div>
              <p className="font-bold text-white">Click to upload</p>
              <p className="mt-2 text-grays">
                Recommend size: 512 x 512. File types: JPEG, PNG, SVG, GIF, Max
                1MB.
              </p>
              {fileAvt && (
                <p className="mt-2 text-green-500">
                  Selected File: {getShortTraits(fileAvt.name, 20)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-bold">Social links</p>
        <div className="flex gap-2">
          <Input
            icon={<RiGlobalLine />}
            placeholder="https://yourwebsite.com"
            name="website"
            value={socialLinks.website}
            onChange={handleChange}
            classContainer="w-full !max-w-full"
          />
        </div>
        <div className="flex gap-2">
          <Input
            icon={<FaTelegram />}
            placeholder="https://t.me/username"
            name="telegram"
            value={socialLinks.telegram}
            onChange={handleChange}
            classContainer="w-full !max-w-full"
          />
        </div>
        <div className="flex gap-2">
          <Input
            icon={<FaSquareXTwitter />}
            placeholder="https://twitter.com/username"
            name="twitter"
            value={socialLinks.twitter}
            onChange={handleChange}
            classContainer="w-full !max-w-full"
          />
        </div>
        <div className="flex gap-2">
          <Input
            icon={<SiFarcaster />}
            placeholder="https://warpcast.com/username"
            name="warpcast"
            value={socialLinks.warpcast}
            onChange={handleChange}
            classContainer="w-full !max-w-full"
          />
        </div>
        <div className="flex gap-2">
          <Input
            icon={<AiFillDiscord />}
            placeholder="https://discord.gg/username"
            name="discord"
            value={socialLinks.discord}
            onChange={handleChange}
            classContainer="w-full !max-w-full"
          />
        </div>
      </div>

      <div>
        <p className="font-bold">
          About <span className="text-cancel">*</span>
        </p>
        <div className="mt-2 rounded-md border border-line px-5 py-2.5 hover:border-primary focus:border-primary">
          <textarea
            name="nftDescription"
            className="mt-2 h-[76px] w-full resize-none bg-transparent outline-none placeholder:font-normal placeholder:text-white/50"
            placeholder="Input drop description"
            value={about}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex justify-between gap-4">
        <Button
          onClick={hide}
          title="Cancel"
          className="flex-1"
          variant="outline"
        />
        <Button
          loading={isPending}
          onClick={handleUpdate}
          title="Update"
          className="flex-1"
        />
      </div>
    </div>
  );
};

export default EditProfileModel;
