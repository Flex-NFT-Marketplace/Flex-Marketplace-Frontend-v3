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
      BigNumber.from(10).pow(exp + 18)
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
    return "-";
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
  pointsPerHour: number
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

export const formattedContractAddress = (contractAddress: string | undefined) => {
  if (!contractAddress || contractAddress == '') return "";
  while (contractAddress.trim().length < 66) {
    contractAddress = contractAddress.trim().replace("0x", "0x0");
  }

  return contractAddress.toLowerCase().trim();
};

export function calculateDaysElapsed(timestamp: number): string {
  const currentTime: number = Date.now();
  const timeElapsed: number = currentTime - timestamp;

  const millisecondsInADay = 1000 * 60 * 60 * 24;
  const daysElapsed: number = Math.floor(timeElapsed / millisecondsInADay);

  if (daysElapsed < 30) {
    return daysElapsed === 1 ? "1 day ago" : `${daysElapsed} days ago`;
  } else {
    const monthsElapsed: number = Math.floor(daysElapsed / 30);
    return monthsElapsed === 1 ? "1 month ago" : `${monthsElapsed} months ago`;
  }
}

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

export const formatLink = (link: string) => {
  if (!link) return "";
  if (
    !link.startsWith("http://") &&
    !link.startsWith("https://") &&
    !link.startsWith("data:")
  ) {
    return "https://" + link;
  } else return link;
};

export const getShortTraits = (trait_value: string, maxLength: number) => {
  if (!trait_value) return "";
  if (trait_value.toString().length < maxLength) return trait_value;
  return trait_value.toString().slice(0, maxLength) + "...";
};

export const ipfsPrefix = "ipfs://";

export const convertIpfsUrl = (imageUrl: string): string => {
  const httpPrefix = "https://ipfs.io/ipfs/";

  if (imageUrl.startsWith(ipfsPrefix)) {
    return httpPrefix + imageUrl.slice(ipfsPrefix.length);
  }
  return imageUrl;
};

export const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}
export const isDigit = (str: string): boolean => {
  str = str.trim();
  const regex = /^-?\d+(\.\d+)?$/;

  return regex.test(str);
};
