import { MdOutlineDescription } from "react-icons/md";
import { useNftContext } from "@/services/providers/NFTProvider";
import { useRouter } from "next/navigation";

import { IoMdShare } from "react-icons/io";
import ImageKit from "@/packages/@ui-kit/Image";

const Profile = () => {
  const router = useRouter();
  const onNavigate = (path: string) => {
    router.push(path);
  };

  const { nftStaging } = useNftContext();

  const onNavigationCollection = () => {
    onNavigate("/collection/" + nftStaging?.nftContract);
  };

  return (
    <div className="flex w-[445px] flex-col max-lg:w-full">
      <p className="truncate text-2xl font-normal">{nftStaging?.name}</p>

      <div className="mt-1 flex items-center justify-between">
        <div
          className="flex cursor-pointer items-center"
          onClick={onNavigationCollection}
        >
          <ImageKit
            src={
              nftStaging?.nftCollection.avatar ||
              "https://via.placeholder.com/272"
            }
            alt=""
            className="h-5 w-5"
          />
          <p className="ml-2 font-normal hover:text-primary">
            {nftStaging?.nftCollection.name}
          </p>
        </div>

        <div className="mt-2 flex items-center justify-end gap-4">
          <button className="h-4 w-4">
            <IoMdShare />
          </button>
        </div>
      </div>

      <div className="mt-4 w-[445px] h-[445px] max-lg:h-auto max-lg:w-full">
        <ImageKit
          width={445}
          height={445}
          alt=""
          src={nftStaging?.animationUrl || nftStaging?.image}
          className="h-full w-full rounded-md object-cover"
        />
      </div>

      <div className="mt-4 rounded-md border border-stroke px-4 py-4">
        <div className="flex items-center gap-2 border-b border-stroke pb-2">
          <MdOutlineDescription className="text-2xl text-primary" />
          <p className="text-shadow text-xl font-normal uppercase">
            Description
          </p>
        </div>
        <p className="mt-4 text-sm">{nftStaging?.description}</p>
      </div>
    </div>
  );
};

export default Profile;
