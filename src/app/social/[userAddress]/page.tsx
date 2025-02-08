import SocialProvider from "@/services/providers/SocialProvider";
import Activities from "./Activities";
import NewsFeed from "./NewsFeed";
import Profile from "./Profile";

const Social = () => {
  return (
    <SocialProvider>
      <div className="relative mt-16 flex max-w-[1600px] px-2 mx-auto">
        <div className="max-xl:hidden">
          <Profile />
        </div>
        <NewsFeed />
        <div className="max-md:hidden">
          <Activities />
        </div>
      </div>
    </SocialProvider>
  );
};

export default Social;
