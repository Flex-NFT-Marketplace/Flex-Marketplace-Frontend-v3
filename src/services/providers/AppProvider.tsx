import UIKitProvider from "@/packages/@ui-kit/UIKitProvider";
import { AccountProvider } from "./AccountProvider";
import { ActivityProvider } from "./ActivityProvider";
import { AuthProvider } from "./AuthProvider";
import { CartProvider } from "./CartProvider";
import { CollectionProvider } from "./CollectionProvider";
import NftProvider from "./NFTProvider";
import NotifyProvider from "./NotifyProvider";
import { StarknetProvider } from "./StarknetProvider";
import TanstackProvider from "./TanstackProvider";
import LoadingHeaderProvider from "./market/LoadingHeaderProvider";
import { CollectionDetailProvider } from "./CollectionDetailProvider";
import { PackCollectionProvider } from "./PackCollectionProvider";
import DropDetailProvider from "./DropDetailProvider";
import CreateDropProvider from "./CreateDropProvider";
import { ToastContainer } from "react-toastify";
import SocialProvider from "./SocialProvider";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NotifyProvider>
        <TanstackProvider>
          <StarknetProvider>
            <UIKitProvider>
              <AuthProvider>
                <AccountProvider>
                  <CartProvider>
                    <NftProvider>
                      <CollectionProvider>
                        <PackCollectionProvider>
                          <ActivityProvider>
                            <CollectionDetailProvider>
                              <SocialProvider>
                                <DropDetailProvider>
                                  <LoadingHeaderProvider>
                                    {children}
                                    <ToastContainer
                                      stacked
                                      position="bottom-left"
                                    />
                                  </LoadingHeaderProvider>
                                </DropDetailProvider>
                              </SocialProvider>
                            </CollectionDetailProvider>
                          </ActivityProvider>
                        </PackCollectionProvider>
                      </CollectionProvider>
                    </NftProvider>
                  </CartProvider>
                </AccountProvider>
              </AuthProvider>
            </UIKitProvider>
          </StarknetProvider>
        </TanstackProvider>
      </NotifyProvider>
    </>
  );
};

export default AppProvider;
