"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAccount } from "@starknet-react/core";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { formattedContractAddress } from "@/utils/string";
import { useAccountContext } from "./AccountProvider";

// API Hooks
import { useCreateNewEvent } from "../api/flexhaus/social/useCreateNewEvent";
import { useUpdateEvent } from "../api/flexhaus/social/useUpdateEvent";
import useGetCollectibles from "../api/flexhaus/social/useGetCollectibleByOwner";
import useGetLeaderboardByEvent from "../api/flexhaus/social/useGetLeaderboardByEvent";
import { useGetPeakByCreator } from "../api/flexhaus/social/useGetPeakByCreator";
import { useGetProfile } from "../api/useGetProfile";
import useGetCreatorsSuggestion from "../api/flexhaus/social/useGetCreatorsSuggestion";
import { useDonate } from "../api/flexhaus/social/useDonate";
import useGetSets from "../api/flexhaus/social/useGetSets";

// Types
import { ILeaderboardItem, IPerks } from "@/types/Iperks";
import { IdropDetail, ISet } from "@/types/Idrop";
import { IProfileStaging } from "@/types/IStagingNft";
import useGetDrops from "../api/flexhaus/social/useGetDrops";
import useGetSecuredCollectible from "../api/flexhaus/social/useGetSecuredCollectible";
import useGetUnSecuredCollectible from "../api/flexhaus/social/useGetUnSecuredCollectible";
import useGetLastedLeaderBoard from "../api/flexhaus/social/useGetLastedLeaderBoard";
import { RecentLeaderBoard } from "@/app/drophaus/[userAddress]/Leaderboard";
import { useGetTotalPointByEvent } from "../api/flexhaus/social/useGetTotalPointByEvent";
import { useGetHighlightCreator } from "../api/flexhaus/social/useGetHighlightCreator";
import { useGetRandomCreator } from "../api/flexhaus/social/useGetRandomCreator";
import { useGetMyRankByEvent } from "../api/flexhaus/social/useGetMyRankByEvent";

interface SocialContextProps {
  // Event-related methods
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
  handleDonate: (creator: string, amount: number) => Promise<void>;

  // Data
  perks: IPerks | null;
  isOwner: boolean;
  dropsByCreator: IdropDetail[];
  leaderboardByEvent: ILeaderboardItem[];
  showProfile: IProfileStaging | null;
  creatorsSuggestion: IProfileStaging[];
  setsByCreator: ISet[];

  // Sets pagination & fetching
  setsHasNextPage: boolean | undefined;
  fetchNextPageSets: () => void;
  isFetchingSets: boolean;
  onGoingDropsByCreator: IdropDetail[];
  upcomingDropsByCreator: IdropDetail[];
  distributedDropsByCreator: IdropDetail[];
  securedCollectiblesByCreator: IdropDetail[];
  unSecuredCollectiblesByCreator: IdropDetail[];
  lastedLeaderboardByEvent: RecentLeaderBoard[];
  totalPointByEvent: number;
  highlightCreator: IProfileStaging[];
  randomCreator: IProfileStaging[];
  myRankByEvent: number;
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
  // State
  const [perks, setPerks] = useState<IPerks | null>(null);
  const [dropsByCreator, setDropsByCreator] = useState<IdropDetail[]>([]);
  const [onGoingDropsByCreator, setOnGoingDropsByCreator] = useState<
    IdropDetail[]
  >([]);
  const [upcomingDropsByCreator, setUpcomingDropsByCreator] = useState<
    IdropDetail[]
  >([]);
  const [distributedDropsByCreator, setDistributedDropsByCreator] = useState<
    IdropDetail[]
  >([]);
  const [securedCollectiblesByCreator, setSecuredCollectiblesByCreator] =
    useState<IdropDetail[]>([]);
  const [unSecuredCollectiblesByCreator, setUnSecuredCollectiblesByCreator] =
    useState<IdropDetail[]>([]);
  const [setsByCreator, setSetsByCreator] = useState<ISet[]>([]);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [leaderboardByEvent, setLeaderboardByEvent] = useState<
    ILeaderboardItem[]
  >([]);
  const [lastedLeaderboardByEvent, setLastedLeaderboardByEvent] = useState<
    RecentLeaderBoard[]
  >([]);
  const [highlightCreator, setHighlightCreator] = useState<IProfileStaging[]>(
    []
  );
  const [myRankByEvent, setMyRankByEvent] = useState<number>(0);
  const [randomCreator, setRandomCreator] = useState<IProfileStaging[]>([]);
  const [totalPointByEvent, setTotalPointByEvent] = useState<number>(0);
  const [showProfile, setShowProfile] = useState<IProfileStaging | null>(null);
  const [creatorsSuggestion, setCreatorsSuggestion] = useState<
    IProfileStaging[]
  >([]);

