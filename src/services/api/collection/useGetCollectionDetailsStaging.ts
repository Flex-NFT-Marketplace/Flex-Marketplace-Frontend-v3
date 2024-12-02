import axios from "axios";

export const getCollectionDetailStaging = async (contract_address: string) => {
  try {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_API_STAGING + "nft-collection/" + contract_address,
    );
    return { success: true, message: null , data: res.data.data };
  } catch (error) {
    return { success: false, message: error, data: null };
  }
};



