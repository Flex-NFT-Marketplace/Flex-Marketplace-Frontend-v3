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
                        <ActivityProvider>
                          <CollectionDetailProvider>
                            <LoadingHeaderProvider>
                              {children}
                            </LoadingHeaderProvider>
                          </CollectionDetailProvider>
                        </ActivityProvider>
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
