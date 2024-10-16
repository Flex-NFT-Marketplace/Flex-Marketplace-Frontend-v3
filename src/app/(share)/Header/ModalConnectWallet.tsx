import Modal from "@/lib/@core/Modal";
import BraavosSVG from "@/assets/braavos.svg";
import Arg from "@/assets/anx.svg";
import { useConnect } from "@starknet-react/core";
import ImageKit from "@/packages/@ui-kit/Image";
interface IModalConnectWalletProps {
  isShowing: boolean;
  hide: () => void;
}

const ModalConnectWallet: React.FC<IModalConnectWalletProps> = (props) => {
  const { isShowing, hide } = props;
  const { connect, connectors, connectAsync } = useConnect();

  return (
    <Modal isShowing={isShowing} hide={hide}>
      <div className="mx-auto flex max-w-[400px] animate-fade flex-col items-center justify-center gap-8 p-4 animate-duration-200 animate-ease-in max-sm:p-2">
        <div className="flex flex-col items-center gap-2">
          <p className="text-3xl font-normal">Connect Wallet</p>
          <p className="text-grays">Choose a wallet to connect</p>
        </div>

        <div className="flex w-full flex-col gap-3 px-4 font-normal">
          {connectors.map((connector) => {
            if (connector.id == "argentX") {
              return (
                <div
                  key={connector.id}
                  onClick={() => {
                    connectAsync({ connector });
                    hide();
                  }}
                  className="flex w-full cursor-pointer items-center border border-stroke py-2 pl-2 hover:border-primary"
                >
                  <ImageKit src={Arg} alt="" height={40} width={40} />
                  <div className="w-full text-center">
                    <p>Argent Wallet</p>
                  </div>
                </div>
              );
            }

            if (connector.id == "braavos") {
              return (
                <div
                  key={connector.id}
                  className="flex w-full cursor-pointer items-center border border-stroke py-2 pl-2 hover:border-primary"
                  onClick={() => {
                    connectAsync({ connector });
                    hide();
                  }}
                >
                  <ImageKit
                    src={BraavosSVG}
                    alt=""
                    height={40}
                    width={40}
                    className="rounded"
                  />
                  <div className="w-full text-center">
                    <p>Braavos Wallet</p>
                  </div>
                </div>
              );
            }
          })}
        </div>
        {/* <div>
          <p className="text-center text-sm text-grays">
            By using Flex, you agree to our Term of Service and our Privacy
            Policy
          </p>
        </div> */}
      </div>
    </Modal>
  );
};

export default ModalConnectWallet;
