import Banner from "./(home)/Banner";
import FooterImage from "../assets/footer.svg";
import Trending from "./(home)/(trending)/Trending";
import Footer from "./(share)/Footer";
import Activity from "./(home)/Activity";
import Social from "./(home)/Social";
import ImageKit from "@/packages/@ui-kit/Image";
import LaunchpadBanner from "./(home)/LaunchpadBanner";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between gap-10 scroll-smooth">
      <Banner />
      {/* <LaunchpadBanner /> */}

      <Trending />
      {/* <TrendingCollection /> */}
      {/* <TrendingCollection /> */}
      {/* <Activity /> */}
      {/* <Social /> */}
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
