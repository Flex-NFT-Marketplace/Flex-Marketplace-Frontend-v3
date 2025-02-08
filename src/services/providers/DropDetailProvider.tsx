"use client";
import { notFound, useParams } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useGetDropDetail } from "../api/flexhaus/dropDetail/useGetDropDetail";
import { IdropDetail } from "@/types/Idrop";
import { useToast } from "@/packages/@ui-kit/Toast/ToastProvider";
import { usePostLike } from "../api/flexhaus/dropDetail/usePostLike";
import { useDeleteLike } from "../api/flexhaus/dropDetail/useDeleteLike";
import { useCheckLiked } from "../api/flexhaus/dropDetail/useCheckLiked";
import { useAccount } from "@starknet-react/core";
import { useGetTotalLike } from "../api/flexhaus/dropDetail/useGetTotalLike";
import { useCheckSecured } from "../api/flexhaus/dropDetail/useCheckSecured";
import { useSecure } from "../api/flexhaus/dropDetail/useSecure";
import { formattedContractAddress } from "@/utils/string";
import { useAccountContext } from "./AccountProvider";

interface DropDetailContextProps {
  dropDetail: IdropDetail | null;
  toggleLike: (collectible: string) => void;
  isLiked: boolean;
  totalLike: number;
  isSecured: boolean;
  secure: (collectible: string) => void;
}

const DropDetailContext = createContext<DropDetailContextProps>({
  dropDetail: null,
  toggleLike: () => {},
  isLiked: false,
  totalLike: 0,
  isSecured: false,
  secure: () => {},
});

export const useDropDetail = () => useContext(DropDetailContext);

const DropDetailProvider = ({ children }: { children: ReactNode }) => {
  const { dropAddress } = useParams();
  const [dropDetail, setDropDetail] = useState<IdropDetail | null>(null);
  const { onShowToast } = useToast();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [totalLike, setTotalLike] = useState<number>(0);
  const [isSecured, setIsSecured] = useState<boolean>(false);
  const { address } = useAccount();
  const { profileOwner } = useAccountContext();

  const _getDropDetail = useGetDropDetail();
  const getDropDetail = async (dropAddress: string) => {
    try {
      const dropDetail = await _getDropDetail.mutateAsync(dropAddress);
      setDropDetail(dropDetail);
    } catch (error) {
      onShowToast("Something went wrong");
    }
  };

  const _postLike = usePostLike();
  const postLike = async (collectible: string) => {
    if (!address) {
      onShowToast("Please connect your wallet");
      return;
    }
    try {
      await _postLike.mutateAsync(collectible);
      checkLiked(dropAddress as string);
      getTotalLike(dropAddress as string);
    } catch (error) {
      onShowToast("Something went wrong");
    }
  };

  const _deleteLike = useDeleteLike();
  const deleteLike = async (collectible: string) => {
    if (!address) {
      onShowToast("Please connect your wallet");
      return;
    }
    try {
      await _deleteLike.mutateAsync(collectible);
      checkLiked(dropAddress as string);
      getTotalLike(dropAddress as string);
    } catch (error) {
      onShowToast("Something went wrong");
    }
  };

  const _checkLiked = useCheckLiked();
  const checkLiked = async (collectible: string) => {
    if (address) {
      try {
        const isLiked = await _checkLiked.mutateAsync(collectible);
        setIsLiked(isLiked);
      } catch (error) {
        onShowToast("Something went wrong");
      }
    } else {
      setIsLiked(false);
    }
  };

  const toggleLike = async (collectible: string) => {
    if (isLiked) {
      deleteLike(collectible);
    } else {
      postLike(collectible);
    }
  };

  const _getTotalLike = useGetTotalLike();
  const getTotalLike = async (collectionAddress: string) => {
    const totalLike = await _getTotalLike.mutateAsync(collectionAddress);
    setTotalLike(totalLike);
  };

  const _checkSecured = useCheckSecured();
  const checkSecured = async (collectionAddress: string) => {
    const isSecured = await _checkSecured.mutateAsync(collectionAddress);
    setIsSecured(isSecured);
  };

  const _secure = useSecure();
  const secure = async (collectionAddress: string) => {
    if (!dropDetail) return;
    if (!address) {
      onShowToast("Please connect your wallet");
      return;
    }

    if (
      formattedContractAddress(dropDetail?.creator.address) ==
      formattedContractAddress(address)
    ) {
      onShowToast("You can't secure your own drop");
      return;
    }

    if (profileOwner) {
      if (profileOwner.points < dropDetail.secureAmount) {
        onShowToast("You don't have enough points to secure this drop");
        return;
      }
    }

    try {
      await _secure.mutateAsync(collectionAddress);
      checkSecured(collectionAddress);
    } catch (error: any) {
      console.log(error);

      onShowToast(error.response.data.message);
    }
  };

  useEffect(() => {
    if (dropAddress) {
      getDropDetail(dropAddress as string);
      getTotalLike(dropAddress as string);

      if (address) {
        checkSecured(dropAddress as string);
        checkLiked(dropAddress as string);
      }
    }
  }, [dropAddress, address]);

  const value = {
    dropDetail,
    toggleLike,
    isLiked,
    totalLike,
    isSecured,
    secure,
  };

  return (
    <DropDetailContext.Provider value={value}>
      {children}
    </DropDetailContext.Provider>
  );
};

export default DropDetailProvider;