  // Hooks
  const { address } = useAccount();
  const { userAddress } = useParams();
  const { profileOwner } = useAccountContext();

  // API Queries
  const {
    data: drops,
    hasNextPage: dropsHasNextPage,
    fetchNextPage: fetchNextPageDrops,
  } = useGetCollectibles(userAddress as string);
  const { data: leaderboard } = useGetLeaderboardByEvent(perks?._id as string);
  const {
    data: sets,
    hasNextPage: setsHasNextPage,
    fetchNextPage: fetchNextPageSets,
    isFetching: isFetchingSets,
  } = useGetSets(userAddress as string);
  const { data: creators } = useGetCreatorsSuggestion();
  const { data: onGoingDrop } = useGetDrops({
    filterBy: "ongoing",
    creator: userAddress as string,
  });
  const { data: upcomingDrop } = useGetDrops({
    filterBy: "upcoming",
    creator: userAddress as string,
  });
  const { data: distributedDrop } = useGetDrops({
    filterBy: "distributed",
    creator: userAddress as string,
  });
  const { data: lastedLeaderboard } = useGetLastedLeaderBoard(
    perks?._id as string
  );
  const { data: securedCollectibles } = useGetSecuredCollectible(
    userAddress as string
  );
  const { data: unSecuredCollectibles } = useGetUnSecuredCollectible(
    userAddress as string
  );

  // Mutations
  const _createEvent = useCreateNewEvent();
  const _updateEvent = useUpdateEvent();
  const _getPeakByCreator = useGetPeakByCreator();
  const _getProfile = useGetProfile();
  const _donate = useDonate();
  const _getPointByEvent = useGetTotalPointByEvent();
  const _getHighlightCreator = useGetHighlightCreator();
  const _getRandomCreator = useGetRandomCreator();
  const _getMyRankByEvent = useGetMyRankByEvent();

  // Handlers
  const handleCreateNewEvent = async (
    startTime: number,
    snapshotTime: number,
    perks: string
  ): Promise<IPerks | null> => {
    try {
      const peaksCreated = await _createEvent.mutateAsync({
        startTime,
        snapshotTime,
        perks,
      });
      await reloadPerks();
      return peaksCreated;
    } catch (error) {
      toast("Failed to create event");
      return null;
    }
  };

  const handleUpdateEvent = async (
    eventId: string,
    startTime: number,
    snapshotTime: number,
    perks: string
  ): Promise<IPerks | null> => {
    try {
      const perksUpdated = await _updateEvent.mutateAsync({
        eventId,
        startTime,
        snapshotTime,
        perks,
      });
      reloadPerks();
      return perksUpdated;
    } catch (error) {
      toast("Failed to update event");
      return null;
    }
  };

  const handleDonate = async (
    creator: string,
    amount: number
  ): Promise<void> => {
    if (!address) {
      toast("Please connect your wallet");
      return;
    }

    if (!perks) {
      toast("There is no event yet");
      return;
    }

    if (new Date().getTime() < perks.startTime) {
      toast("Perks is not started");
      return;
    }

    if (new Date().getTime() > perks.snapshotTime) {
      toast("Perks is not finished");
      return;
    }

    if (!profileOwner) {
      toast("Something went wrong");
      return;
    }

    if (
      formattedContractAddress(address) == formattedContractAddress(creator)
    ) {
      toast("You can't donate to yourself");
      return;
    }

    if (profileOwner.points < amount) {
      toast("You don't have enough points");
      return;
    }

    try {
      const donate = await _donate.mutateAsync({
        creator: creator,
        amount: amount,
      });

      toast("Successfully donated");
    } catch (error) {
      throw error;
    }
  };

  const handleGetPeakByCreator = async (creator: string) => {
    try {
      const peak = await _getPeakByCreator.mutateAsync(creator);
      setPerks(peak.data);
    } catch (error) {}
  };

