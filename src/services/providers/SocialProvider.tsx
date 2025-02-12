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
import { ICreator, IdropDetail } from "@/types/Idrop";
import { useParams } from "next/navigation";
import { formattedContractAddress } from "@/utils/string";
import useGetCollectibles from "../api/flexhaus/social/useGetCollectibleByOwner";
import useGetLeaderboardByEvent from "../api/flexhaus/social/useGetLeaderboardByEvent";
import { IProfileStaging } from "@/types/IStagingNft";
import { useGetProfile } from "../api/useGetProfile";
import useGetCreatorsSuggestion from "../api/flexhaus/social/useGetCreatorsSuggestion";
import { useAuth } from "./AuthProvider";
import { useDonate } from "../api/flexhaus/social/useDonate";
import { useAccountContext } from "./AccountProvider";

interface SocialContextProps {
  handleCreateNewEvent: (
    startTime: number,
    snapshotTime: number,
    perks: string
  ) => Promise<IPerks | null>;
  handleUpdateEvent: (
    eventId: string,
    startTime: number,
    snapshotTime: number,
    perks: string
  ) => Promise<IPerks | null>;
  perks: IPerks | null;
  isOwner: boolean;
  dropsByCreator: IdropDetail[];
  leaderboardByEvent: ILeaderboardItem[];
  showProfile: IProfileStaging | null;
  creatorsSuggestion: IProfileStaging[];
  handleDonate: (creator: string, amount: number) => Promise<void>;
}

const SocialContext = createContext<SocialContextProps | undefined>(undefined);

export const useSocial = () => {
  const context = useContext(SocialContext);
  if (!context) {
    throw new Error("useSocial must be used within a SocialProvider");
  }
  return context;
};

const SocialProvider = ({ children }: { children: ReactNode }) => {
  const { onShowToast } = useToast();
  const { address } = useAccount();
  const { userAddress } = useParams();
  const [perks, setPerks] = useState<IPerks | null>(null);
  const [dropsByCreator, setDropsByCreator] = useState<IdropDetail[]>([]);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [leaderboardByEvent, setLeaderboardByEvent] = useState<
    ILeaderboardItem[]
  >([]);
  const [showProfile, setShowProfile] = useState<IProfileStaging | null>(null);
  const [creatorsSuggestion, setCreatorsSuggestion] = useState<
    IProfileStaging[]
  >([]);
  const { profileOwner } = useAccountContext();

  const {
    data: drops,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isFetching,
  } = useGetCollectibles(userAddress as string);

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
  ): Promise<IPerks | null> => {
    try {
      const peaksCreated = await _createEvent.mutateAsync({
        startTime: startTime,
        snapshotTime: snapshotTime,
        perks: perks,
      });
      await reloadPerks();
      return peaksCreated;
    } catch (error) {
      onShowToast("Failed to create event");
      return null;
    }
  };

  const _updateEvent = useUpdateEvent();
  const handleUpdateEvent = async (
    eventId: string,
    startTime: number,
    snapshotTime: number,
    perks: string
  ): Promise<IPerks | null> => {
    try {
      const perksUpdated = await _updateEvent.mutateAsync({
        eventId: eventId,
        startTime: startTime,
        snapshotTime: snapshotTime,
        perks: perks,
      });
      reloadPerks();
      return perksUpdated;
    } catch (error) {
      onShowToast("Failed to update event");
      return null;
    }
  };

  const _getPeakByCreator = useGetPeakByCreator();
  const handleGetPeakByCreator = async (creator: string) => {
    try {
      const peak = await _getPeakByCreator.mutateAsync(creator);
      setPerks(peak.data);
    } catch (error) {}
  };

  const reloadPerks = async () => {
    if (!address) return;
    handleGetPeakByCreator(address);
  };

  const _getProfile = useGetProfile();
  const handleGetProfile = async (address: string) => {
    try {
      const profile = await _getProfile.mutateAsync(address);
      setShowProfile(profile);
    } catch (error) {
      console.log(error);
    }
  };

  const _donate = useDonate();
  const handleDonate = async (
    creator: string,
    amount: number
  ): Promise<void> => {
    if (!address) {
      onShowToast("Please connect your wallet");
      return;
    }

    if (!perks) {
      onShowToast("There is no event yet");
      return;
    }

    if (new Date().getTime() < perks.startTime) {
      onShowToast("Perks is not started");
      return;
    }

    if (new Date().getTime() > perks.snapshotTime) {
      onShowToast("Perks is not finished");
      return;
    }

    if (!profileOwner) {
      onShowToast("Something went wrong");
      return;
    }

    if (
      formattedContractAddress(address) == formattedContractAddress(creator)
    ) {
      onShowToast("You can't donate to yourself");
      return;
    }

    if (profileOwner.points < amount) {
      onShowToast("You don't have enough points");
      return;
    }

    try {
      const donate = await _donate.mutateAsync({
        creator: creator,
        amount: amount,
      });

      onShowToast("Successfully donated");
    } catch (error) {
      throw error;
    }
  };

  const { data: creators } = useGetCreatorsSuggestion();

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
    setPerks(null);
    if (address && userAddress) {
      handleGetProfile(userAddress as string);
      handleGetPeakByCreator(userAddress as string);
      setIsOwner(
        formattedContractAddress(address) ===
          formattedContractAddress(userAddress as string)
      );
    } else if (address) {
      handleGetProfile(address);
      handleGetPeakByCreator(address);
      setIsOwner(true);
    } else if (userAddress) {
      try {
        handleGetProfile(userAddress as string);
        handleGetPeakByCreator(userAddress as string);
        setIsOwner(false);
      } catch (error) {}
    }
  }, [userAddress, address]);

  const _getCreatorFromCollectibles = (collectibles: IdropDetail[]) => {
    const creatorMap: Map<string, IProfileStaging> = new Map();
    collectibles.map((collectible) => {
      if (!creatorMap.has(collectible.creator.address)) {
        creatorMap.set(collectible.creator.address, collectible.creator);
      }
    });
    return Array.from(creatorMap.values());
  };

  useEffect(() => {
    let creatorsArr: IProfileStaging[] = [];
    creators?.pages.map((page) => {
      creatorsArr = creatorsArr.concat(
        _getCreatorFromCollectibles(page.data.items)
      );
    });

    setCreatorsSuggestion(creatorsArr);
  }, [creators]);

  const value = {
    handleCreateNewEvent,
    handleUpdateEvent,
    perks,
    isOwner,
    dropsByCreator,
    leaderboardByEvent,
    showProfile,
    creatorsSuggestion,
    handleDonate,
  };

  return (
    <SocialContext.Provider value={value}>{children}</SocialContext.Provider>
  );
};

export default SocialProvider;
