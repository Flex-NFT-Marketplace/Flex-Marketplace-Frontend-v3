"use client";

import React, { useContext, useEffect, useState } from "react";

import Banner from "@/assets/Staking-banner.svg";
import { useAccountContext } from "@/services/providers/AccountProvider";
import { INft } from "@/types/INft";
import useGetStakingList from "@/services/api/useGetStakingList";
import { useAccount } from "@starknet-react/core";
import {
  STAKECOLLECTION,
  StakingStatus,
  StakingStatusEnum,
} from "@/types/IStaking";
import Checkbox from "@/lib/@core/Checkbox";
import useModal from "@/hooks/useModal";
import StakingPopup from "@/components/Popup/StakingPopup";
import UnStakingPopup from "@/components/Popup/UnstakingPopup";
import {
  calculatePointsStaking,
  formatTimestamp,
  formattedContractAddress,
  timeElapsed,
} from "@/utils/string";
import { LoadingHeaderContext } from "@/services/providers/market/LoadingHeaderProvider";
import StakingSVG from "@/assets/staking.svg";
import { Contract, RpcProvider, num } from "starknet";
import { stakingABI } from "@/types/abi/stakingABI";
import { useGetNftDetail } from "@/services/api/nft/useGetNftDetail";
import { getStaked } from "@/services/api/staking/getStaked";
import Button from "@/packages/@ui-kit/Button";
import ImageKit from "@/packages/@ui-kit/Image";

