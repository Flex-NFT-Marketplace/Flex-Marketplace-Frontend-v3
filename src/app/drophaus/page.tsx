import SocialProvider from "@/services/providers/SocialProvider";
import Profile from "./[userAddress]/Profile";
import NewsFeed from "./[userAddress]/NewsFeed";

const Social = () => {
  return (
    <div className="relative mt-16 flex max-w-[1600px] px-2 mx-auto">
      <div className="max-xl:hidden">
        <Profile />
      </div>
      <NewsFeed />
    </div>
  );
};

export default Social;
