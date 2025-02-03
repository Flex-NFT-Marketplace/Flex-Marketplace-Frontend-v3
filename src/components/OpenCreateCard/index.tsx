import ImageKit from "@/packages/@ui-kit/Image";
import {
  MdOutlineContentCopy,
  MdOutlineDownload,
  MdOutlineInsertComment,
  MdOutlineLocalFireDepartment,
} from "react-icons/md";
import check from "@/assets/badge-check.svg";
import Button from "@/packages/@ui-kit/Button";
import { FaRegCalendarCheck } from "react-icons/fa";
import Input from "@/packages/@ui-kit/Input";
import { usePostLike } from "@/services/api/flexhaus/social/usePostLike";
import { useDeleteLike } from "@/services/api/flexhaus/social/useDeleteLike";
import { useGetTotalLike } from "@/services/api/flexhaus/social/useGetTotalLike";
import { useEffect } from "react";

const OpenCreateCard = () => {
  const _postLike = usePostLike();
  const _deleteLike = useDeleteLike();
  const _getTotalLike = useGetTotalLike();

  const toggleLike = async () => {
    const isLiked = true;
    if (isLiked) {
      await onLike();
    } else {
      await onUnLike();
    }
  };

  const onUnLike = async () => {
    try {
      await _deleteLike.mutateAsync("1");
    } catch (error) {
      console.log(error);
    }
  };

  const onLike = async () => {
    try {
      await _postLike.mutateAsync("1");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // _getTotalLike.mutateAsync("1");
  }, []);

  return (
    <div className="flex gap-2 px-5 py-4">
      <ImageKit src="" alt="" className="aspect-square h-[52px] w-[52px]" />
      <div className="flex flex-col gap-4">
        <div className="flex h-[52px] flex-col justify-center">
          <div className="flex justify-between">
            <div className="flex items-center gap-1 uppercase">
              <p>BEANZ Official</p>
              <ImageKit src={check} alt="check" className="h-4 w-4" />
            </div>
            <p>14/07/2024</p>
          </div>
          <div className="flex items-center gap-2">
            <p>0x00dCE...DCGH</p>
            <MdOutlineContentCopy className="h-4 w-4 text-grays hover:text-white" />
          </div>
        </div>
        <ImageKit src="" alt="" className="w-full" />
        <div>
          <div className="flex items-center justify-between">
            <p className="font-bold">BEANZ Official</p>
            <div className="flex flex-1 justify-end gap-2">
              <Button title="Claim-free" variant="outline" />
              <Button title="Mint" variant="outline" className="" />
            </div>
          </div>
          <p className="mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi u...
          </p>
        </div>
        <div className="flex items-center gap-2 text-grays">
          <FaRegCalendarCheck />
          <p>
            {`14/07/2024 13:30`} - {`20/07/2024 13:30`}
          </p>
        </div>
        <div className="flex gap-2">
          <div className="cursor-pointer hover:bg-hover flex w-[50px] items-center justify-center gap-2 rounded-lg border border-line py-1">
            <MdOutlineInsertComment />
            <p>3</p>
          </div>
          <div
            onClick={toggleLike}
            className="cursor-pointer hover:bg-hover flex w-[50px] items-center justify-center gap-2 rounded-lg border border-line py-1"
          >
            <MdOutlineLocalFireDepartment />
            <p>4</p>
          </div>
          <div className="cursor-pointer hover:bg-hover flex w-[50px] items-center justify-center gap-2 rounded-lg border border-line py-1">
            <MdOutlineDownload />
            <p>3</p>
          </div>
          <Input
            placeholder="Add comment"
            classContainer="flex-1 !max-w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default OpenCreateCard;
