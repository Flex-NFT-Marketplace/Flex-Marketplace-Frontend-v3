import { INft } from "./INft";

export enum StakingStatusEnum {
  STAKED = "STAKED",
  UNSTAKED = "UNSTAKED",
}

export type StakingStatus =
  | StakingStatusEnum.STAKED
  | StakingStatusEnum.UNSTAKED;

export interface IStaking {
  contract_address: string;
  token_id: string;
  nft: INft;
  owner_address: string;
  from: string;
  to: string;
  transaction_hash_stake: string;
  transaction_hash_unstake?: string;
  status: StakingStatus;
}

export const STAKECOLLECTION = [
  "0x03859bf9178b48a4ba330d6872ab5a6d3895b64d6631197beefde6293bc172cd",
  "0x04546729db564bb29a9e1e215463f41bc53116ac75eeb8e029b8a87fee7d85fd",
];
