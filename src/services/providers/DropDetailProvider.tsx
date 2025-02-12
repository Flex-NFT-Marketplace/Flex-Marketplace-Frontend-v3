"use client";
import { useParams } from "next/navigation";
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
import { IStagingCollection } from "@/types/IStagingCollection";
import { useGetCollectionDetail } from "../api/collection/useGetCollectionDetail";
import { useClaim } from "../api/flexhaus/dropDetail/useClaim";

interface DropDetailContextProps {
  dropDetail: IdropDetail | null;
  collectionDetail: IStagingCollection | null;
  toggleLike: (collectible: string) => Promise<void>;
  isLiked: boolean;
  totalLike: number;
  isSecured: boolean;
  secure: (collectible: string) => Promise<void>;
  claim: (collectible: string) => Promise<any>;
}

const DropDetailContext = createContext<DropDetailContextProps | undefined>(
  undefined
);

export const useDropDetail = () => {
  const context = useContext(DropDetailContext);

  if (context === undefined) {
    throw new Error(
      "useGetDropDetail must be used within an DropDetailProvider"
    );
  }

  return context;
};

const DropDetailProvider = ({ children }: { children: ReactNode }) => {
  const { dropAddress } = useParams();
  const [dropDetail, setDropDetail] = useState<IdropDetail | null>(null);
  const { onShowToast } = useToast();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [totalLike, setTotalLike] = useState<number>(0);
  const [isSecured, setIsSecured] = useState<boolean>(false);
  const { address } = useAccount();
  const { profileOwner, handleCheckSubcribed } = useAccountContext();
  const [collectionDetail, setCollectionDetail] =
    useState<IStagingCollection | null>(null);

  const _claim = useClaim();
  const claim = async (collectible: string): Promise<any> => {
    try {
      await _claim.mutateAsync(collectible);
    } catch (error) {
      throw error;
    }
  };

  const _getCollectionDetail = useGetCollectionDetail();
  const getCollectionDetail = async (contractAddress: string) => {
    const collectionDetail =
      await _getCollectionDetail.mutateAsync(contractAddress);
    setCollectionDetail(collectionDetail);
  };

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
  const postLike = async (collectible: string): Promise<void> => {
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
  const deleteLike = async (collectible: string): Promise<void> => {
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

  const toggleLike = async (collectible: string): Promise<void> => {
    if (isLiked) {
      await deleteLike(collectible);
    } else {
      await postLike(collectible);
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
  const secure = async (collectionAddress: string): Promise<void> => {
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

    if (new Date().getTime() > dropDetail.set?.expiryTime) {
      onShowToast("This drop has ended");
      return;
    }

    if (new Date().getTime() < dropDetail.set?.startTime) {
      onShowToast("This drop hasn't started yet");
      return;
    }

    const isSubscribed = await handleCheckSubcribed(dropDetail.creator.address);
    if (!isSubscribed) {
      onShowToast("You need to subscribe to secure this drop");
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
      getCollectionDetail(dropAddress as string);
      getTotalLike(dropAddress as string);

      if (address) {
        checkSecured(dropAddress as string);
        checkLiked(dropAddress as string);
      }
    }
  }, [dropAddress, address]);

  const value = {
    dropDetail,
    collectionDetail,
    toggleLike,
    isLiked,
    totalLike,
    isSecured,
    secure,
    claim,
  };

  return (
    <DropDetailContext.Provider value={value}>
      {children}
    </DropDetailContext.Provider>
  );
};

export default DropDetailProvider;
