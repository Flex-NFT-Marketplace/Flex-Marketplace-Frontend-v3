"use client";

import NotifyPopup from "@/components/NotifyPopup";
import { createContext, useContext, useEffect, useState } from "react";

interface NotifyContextType {
  onShowNotify: (message: string, messageType?: MessageType) => void;
}

const NotifyContext = createContext<NotifyContextType | undefined>(undefined);

export enum MessageTypeEnum {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}
type MessageType =
  | MessageTypeEnum.SUCCESS
  | MessageTypeEnum.ERROR
  | MessageTypeEnum.WARNING
  | MessageTypeEnum.INFO;

const NotifyProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<MessageType>(
    MessageTypeEnum.INFO,
  );

  // handle Popup
  const [isShow, setIsShow] = useState(false);

  const onShowNotify = (message: string, messageType?: MessageType) => {
    setMessage(message);
    setMessageType(messageType || MessageTypeEnum.INFO);
    setIsShow(true);
  };

  useEffect(() => {
    if (!isShow) return;

    setTimeout(() => {
      setIsShow(false);
    }, 3000);
  }, [isShow]);

  const value = {
    onShowNotify,
  };

  return (
    <NotifyContext.Provider value={value}>
      <NotifyPopup
        isShowing={isShow}
        setIsShowing={setIsShow}
        message={message}
      ></NotifyPopup>
      {children}
    </NotifyContext.Provider>
  );
};

export const useNotify = () => {
  const context = useContext(NotifyContext);
  if (context === undefined) {
    throw new Error("useNotify must be used within a NotifyProvider");
  }
  return context;
};

export default NotifyProvider;
