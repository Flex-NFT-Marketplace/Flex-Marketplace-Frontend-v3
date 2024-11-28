"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import useGetNonce from "../api/auth/usePostNonce";
import usePostValidateSign from "../api/auth/usePostValidateSign";
import {
  MessageTypeEnum,
  useToast,
} from "@/packages/@ui-kit/Toast/ToastProvider";
import { useAccount } from "@starknet-react/core";
import { ACCESS_TOKEN, USER_ADDRESS } from "@/constants/cookies";
import { deleteCookie, getCookie, setCookie } from "@/helpers/cookie";
import useGetAccessToken from "../api/auth/useGetAccessToken";

interface AuthContextType {
  token: string | null;
  saveToken: (token: string) => void;
  removeToken: () => void;
  signMessageValidate: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { status, address, account } = useAccount();
  const [token, setToken] = useState<string | any>(null);
  const { onShowToast } = useToast();

  useEffect(() => {
    const storedToken = getCookie(ACCESS_TOKEN);

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const saveToken = (token: string) => {
    setToken(token);
    setCookie({ key: ACCESS_TOKEN, value: token });
    // Cookies.set(ACCESS_TOKEN, token, {
    //   expires: 1,
    //   secure: true,
    //   sameSite: "Strict",
    // });
  };

  const removeToken = () => {
    setToken(null);
    deleteCookie(ACCESS_TOKEN);
    // Cookies.remove(ACCESS_TOKEN);
  };

  const _getNonce = useGetNonce();
  const _postValidateSign = usePostValidateSign();
  const _getAccessToken = useGetAccessToken();

  const signMessageValidate = async () => {
    if (status === "connected") {
      try {
        const nonceResponse = await _getNonce.mutateAsync(address);

        if (nonceResponse === "error") {
          onShowToast("Error while getting nonce", MessageTypeEnum.ERROR);
        }

        let sign = await account?.signMessage(nonceResponse.signMessage);
        const rpc = "https://starknet-mainnet.public.blastapi.io";
        const res = await _getAccessToken.mutateAsync({
          address: address,
          sign: sign,
          rpc,
        });

        const accessToken = res.token;

        saveToken(accessToken);
        setCookie({ key: USER_ADDRESS, value: address! });
        onShowToast("Sign message success", MessageTypeEnum.SUCCESS);
        return true;
      } catch (error) {
        onShowToast("Error while getting nonce", MessageTypeEnum.ERROR);
        return false;
      }
    }

    return false;
  };

  useEffect(() => {
    const currentAddress = getCookie(USER_ADDRESS);
    const accessToken = getCookie(ACCESS_TOKEN);
    if (!address) return;
    if (address && !accessToken) {
      signMessageValidate();
    } else if (address && accessToken && address != currentAddress) {
      signMessageValidate();
    }
  }, [address]);

  const value = { token, saveToken, removeToken, signMessageValidate };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