const Staking = () => {
  const { address } = useAccount();
  const { nftsOwner, setAddress, loading, onReloadNftOwner } =
    useAccountContext();

  const provider = new RpcProvider({
    nodeUrl: process.env.NEXT_PUBLIC_STARKNET_NODE_URL,
  });

  const { setIsLoadingHeader } = useContext(LoadingHeaderContext);
  useEffect(() => {
    setIsLoadingHeader(loading);
  }, [loading]);

  const [nfts, setNfts] = useState<any[]>([]);
  // const { data: stakings, refetch: refetchStakingList } = useGetStakingList(
  //   address || "",
  // );

  const { isOpen: isOpenStake, toggleModal: toggleModalStake } = useModal();
  const { isOpen: isOpenUnStake, toggleModal: toggleModalUnStake } = useModal();

  const [nftsStake, setNftsStake] = useState<any[]>([]);
  const [stakings, setStakings] = useState<any[]>([]);
  const [nftsUnStake, setNftsUnStake] = useState<any[]>([]);

  const [numNftStaked, setNumNftStaked] = useState(0);
  const [numTotalPoint, setNumTotalPoint] = useState(0);

  const [actionStaked, setActionStaked] = useState(true);
  const _getNftDetail = useGetNftDetail();

  useEffect(() => {
    getNFTStaked();
  }, [address]);

  const getNFTStaked = async () => {
    if (!address) return [];

    const nftsStaked = await getStaked(address);

    let nfts = [];

    for (let i = 0; i < nftsStaked?.length; i++) {
      let res = await _getNftDetail.mutateAsync({
        contract_address: formattedContractAddress(
          nftsStaked[i].contract_address
        ),
        token_id: nftsStaked[i].token_id,
      });

      nfts.push(res);
    }

    setStakings(nfts);
  };

  const [statsNFTEvo, setStatsNFTEvo] = useState({
    point: 20,
    holding: 0,
    staking: 0,
  });

  const [statsNFTDreamy, setStatsNFTDreamy] = useState({
    point: 10,
    holding: 0,
    staking: 0,
  });

  useEffect(() => {
    if (!nftsOwner || nftsOwner.length < 0) return;

    const arr = nftsOwner.filter((nft) => {
      if (STAKECOLLECTION.includes(nft.collection.contract_address))
        return true;
      return false;
    });

    let nfts = arr.map((nft) => {
      return {
        ...nft.nft,
        staking: {
          status: StakingStatusEnum.UNSTAKED,
        },
        checked: false,
      };
    });

    let nftStaked = stakings.map((stake) => {
      return {
        ...stake,
        staking: {
          status: StakingStatusEnum.STAKED,
        },
        checked: false,
        point: 0,
      };
    });

    setNumNftStaked(nftStaked.length);

    const nftStakedIds = new Set(nftStaked.map((nft) => nft._id));
    nfts = nfts.filter((nft) => !nftStakedIds.has(nft._id));

    nfts = [...nfts, ...nftStaked];

    nfts = nfts.sort((a, b) => {
      if (a.staking.status == StakingStatusEnum.STAKED) return -1;
      if (a.staking.status == StakingStatusEnum.UNSTAKED) return 1;
      return 0;
    });

    let numEvo = nfts.filter(
      (item) =>
        item.contract_address ==
        "0x04546729db564bb29a9e1e215463f41bc53116ac75eeb8e029b8a87fee7d85fd"
    ).length;

    let numStakeEvo = nfts.filter(
      (item) =>
        item.contract_address ==
          "0x04546729db564bb29a9e1e215463f41bc53116ac75eeb8e029b8a87fee7d85fd" &&
        item.staking.status == StakingStatusEnum.STAKED
    ).length;

    let numDreamy = nfts.filter(
      (item) =>
        item.contract_address ==
        "0x03859bf9178b48a4ba330d6872ab5a6d3895b64d6631197beefde6293bc172cd"
    ).length;

    let numStakeDreamy = nfts.filter(
      (item) =>
        item.contract_address ==
          "0x03859bf9178b48a4ba330d6872ab5a6d3895b64d6631197beefde6293bc172cd" &&
        item.staking.status == StakingStatusEnum.STAKED
    ).length;

    setStatsNFTDreamy({
      ...statsNFTDreamy,
      holding: numDreamy,
      staking: numStakeDreamy,
    });

    setStatsNFTEvo({
      ...statsNFTEvo,
      holding: numEvo,
      staking: numStakeEvo,
    });

    calculatePointsItem(nfts);
  }, [nftsOwner, stakings]);

  const renderAction = (status: StakingStatus) => {
    switch (status) {
      case StakingStatusEnum.STAKED:
        return (
          <div>
            <p className="font-bold text-[#92F7CB]">Staked</p>
          </div>
        );

      case StakingStatusEnum.UNSTAKED:
        return (
          <div>
            <p>N/A</p>
          </div>
        );

      default:
        return <Button title="No Action"></Button>;
    }
  };

  const onStake = () => {
    const arr = nfts.filter((item) => {
      return item.staking.status == StakingStatusEnum.UNSTAKED;
    });

    setNftsStake(arr);
    toggleModalStake();
  };

  const onUnstake = () => {
    const arr = nfts.filter((item) => {
      return item.staking.status == StakingStatusEnum.STAKED;
    });

    setNftsUnStake(arr);
    toggleModalUnStake();
  };

  const onChecked = (nft: any, status: boolean) => {
    const arr = nfts.map((item) => {
      if (
        item.contract_address == nft.contract_address &&
        item.token_id == nft.token_id
      ) {
        return {
          ...item,
          checked: status,
        };
      }

      if (nft.staking.status != item.staking.status) {
        return {
          ...item,
          checked: false,
        };
      }

      return item;
    });

    let isActionStaked =
      arr.findIndex(
        (item) =>
          item.staking.status == StakingStatusEnum.STAKED && item.checked
      ) < 0;

    setActionStaked(isActionStaked);
    setNfts(arr);
  };

  const onReloadData = () => {
    getNFTStaked();
    onReloadNftOwner();
  };

  const getUserTotalPoint = async () => {
    try {
      const nftContract = new Contract(
        stakingABI,
        process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS || "",
        provider
      );

      const totalPoint = await nftContract.getUserTotalPoint(address, {
        parseResponse: true,
      });

      setNumTotalPoint(Number(totalPoint));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (address) {
      getUserTotalPoint();
    }
  }, [address]);

  const getTotalPointItem = async (
    contract_address: string,
    token_id: string
  ) => {
    try {
      const nftContract = new Contract(
        stakingABI,
        process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS || "",
        provider
      );

      const totalPoint = await nftContract.getUserPointByItem(
        address,
        contract_address,
        token_id,
        {
          parseResponse: true,
        }
      );

      return Number(totalPoint);
    } catch (error) {
      return 0;
    }
  };

  const calculatePointsItem = async (nfts: any[]) => {
    try {
      const tempArr = [...nfts];
      for (let i = 0; i < nfts.length; i++) {
        if (nfts[i].staking.status == StakingStatusEnum.STAKED) {
          let point = await getTotalPointItem(
            nfts[i].contract_address,
            nfts[i].token_id
          );
          console.log(point);
          tempArr[i].point = point;
        }
      }

      setNfts(tempArr);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed-height-under-header flex w-full flex-col overflow-auto">
      <StakingPopup
        isOpen={isOpenStake}
        toggleModal={toggleModalStake}
        nfts={nftsStake}
        setNfts={setNftsStake}
        onReload={onReloadData}
        totalStaked={numNftStaked}
      />

      <UnStakingPopup
        isOpen={isOpenUnStake}
        toggleModal={toggleModalUnStake}
        nfts={nftsUnStake}
        setNfts={setNftsUnStake}
        onReload={onReloadData}
      />

      <ImageKit src={Banner} alt="" className="w-full"></ImageKit>
      <div className="mx-auto my-4 flex w-full max-w-[1440px] gap-5 px-5 max-lg:flex-col">
        <div className="flex flex-col rounded-md border border-stroke max-lg:flex-1 lg:w-[445px]">
          <div className="flex w-full gap-2 border-b border-stroke px-4 py-4">
            <ImageKit src={StakingSVG} alt="" className="h-[24px] w-[24px]" />
            <p className="text-xl font-normal uppercase">
              Eligible collections
            </p>
          </div>

          <div className="p-4">
            <div className="flex w-full bg-[#171921] p-5">
              <div className="border border-stroke">
                <ImageKit
                  src="https://flex-marketplace.s3.us-east-1.amazonaws.com/0x03859bf9178b48a4ba330d6872ab5a6d3895b64d6631197beefde6293bc172cd_avata.png"
                  alt=""
                  className="h-[92px] w-[92px]"
                />
              </div>

              <div className="ml-4 flex flex-1 flex-col justify-between">
                <p className="uppercase">Dreamy BoTTy</p>

                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-grays">Point per NFT:</p>
                    <p className="whitespace-nowrap">
                      {statsNFTDreamy.point} / hour
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-grays">Holding #:</p>
                    <p>{statsNFTDreamy.holding}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-grays">Staking #:</p>
                    <p>{statsNFTDreamy.staking}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex w-full bg-[#171921] p-5">
              <div className="border border-stroke">
                <ImageKit
                  src="https://i.nfte.ai/rt/ipfs.io/ipfs/QmaXMk4MQVh5uwbPq1tg8daUGtnJjgTokiN282wzGbC2so?format=gif"
                  alt=""
                  className="h-[92px] w-[92px]"
                />
              </div>

              <div className="ml-4 flex flex-1 flex-col justify-between">
                <p className="uppercase">Flex EVO</p>

                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-grays">Point per NFT:</p>
                    <p className="whitespace-nowrap">
                      {statsNFTEvo.point} / hour
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-grays">Holding #:</p>
                    <p>{statsNFTEvo.holding}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-grays">Staking #:</p>
                    <p>{statsNFTEvo.staking}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full  flex-1 rounded-md border border-stroke">
          <div className="flex flex-wrap justify-between gap-4 border-b border-stroke px-4 py-4">
            <div className="flex items-center gap-2">
              <ImageKit src={StakingSVG} alt="" className="h-[24px] w-[24px]" />
              <p className="text-xl font-normal uppercase">Staking NFTs</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-normal">
                Staking NFTs:
                <span className="text-[#56CCF2]">{numNftStaked}</span>
              </p>

              <p className="font-normal">
                Points:<span className="text-[#FF9F0A]">{numTotalPoint}</span>
              </p>
            </div>

            {actionStaked && (
              <Button
                title="Stake"
                className="min-w-[106px]"
                onClick={onStake}
              />
            )}
            {!actionStaked && (
              <Button
                title="Unstake"
                onClick={onUnstake}
                className="border-cancel text-cancel"
                variant="outline"
              />
            )}
          </div>

          <div>
            <div className="relative h-full w-full flex-1 overflow-auto">
              <div className="sticky left-0 right-0 top-0 z-10 flex items-center border-b border-stroke px-8 py-4 font-normal uppercase text-grays">
                <div className="flex min-w-[20px] items-center justify-start"></div>

                <div className="flex-1">
                  <p className="">NFT</p>
                </div>

                <div className="flex min-w-[150px] items-center justify-end">
                  <p>Time</p>
                </div>
                <div className="flex min-w-[150px] items-center justify-end">
                  <p>Point</p>
                </div>
                <div className="flex min-w-[200px] items-center justify-end">
                  <p>Status</p>
                </div>
              </div>

              <div className="pb-4">
                {nfts.map((_, index) => {
                  return (
                    <div className="py-2" key={index}>
                      <div
                        className="flex cursor-pointer items-center py-1 pl-4 pr-8 uppercase hover:bg-dark-black"
                        onMouseDown={() => onChecked(_, !_?.checked)}
                      >
                        <Checkbox isChecked={_?.checked} onChange={() => {}} />

                        <div className="relative ml-2 flex flex-1 items-center justify-start">
                          <ImageKit
                            alt=""
                            src={_.image_url}
                            className="ml-2 h-[52px] w-[52px]"
                          />

                          <p className="ml-4 truncate font-normal ">{_.name}</p>
                        </div>

                        <div className="flex min-w-[200px] items-center justify-end">
                          <p> {timeElapsed(_.staking?.updatedAt)}</p>
                        </div>
                        <div className="flex min-w-[150px] items-center justify-end">
                          {_.point}
                        </div>
                        <div className="flex min-w-[200px] items-center justify-end">
                          {renderAction(_.staking?.status)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staking;