  const handleGetProfile = async (address: string) => {
    try {
      const profile = await _getProfile.mutateAsync(address);
      setShowProfile(profile);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetPointByEvent = async (eventId: string): Promise<void> => {
    if (!eventId) return;
    try {
      const point = await _getPointByEvent.mutateAsync(eventId);
      setTotalPointByEvent(point);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetHighlightCreator = async (): Promise<void> => {
    try {
      const creators = await _getHighlightCreator.mutateAsync();
      setHighlightCreator(creators);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetRandomCreator = async (): Promise<void> => {
    try {
      const creators = await _getRandomCreator.mutateAsync();
      setRandomCreator(creators);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetMyRankByEvent = async (eventId: string): Promise<void> => {
    try {
      const rank = await _getMyRankByEvent.mutateAsync(eventId);
      setMyRankByEvent(rank);
    } catch (error) {
      console.log(error);
    }
  };

  const reloadPerks = async () => {
    if (address) handleGetPeakByCreator(address);
  };

  // Utility
  const _getCreatorFromCollectibles = (collectibles: IdropDetail[]) => {
    const creatorMap: Map<string, IProfileStaging> = new Map();
    collectibles.forEach((collectible) => {
      if (!creatorMap.has(collectible.creator.address)) {
        creatorMap.set(collectible.creator.address, collectible.creator);
      }
    });
    return Array.from(creatorMap.values());
  };

  // Effects
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
      handleGetProfile(userAddress as string);
      handleGetPeakByCreator(userAddress as string);
      setIsOwner(false);
    }
  }, [userAddress, address]);

  useEffect(() => {
    const dropsArr = drops?.pages.flatMap((page) => page.data.items) || [];
    setDropsByCreator(dropsArr);
  }, [drops]);

  useEffect(() => {
    const dropsArr =
      onGoingDrop?.pages.flatMap((page) => page.data.items) || [];
    setOnGoingDropsByCreator(dropsArr);
  }, [onGoingDrop]);

  useEffect(() => {
    const dropsArr =
      upcomingDrop?.pages.flatMap((page) => page.data.items) || [];
    setUpcomingDropsByCreator(dropsArr);
  }, [upcomingDrop]);

  useEffect(() => {
    const dropsArr =
      distributedDrop?.pages.flatMap((page) => page.data.items) || [];
    setDistributedDropsByCreator(dropsArr);
  }, [distributedDrop]);

  useEffect(() => {
    const dropsArr =
      securedCollectibles?.pages.flatMap((page) => page.data.items) || [];
    setSecuredCollectiblesByCreator(dropsArr);
  }, [securedCollectibles]);

  useEffect(() => {
    const dropsArr =
      unSecuredCollectibles?.pages.flatMap((page) => page.data.items) || [];
    setUnSecuredCollectiblesByCreator(dropsArr);
  }, [unSecuredCollectibles]);

  useEffect(() => {
    const setsArr = sets?.pages.flatMap((page) => page.data.items) || [];
    setSetsByCreator(setsArr);
  }, [sets]);

  useEffect(() => {
    const leaderboardArr =
      leaderboard?.pages.flatMap((page) => page.data.items) || [];
    setLeaderboardByEvent(leaderboardArr);
  }, [leaderboard]);

  useEffect(() => {
    const leaderboardArr =
      lastedLeaderboard?.pages.flatMap((page) => page.data.items) || [];
    setLastedLeaderboardByEvent(leaderboardArr);
  }, [lastedLeaderboard]);

  useEffect(() => {
    handleGetPointByEvent(perks?._id as string);
    if (address) handleGetMyRankByEvent(perks?._id as string);
  }, [perks, address]);

  useEffect(() => {
    const creatorsArr =
      creators?.pages.flatMap((page) =>
        _getCreatorFromCollectibles(page.data.items)
      ) || [];
    setCreatorsSuggestion(creatorsArr);
  }, [creators]);

  useEffect(() => {
    handleGetHighlightCreator();
    handleGetRandomCreator();
  }, []);

  // Context Value
  const value: SocialContextProps = {
    handleCreateNewEvent,
    handleUpdateEvent,
    handleDonate,
    perks,
    isOwner,
    dropsByCreator,
    leaderboardByEvent,
    showProfile,
    creatorsSuggestion,
    setsByCreator,
    setsHasNextPage,
    fetchNextPageSets,
    isFetchingSets,
    onGoingDropsByCreator,
    upcomingDropsByCreator,
    distributedDropsByCreator,
    securedCollectiblesByCreator,
    unSecuredCollectiblesByCreator,
    lastedLeaderboardByEvent,
    totalPointByEvent,
    highlightCreator,
    randomCreator,
    myRankByEvent,
  };

  return (
    <SocialContext.Provider value={value}>{children}</SocialContext.Provider>
  );
};

export default SocialProvider;
