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

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NotifyProvider>
        <TanstackProvider>
          <StarknetProvider>
            <UIKitProvider>
              <AccountProvider>
                <AuthProvider>
                  <CartProvider>
                    <NftProvider>
                      <CollectionProvider>
                        <PackCollectionProvider>
                          <ActivityProvider>
                            <CollectionDetailProvider>
                              <DropDetailProvider>
                                <LoadingHeaderProvider>
                                  {children}
                                </LoadingHeaderProvider>
                              </DropDetailProvider>
                            </CollectionDetailProvider>
                          </ActivityProvider>
                        </PackCollectionProvider>
                      </CollectionProvider>
                    </NftProvider>
                  </CartProvider>
                </AuthProvider>
              </AccountProvider>
            </UIKitProvider>
          </StarknetProvider>
        </TanstackProvider>
      </NotifyProvider>
    </>
  );
};

export default AppProvider;
