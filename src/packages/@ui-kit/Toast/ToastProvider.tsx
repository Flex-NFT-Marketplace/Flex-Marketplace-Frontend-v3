"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Toast from ".";

interface ToastContextType {
  onShowToast: (message: string, messageType?: MessageType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

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

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<MessageType>(
    MessageTypeEnum.INFO,
  );

  // handle Popup
  const [isShow, setIsShow] = useState(false);

  const onShowToast = (message: string, messageType?: MessageType) => {
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
    onShowToast,
  };

  return (
    <ToastContext.Provider value={value}>
      <Toast isShow={isShow} hide={setIsShow} message={message}></Toast>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useNotify must be used within a NotifyProvider");
  }
  return context;
};

export default ToastProvider;
