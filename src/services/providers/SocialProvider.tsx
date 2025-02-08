"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useCreateNewEvent } from "../api/flexhaus/social/useCreateNewEvent";
import { useToast } from "@/packages/@ui-kit/Toast/ToastProvider";
import { useAccount } from "@starknet-react/core";
import { ILeaderboardItem, IPerks } from "@/types/Iperks";
import { useGetPeakByCreator } from "../api/flexhaus/social/useGetPeakByCreator";
import { useUpdateEvent } from "../api/flexhaus/social/useUpdateEvent";
import { IdropDetail } from "@/types/Idrop";
import { useParams } from "next/navigation";
import { formattedContractAddress } from "@/utils/string";
import { useSubcribe } from "../api/flexhaus/social/useSubcribe";
import { useUnSubcribe } from "../api/flexhaus/social/useUnSubcribe";
import { useCheckSubcribed } from "../api/flexhaus/social/useCheckSubcribed";
import { useGetTotalSub } from "../api/flexhaus/social/useGetTotalSub";
import useGetCollectibleByOwner from "../api/flexhaus/social/useGetCollectibleByOwner";
import useGetLeaderboardByEvent from "../api/flexhaus/social/useGetLeaderboardByEvent";

interface SocialContextProps {
  handleCreateNewEvent: (
    startTime: number,
    snapshotTime: number,
    perks: string
  ) => void;
  handleUpdateEvent: (
    eventId: string,
    startTime: number,
    snapshotTime: number,
    perks: string
  ) => void;
  perks: IPerks | null;
  isOwner: boolean;
  toggleSubcribe: (creator: string) => void;
  isSubcribed: boolean;
  totalSub: number;
  dropsByCreator: IdropDetail[];
  leaderboardByEvent: ILeaderboardItem[];
}

const SocialContext = createContext<SocialContextProps>({
  handleCreateNewEvent: () => {},
  handleUpdateEvent: () => {},
  perks: null,
  isOwner: false,
  toggleSubcribe: () => {},
  isSubcribed: false,
  totalSub: 0,
  dropsByCreator: [],
  leaderboardByEvent: [],
});

export const useSocial = () => useContext(SocialContext);

const SocialProvider = ({ children }: { children: ReactNode }) => {
  const { onShowToast } = useToast();
  const { address } = useAccount();
  const { userAddress } = useParams();
  const [perks, setPerks] = useState<IPerks | null>(null);
  const [dropsByCreator, setDropsByCreator] = useState<IdropDetail[]>([]);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [isSubcribed, setIsSubcribed] = useState(false);
  const [totalSub, setTotalSub] = useState<number>(0);
  const [leaderboardByEvent, setLeaderboardByEvent] = useState<
    ILeaderboardItem[]
  >([]);

  const {
    data: drops,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isFetching,
  } = useGetCollectibleByOwner(userAddress as string);

  const {
    data: leaderboard,
    hasNextPage: leaderboardHasNextPage,
    fetchNextPage: fetchNextPageLeaderboard,
    isLoading: isLoadingLeaderboard,
    isFetching: isFetchingLeaderboard,
  } = useGetLeaderboardByEvent(perks?._id as string);

  const _createEvent = useCreateNewEvent();
  const handleCreateNewEvent = async (
    startTime: number,
    snapshotTime: number,
    perks: string
  ) => {
    try {
      await _createEvent.mutateAsync({
        startTime: startTime,
        snapshotTime: snapshotTime,
        perks: perks,
      });
    } catch (error) {
      onShowToast("Failed to create event");
    }
  };

  const _updateEvent = useUpdateEvent();
  const handleUpdateEvent = async (
    eventId: string,
    startTime: number,
    snapshotTime: number,
    perks: string
  ) => {
    try {
      await _updateEvent.mutateAsync({
        eventId: eventId,
        startTime: startTime,
        snapshotTime: snapshotTime,
        perks: perks,
      });
      reloadPerks();
    } catch (error) {
      onShowToast("Failed to update event");
    }
  };

  const _getPeakByCreator = useGetPeakByCreator();
  const handleGetPeakByCreator = async (creator: string) => {
    try {
      const peak = await _getPeakByCreator.mutateAsync(creator);
      setPerks(peak.data);
    } catch (error) {}
  };

  const _subScribe = useSubcribe();
  const handleSubcribe = async (creator: string) => {
    await _subScribe.mutateAsync(creator);
    await handleCheckSubcribed(creator);
    handleGetTotalSub(creator);
  };

  const _unSubcribe = useUnSubcribe();
  const handleUnSubcribe = async (creator: string) => {
    await _unSubcribe.mutateAsync(creator);
    await handleCheckSubcribed(creator);
    handleGetTotalSub(creator);
  };

  const _checkSubcribed = useCheckSubcribed();
  const handleCheckSubcribed = async (creator: string) => {
    if (
      formattedContractAddress(creator) == formattedContractAddress(address)
    ) {
      return;
    }
    const isSubcribed = await _checkSubcribed.mutateAsync(creator);
    setIsSubcribed(isSubcribed);
  };

  const toggleSubcribe = async (creator: string) => {
    if (isSubcribed) {
      handleUnSubcribe(creator);
    } else {
      handleSubcribe(creator);
    }
  };

  const _getTotalSub = useGetTotalSub();
  const handleGetTotalSub = async (creator: string) => {
    const totalSub = await _getTotalSub.mutateAsync(creator);
    setTotalSub(totalSub);
  };

  const reloadPerks = async () => {
    if (!address) return;
    handleGetPeakByCreator(address);
  };

  useEffect(() => {
    let dropsArr: IdropDetail[] = [];
    drops?.pages.map((page) => {
      dropsArr = [...dropsArr, ...page.data.items];
    });

    setDropsByCreator(dropsArr);
  }, [drops]);

  useEffect(() => {
    let leaderboardArr: ILeaderboardItem[] = [];
    leaderboard?.pages.map((page) => {
      leaderboardArr = [...leaderboardArr, ...page.data.items];
    });

    setLeaderboardByEvent(leaderboardArr);
  }, [leaderboard]);

  useEffect(() => {
    console.log(leaderboardByEvent);
  }, [leaderboardByEvent]);

  useEffect(() => {
    if (userAddress) {
      try {
        handleGetPeakByCreator(userAddress as string);
        handleGetTotalSub(userAddress as string);
      } catch (error) {}
    } else {
      setPerks(null);
    }

    if (address && userAddress) {
      handleCheckSubcribed(userAddress as string);

      setIsOwner(
        formattedContractAddress(address) ===
          formattedContractAddress(userAddress as string)
      );
    }
  }, [userAddress, address]);

  const value = {
    handleCreateNewEvent,
    handleUpdateEvent,
    perks,
    isOwner,
    toggleSubcribe,
    isSubcribed,
    totalSub,
    dropsByCreator,
    leaderboardByEvent,
  };

  return (
    <SocialContext.Provider value={value}>{children}</SocialContext.Provider>
  );
};

export default SocialProvider;
