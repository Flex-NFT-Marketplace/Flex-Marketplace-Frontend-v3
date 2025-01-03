import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

import BottomBar from "@/app/(share)/ButtonBar";
import AppProvider from "@/services/providers/AppProvider";
import Header from "./(share)/v2Header";
import LoadingReload from "@/components/LoadingReload/LoadingReload";

type TwitterPlayerDescriptor = {
  playerUrl: string | URL;
  streamUrl: string | URL;
  width: number;
  height: number;
};

export const metadata = {
  title: "Flex - Dynamic NFT Marketplace",
  description: "Where SocialFi meets gamification",
  twitter: {
    card: "player",
    site: "@Flex_strk",
    description: "Where SocialFi meets gamification",
    images: {
      url: "https://hyperflex.market/logo.svg",
      alt: "Flex - Dynamic NFT Marketplace",
    },
  },
  other: {
    "twitter:player": "https://hyperflex.market/",
    "twitter:player:width": "360",
    "twitter:player:height": "560",
    title: "Flex - Dynamic NFT Marketplace",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <LoadingReload />
          <Header />
          {children}
          {/* <BottomBar /> */}
        </AppProvider>
      </body>

      <GoogleAnalytics gaId="G-J8MB2XFB09" />
    </html>
  );
}
