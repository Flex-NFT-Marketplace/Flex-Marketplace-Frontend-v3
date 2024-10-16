"use client";
import Banner from "./(home)/Banner";
import FooterImage from "../assets/footer.svg";
import Trending from "./(home)/(trending)/Trending";
import Footer from "./(share)/Footer";
import { useContext, useEffect } from "react";
import { LoadingHeaderContext } from "@/services/providers/market/LoadingHeaderProvider";
import Image from "next/image";
import Activity from "./(home)/Activity";
import NewMint from "./(home)/(trending)/NewMint";
import Social from "./(home)/Social";
import ImageKit from "@/packages/@ui-kit/Image";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between gap-10 scroll-smooth">
      <Banner />
      <Trending />
      {/* <TrendingCollection /> */}
      {/* <TrendingCollection /> */}
      {/* <Activity /> */}
      <Social />
      <Activity />
      <Footer />

      <div className="absolute bottom-0 left-0 right-0 -z-10">
        <ImageKit
          alt=""
          src={FooterImage}
          className="h-[360px] w-full object-cover"
        />
      </div>
    </main>
  );
}
