import Activities from "./Activities";
import NewsFeed from "./NewsFeed";
import Profile from "./profile";

const Social = () => {
  return (
    <div className="relative mt-16 flex">
      <div className="max-xl:hidden">
        <Profile />
      </div>
      <NewsFeed />
      <div className="max-md:hidden">
        <Activities />
      </div>
    </div>
  );
};

export default Social;
