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
    const storedToken = Cookies.get("tokenAccess");

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const saveToken = (token: string) => {
    setToken(token);
    Cookies.set("tokenAccess", token, {
      expires: 1,
      secure: true,
      sameSite: "Strict",
    });
  };

  const removeToken = () => {
    setToken(null);
    Cookies.remove("tokenAccess");
  };

  const _getNonce = useGetNonce();
  const _postValidateSign = usePostValidateSign();

  const signMessageValidate = async () => {
    if (status === "connected") {
      try {
        const typeMessage = await _getNonce.mutateAsync(address);
        if (typeMessage === "error") {
          onShowToast("Error while getting nonce", MessageTypeEnum.ERROR);
        }

        let sign = await account?.signMessage(typeMessage);

        const res = await _postValidateSign.mutateAsync({
          address: address,
          sign: sign,
        });

        const accessToken = res.accessToken;

        saveToken(accessToken);
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
    setToken(null);
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
