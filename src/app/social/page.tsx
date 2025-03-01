"use client";

import { useSocial } from "@/services/providers/SocialProvider";
import HighlightDrops from "./HighlightDrops";
import HighlightCreator from "./HighlightCreator";
import RecentDrops from "./RecentDrops";
import RandomCreator from "./RandomCreator";

const Social = () => {
  const {} = useSocial();

  return (
    <div className="fixed-height-under-header flex w-full flex-col gap-[72px] py-8 overflow-auto">
      <HighlightDrops />
      <RandomCreator />
      <HighlightCreator />
      <RecentDrops />
    </div>
  );
};

export default Social;
