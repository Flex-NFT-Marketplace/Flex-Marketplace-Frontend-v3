"use client";

import Modal from "@/lib/@core/Modal";

interface IToastPopupProps {
  isOpen: boolean;
  toggleModal: () => void;
  message?: string;
}

const ToastPopup: React.FC<IToastPopupProps> = (props) => {
  const { isOpen, toggleModal } = props;

  return (
    <Modal isShowing={isOpen} hide={toggleModal}>
      <div className="flex min-w-[486px] flex-col gap-6">
        <div className="flex flex-col items-center">
          <p className="text-2xl font-normal uppercase">Sell Your NFT</p>
          {/* <p className="font-normal text-grays">Account balance: 0.18 ETH</p> */}
        </div>
      </div>
    </Modal>
  );
};

export default ToastPopup;
