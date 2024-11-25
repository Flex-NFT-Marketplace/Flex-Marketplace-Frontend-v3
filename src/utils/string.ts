import { ICollection } from "@/types/ICollection";
import { IStagingCollection } from "@/types/IStagingCollection";
import { BigNumber, ethers } from "ethers";
import { shortString } from "starknet";

export const strShortAddress = (address: string) => {
  if (!address) return "-";
  const start = address.substring(0, 6);
  const end = address.substring(address.length - 4);
  return `${start}...${end}`;
};

export const strShortPrefixAddress = (address: string) => {
  if (!address) return "-";
  const start = address.substring(0, 8);
  return `${start.toUpperCase()}`;
};

export const arrToString = (input: string[] | string) => {
  if (Array.isArray(input)) {
    return input.join(", ");
  } else {
    return input;
  }
};

function splitString(myString: string): string[] {
  const myShortStrings: string[] = [];
  while (myString.length > 0) {
    myShortStrings.push(myString.slice(0, 31));
    myString = myString.slice(31);
  }
  return myShortStrings;
}

export const encodeString = (myString: string) => {
  const myShortStrings = splitString(myString);
  return myShortStrings.map((shortStr) => {
    return shortString.encodeShortString(shortStr);
  });
};

export const convertWeiToEther = (wei: string) => {
  if (wei === undefined || wei === null || wei == "") return 0;
  return Number(ethers.utils.formatEther(wei));
};

export const convertEtherToWei = (ether: string | number) => {
  if (ether === undefined || ether === null || ether === "") return "0";

  if (typeof ether === "string" && /e/i.test(ether)) {
    const [coeff, exp] = ether.split("e").map(Number);
    const wei = BigNumber.from(coeff.toFixed(18)).mul(
      BigNumber.from(10).pow(exp + 18),
    );
    return wei.toString();
  }
  return ethers.utils.parseEther(ether.toString()).toString();
};

export function formatTimestamp(timestamp: number | undefined): string {
  if (timestamp === undefined) {
    return "N/A";
  }
  const date = new Date(timestamp * 1000);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // +1 because getMonth() returns 0-11
  const year = date.getFullYear();
  return `${hours}:${minutes} ${day}/${month}/${year}`;
}

export function calculateTimeDifferenceShort(targetTime: string): string {
  if (targetTime === null || !targetTime) return "-";

  const targetDateTime = new Date(targetTime);
  const currentTime = new Date();

  const timeDifference = targetDateTime.getTime() - currentTime.getTime();
  const isPast = timeDifference < 0;

  const seconds = Math.abs(Math.floor(timeDifference / 1000));
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const start = isPast ? "" : "After";
  const prefix = isPast ? "" : "";

  if (days > 0) {
    return ` ${start} ${Math.abs(days)} day${
      Math.abs(days) > 1 ? "" : ""
    } ${prefix}`;
  } else if (hours > 0) {
    return ` ${start} ${Math.abs(hours)} h${
      Math.abs(hours) > 1 ? "" : ""
    } ${prefix}`;
  } else {
    return ` ${start} ${Math.abs(minutes)} m${
      Math.abs(minutes) > 1 ? "" : ""
    } ${prefix}`;
  }
}

export function timeElapsed(pastDate: string): string {
  if (!pastDate) {
    return "-";
  }
  const now: Date = new Date();
  const past: Date = new Date(pastDate);

  // Kiểm tra xem 'past' có phải là một ngày hợp lệ không
  if (isNaN(past.getTime())) {
    throw new Error("Invalid date format");
  }

  const diffInMs: number = now.getTime() - past.getTime();

  const msInMinute: number = 60 * 1000;
  const msInHour: number = msInMinute * 60;
  const msInDay: number = msInHour * 24;

  const days: number = Math.floor(diffInMs / msInDay);
  const hours: number = Math.floor((diffInMs % msInDay) / msInHour);
  const minutes: number = Math.floor((diffInMs % msInHour) / msInMinute);

  return `${days}d:${hours}h:${minutes}m`;
}

export function timeElapsedFromTimestamp(timestamp: number): string {
  if (timestamp === undefined) {
    return "N/A";
  }

  const now: Date = new Date();
  const past: Date = new Date(timestamp * 1000); // Convert seconds to milliseconds

  // Check if 'past' is a valid date
  if (isNaN(past.getTime())) {
    throw new Error("Invalid timestamp");
  }

  // Calculate the absolute difference in milliseconds
  const diffInMs: number = Math.abs(now.getTime() - past.getTime());
  const msInMinute: number = 60 * 1000;
  const msInHour: number = msInMinute * 60;
  const msInDay: number = msInHour * 24;

  const days: number = Math.floor(diffInMs / msInDay);
  const hours: number = Math.floor((diffInMs % msInDay) / msInHour);
  const minutes: number = Math.floor((diffInMs % msInHour) / msInMinute);

  return `${days}d ${hours}h ${minutes}m`;
}

export function calculatePointsStaking(
  pastDate: string,
  pointsPerHour: number,
): string | number {
  if (!pastDate) {
    return "-";
  }

  const now: Date = new Date();
  const past: Date = new Date(pastDate);

  // Kiểm tra xem 'past' có phải là một ngày hợp lệ không
  if (isNaN(past.getTime())) {
    throw new Error("Invalid date format");
  }

  const diffInMs: number = now.getTime() - past.getTime();
  const msInHour: number = 60 * 60 * 1000;
  const hours: number = diffInMs / msInHour;

  return Math.floor(hours * pointsPerHour);
}

export const formattedContractAddress = (contractAddress: string) => {
  while (contractAddress.trim().length < 66) {
    contractAddress = contractAddress.trim().replace("0x", "0x0");
  }

  return contractAddress.toLowerCase().trim();
};

export function calculateDaysElapsed(timestamp: number): string {
  const currentTime: number = Date.now(); // Lấy thời gian hiện tại
  const timeElapsed: number = currentTime - timestamp; // Tính thời gian đã trôi qua
  const daysElapsed: number = Math.floor(timeElapsed / (1000 * 60 * 60 * 24)); // Chuyển đổi mili giây thành ngày
  return daysElapsed + " day ago";
}

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

export const convertStagingCollectionTypeToICollectionType = (staginCollection: IStagingCollection): ICollection => {
  
    const collectionConverted: ICollection = {
      contract_address: staginCollection?.nftContract,

      schema: staginCollection?.standard,
    
      name: staginCollection?.name,
    
      description: staginCollection?.description,
    
      symbol: staginCollection?.symbol,
    
      external_url: "",
    
      image_url: staginCollection?.avatar,
    
      banner_url: staginCollection?.cover,

      stats: {
        collection_best_offer: 0,
        nft_count: 0,
        owner_count: 0,
        asset_count: 0,
        total_volume: 0,
        total_listing_count: 0,
        collection_floor_price: 0,
        stats1D: {
          sale_count: 0,
          volume: 0,  
          avg_price: 0,
        }
      },
        status: {
          is_active: true,
          is_banner: false,
          is_verified: false,
          is_new_collection: false,
          is_trending: false,
          is_18: false,
          banner_prioritize: 0,
        }
    }

    return collectionConverted;
}
