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
import { Contract, RpcProvider } from "starknet";
import { stakingABI } from "@/types/abi/stakingABI";
import { useGetNftDetail } from "@/services/api/nft/useGetNftDetail";
import { getStaked } from "@/services/api/staking/getStaked";
import Button from "@/packages/@ui-kit/Button";
import ImageKit from "@/packages/@ui-kit/Image";
import { useGetNft } from "@/services/api/nft/useGetNft";
import { IStagingNftResponse } from "@/types/IStagingNft";
import { getNftsAbleToStake } from "@/services/api/staking/getAbleToStake";

enum NFTContractToStake {
  DREAMY_BOTTY = "0x03859bf9178b48a4ba330d6872ab5a6d3895b64d6631197beefde6293bc172cd",
  FLEX_EVO = "0x04546729db564bb29a9e1e215463f41bc53116ac75eeb8e029b8a87fee7d85fd",
}

interface PointKeeper {
  contractAddress: string;
  tokenId: string;
  point: number;
}

interface TimeKeeper {
  contractAddress: string;
  tokenId: string;
  time: number;
}

enum NFTState {
  NOT_STAKE = 0,
  STAKED = 1,
}

const Staking = () => {
  const { address } = useAccount();
  const { nftsOwner, loading, onReloadNftOwner } = useAccountContext();

  const provider = new RpcProvider({
    nodeUrl: process.env.NEXT_PUBLIC_STARKNET_NODE_URL,
  });

  const { setIsLoadingHeader } = useContext(LoadingHeaderContext);
  useEffect(() => {
    setIsLoadingHeader(loading);
  }, [loading]);

  const { isOpen: isOpenStake, toggleModal: toggleModalStake } = useModal();
  const { isOpen: isOpenUnStake, toggleModal: toggleModalUnStake } = useModal();

  const [numTotalPoint, setNumTotalPoint] = useState(0);
  const _getNftDetail = useGetNft();

  const [nftsStaked, setNftsStaked] = useState<IStagingNftResponse[]>([]);
  const [nftsAbleToStake, setNftsAbleToStake] = useState<IStagingNftResponse[]>(
    []
  );
  const [pointKeeper, setPointKeeper] = useState<PointKeeper[]>([]);
  const [timeKeeper, setTimeKeeper] = useState<TimeKeeper[]>([]);

  const [nftsReadyToStake, setNftsReadyToStake] = useState<
    IStagingNftResponse[]
  >([]);
  const [nftsReadyToUnStake, setNftsReadyToUnStake] = useState<
    IStagingNftResponse[]
  >([]);

  const getNFTStaked = async () => {
    if (!address) return [];

    let nfts = [];
    let points: PointKeeper[] = [];
    let timeStakeds: TimeKeeper[] = [];

    const nftsStakedRes = await getStaked(address);
    for (let i = 0; i < nftsStakedRes?.length; i++) {
      let res = await _getNftDetail.mutateAsync({
        contract_address: formattedContractAddress(
          nftsStakedRes[i].contract_address
        ),
        token_id: nftsStakedRes[i].token_id,
      });
      let point = await getTotalPointItem(
        formattedContractAddress(nftsStakedRes[i].contract_address),
        nftsStakedRes[i].token_id
      );
      let timeStaked = await getTotalTimeStakedItem(
        nftsStakedRes[i].contract_address,
        nftsStakedRes[i].token_id
      );

      timeKeeper.push({
        contractAddress: formattedContractAddress(
          nftsStakedRes[i].contract_address
        ),
        tokenId: nftsStakedRes[i].token_id,
        time: timeStaked,
      });
      points.push({
        contractAddress: formattedContractAddress(
          nftsStakedRes[i].contract_address
        ),
        tokenId: nftsStakedRes[i].token_id,
        point,
      });
      nfts.push(res);
    }

    setTimeKeeper(timeStakeds);
    setPointKeeper(points);
    setNftsStaked(nfts);
  };

  const getNftsToStake = async () => {
    if (!address) return;
    const DreammyNfts = await getNftsAbleToStake(
      address,
      NFTContractToStake.DREAMY_BOTTY
    );
    const FlexEvo = await getNftsAbleToStake(
      address,
      NFTContractToStake.FLEX_EVO
    );

    let nftsStakedTemp = [];
    const nftsStaked = await getStaked(address);
    for (let i = 0; i < nftsStaked?.length; i++) {
      let res = await _getNftDetail.mutateAsync({
        contract_address: formattedContractAddress(
          nftsStaked[i].contract_address
        ),
        token_id: nftsStaked[i].token_id,
      });
      nftsStakedTemp.push(res);
    }
    const removedDuplicate = removeNftDuplicate(nftsStakedTemp, [
      ...DreammyNfts,
      ...FlexEvo,
    ]);
    console.log(removedDuplicate);

    setNftsAbleToStake(removedDuplicate);
  };

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

  const getTotalTimeStakedItem = async (
    contract_address: string,
    token_id: string
  ) => {
    try {
      const nftContract = new Contract(
        stakingABI,
        process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS || "",
        provider
      );

      const timeStaked = await nftContract.getStakedStatus(
        contract_address,
        token_id,
        {
          parseResponse: true,
        }
      );

      return Number(timeStaked.stakedAt);
    } catch (error) {
      return 0;
    }
  };

  const pointOfNft = (contractAddress: string, tokenId: string) => {
    let pointStaked = 0;
    pointKeeper.map((point) => {
      if (point.contractAddress == contractAddress && point.tokenId == tokenId)
        pointStaked = point.point;
    });
    return pointStaked;
  };

  const timeStakedOfNft = (contractAddress: string, tokenId: string) => {
    let timeStaked = 0;
    timeKeeper.map((time) => {
      if (time.contractAddress == contractAddress && time.tokenId == tokenId)
        timeStaked = time.time;
    });
    return timeStaked.toString();
  };

  const addNftToStake = (nft: IStagingNftResponse) => {
    setNftsReadyToStake([...nftsReadyToStake, nft]);
  };

  const removeNftToStake = (nftRemove: IStagingNftResponse) => {
    const newNftsToStake: IStagingNftResponse[] = [];
    nftsReadyToStake.map((nft) => {
      if (
        !(
          formattedContractAddress(nft.nftData.nftContract) ==
            formattedContractAddress(nftRemove.nftData.nftContract) &&
          nft.nftData.tokenId == nftRemove.nftData.tokenId
        )
      ) {
        newNftsToStake.push(nft);
      }
    });
    setNftsReadyToStake(newNftsToStake);
  };

  const addNftToUnStake = (nft: IStagingNftResponse) => {
    setNftsReadyToUnStake([...nftsReadyToUnStake, nft]);
  };

  const removeNftToUnStake = (nftRemove: IStagingNftResponse) => {
    const newNftsToUnStake: IStagingNftResponse[] = [];
    nftsReadyToUnStake.map((nft) => {
      if (
        !(
          formattedContractAddress(nft.nftData.nftContract) ==
            formattedContractAddress(nftRemove.nftData.nftContract) &&
          nft.nftData.tokenId == nftRemove.nftData.tokenId
        )
      ) {
        newNftsToUnStake.push(nft);
      }
    });
    setNftsReadyToUnStake(newNftsToUnStake);
  };

  const isSelected = (nftCheck: IStagingNftResponse, type: NFTState) => {
    let selected = false;
    if (type == NFTState.NOT_STAKE) {
      nftsReadyToStake.map((nft) => {
        if (
          formattedContractAddress(nft.nftData.nftContract) ==
            nftCheck.nftData.nftContract &&
          nft.nftData.tokenId == nftCheck.nftData.tokenId
        )
          selected = true;
      });
    } else {
      nftsReadyToUnStake.map((nft) => {
        if (
          formattedContractAddress(nft.nftData.nftContract) ==
            nftCheck.nftData.nftContract &&
          nft.nftData.tokenId == nftCheck.nftData.tokenId
        )
          selected = true;
      });
    }
    return selected;
  };

  const toggleAction = (nftCheck: IStagingNftResponse, type: NFTState) => {
    if (type == NFTState.NOT_STAKE) {
      if (isSelected(nftCheck, type)) removeNftToStake(nftCheck);
      else addNftToStake(nftCheck);
    } else {
      if (isSelected(nftCheck, type)) removeNftToUnStake(nftCheck);
      else addNftToUnStake(nftCheck);
    }
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

  const onStake = () => {
    toggleModalStake();
  };

  const onUnstake = () => {
    toggleModalUnStake();
  };

  const onReloadData = () => {
    setNftsReadyToStake([]);
    setNftsReadyToUnStake([]);
    if (address) {
      getNFTStaked();
      getNftsToStake();
      getUserTotalPoint();
    }
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
      onReloadData();
    }
  }, [address]);

  const removeNftDuplicate = (
    nftsStaked: IStagingNftResponse[],
    nftsAbleToStake: IStagingNftResponse[]
  ) => {
    if (nftsAbleToStake.length > 0 && nftsStaked.length > 0) {
      const result = nftsAbleToStake.filter(
        (ableToStake) =>
          !nftsStaked.some(
            (staked) =>
              ableToStake.nftData.nftContract == staked.nftData.nftContract &&
              ableToStake.nftData.tokenId == staked.nftData.tokenId
          )
      );

      return result;
    } else return nftsAbleToStake;
  };

  return (
    <div className="fixed-height-under-header flex w-full flex-col overflow-auto">
      <StakingPopup
        isOpen={isOpenStake}
        toggleModal={toggleModalStake}
        nfts={nftsReadyToStake}
        setNfts={setNftsReadyToStake}
        onReload={onReloadData}
        numOfStakingNfts={nftsStaked.length}
      />

      <UnStakingPopup
        isOpen={isOpenUnStake}
        toggleModal={toggleModalUnStake}
        nfts={nftsReadyToUnStake}
        setNfts={setNftsReadyToUnStake}
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
                <span className="text-[#56CCF2]">
                  {nftsStaked?.length || 0}
                </span>
              </p>

              <p className="font-normal">
                Points:<span className="text-[#FF9F0A]">{numTotalPoint}</span>
              </p>
            </div>

            {(nftsReadyToStake.length > 0 ||
              (nftsReadyToStake.length == 0 &&
                nftsReadyToUnStake.length == 0)) && (
              <Button
                title="Stake"
                className={`min-w-[106px] ${nftsReadyToStake.length == 0 && "!bg-grays"} `}
                onClick={onStake}
              />
            )}
            {nftsReadyToUnStake.length > 0 && (
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
                <div className="p-4">
                  <p className="text-grays">
                    If you can't see your nfts after unstaking, don't worry as
                    it is in process!
                  </p>
                </div>
                {nftsStaked.map(
                  (nftStaked: IStagingNftResponse, index: number) => {
                    return (
                      <div
                        className={`py-2 ${nftsReadyToStake.length > 0 && "opacity-70 pointer-events-none"}`}
                        key={index}
                      >
                        <div
                          className="flex cursor-pointer items-center py-1 pl-4 pr-8 uppercase hover:bg-dark-black"
                          onMouseDown={() =>
                            toggleAction(nftStaked, NFTState.STAKED)
                          }
                        >
                          <Checkbox
                            isChecked={isSelected(nftStaked, NFTState.STAKED)}
                            onChange={() => {}}
                          />

                          <div className="relative ml-2 flex flex-1 items-center justify-start">
                            <ImageKit
                              alt=""
                              src={nftStaked?.nftData?.image}
                              className="ml-2 h-[52px] w-[52px]"
                            />

                            <p className="ml-4 truncate font-normal">
                              {nftStaked?.nftData?.name}
                            </p>
                          </div>

                          <div className="flex min-w-[200px] items-center justify-end">
                            <p>
                              {timeElapsed(
                                timeStakedOfNft(
                                  nftStaked.nftData.nftContract,
                                  nftStaked.nftData.tokenId
                                )
                              )}
                            </p>
                          </div>
                          <div className="flex min-w-[150px] items-center justify-end">
                            {pointOfNft(
                              nftStaked.nftData.nftContract,
                              nftStaked.nftData.tokenId
                            )}
                          </div>
                          <div className="flex min-w-[200px] items-center justify-end">
                            {/* {renderAction(_.staking?.status)} */}
                            <Button
                              title="Unstake"
                              variant="outline"
                              className="border-cancel text-cancel"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}

                {nftsAbleToStake.map(
                  (nftAbleToStake: IStagingNftResponse, index: number) => {
                    return (
                      <div
                        className={`py-2 ${nftsReadyToUnStake.length > 0 && "opacity-70 pointer-events-none"}`}
                        key={index}
                      >
                        <div
                          className="flex cursor-pointer items-center py-1 pl-4 pr-8 uppercase hover:bg-dark-black"
                          onMouseDown={() =>
                            toggleAction(nftAbleToStake, NFTState.NOT_STAKE)
                          }
                        >
                          <Checkbox
                            isChecked={isSelected(
                              nftAbleToStake,
                              NFTState.NOT_STAKE
                            )}
                            onChange={() => {}}
                          />

                          <div className="relative ml-2 flex flex-1 items-center justify-start">
                            <ImageKit
                              alt=""
                              src={nftAbleToStake?.nftData?.image}
                              className="ml-2 h-[52px] w-[52px]"
                            />

                            <p className="ml-4 truncate font-normal">
                              {nftAbleToStake?.nftData?.name}
                            </p>
                          </div>

                          <div className="flex min-w-[200px] items-center justify-end">
                            {/* <p> {timeElapsed(nftStaked.staking?.updatedAt)}</p> */}
                            <p>-</p>
                          </div>
                          <div className="flex min-w-[150px] items-center justify-end">
                            {/* {_.point} */} -
                          </div>
                          <div className="flex min-w-[200px] items-center justify-end">
                            {/* {renderAction(_.staking?.status)} */}
                            <Button title="Stake" />
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staking;
