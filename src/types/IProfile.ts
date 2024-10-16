export interface IProfile {
  avatar: string;
  bio: string;
  stast: Stast;
  status: Status;
  social: Social;
  nick_name: string;
  about: string;
  _id: string;
  address: string;
  __v: number;
  image: string;
  listed: number;
  name: string;
}

export interface Social {
  website: string;
  telegram: string;
  x: string;
  warpcast: string;
  discord: string;
}

export interface Stast {
  listed: number;
  sold: number;
  bought: number;
  liked: number;
  disliked: number;
}

export interface Status {
  isVerified: boolean;
  isBanned: boolean;
  isLocked: boolean;
  isKol: boolean;
  isWhale: boolean;
}
