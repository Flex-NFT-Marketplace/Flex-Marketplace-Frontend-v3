"use client";

import Icon from "@/lib/@core/Icon";
import { MdOutlineFilterAlt } from "react-icons/md";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { TbActivity } from "react-icons/tb";
import { FiGrid } from "react-icons/fi";
import Search from "./Search";

import { useCallback, useEffect, useRef, useState } from "react";
import Filter from "./Filter";
import Profile from "./Profile";
import Activity from "./Activity";
import TableList from "./TableList";
import TableCard from "./TableCard";
import { useCollectionDetailContext } from "@/services/providers/CollectionDetailProvider";
import useModal from "@/hooks/useModal";
import { useLoading } from "@/packages/@ui-kit/Loading/LoadingProvider";

const CollectionPage = () => {
  const [isShowFilter, setIsShowFilter] = useState(true);
  const [isShowActivity, setIsShowActivity] = useState(false);

  const [isShowList, setIsShowList] = useState(false);
  const [isShowCard, setIsShowCard] = useState(true);
  const { isOpen: isOpenClaim, toggleModal: toggleModalClaim } = useModal();
  const { nfts, isFetching, fetchNextPage, hasNextPage, setTraitsActive } =
    useCollectionDetailContext();
  const { setLoading } = useLoading();
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleChangeViewList = (type: "list" | "card") => {
    if (type === "list") {
      setIsShowList(true);
      setIsShowCard(false);
    } else {
      setIsShowList(false);
      setIsShowCard(true);
    }
  };

  const handleScroll = useCallback(
    (e: any) => {
      const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

      if (scrollTop + clientHeight >= scrollHeight - 1) {
        if (!isFetching && hasNextPage) {
          fetchNextPage();
          setLoading(true);
        }
      }
    },
    [isFetching, fetchNextPage]
  );

  useEffect(() => {
    if (!scrollRef.current) return;
    // const scrollContainer = document.getElementById("scroll-container");
    scrollRef.current.addEventListener("scroll", handleScroll);

    if (!isFetching) {
      setLoading(false);
    }
  }, [isFetching]);

  // if screen size is less than 768px, set isShowFilter to false
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsShowFilter(false);
    }
  }, []);

  return (
    <div className="fixed-height-under-header flex flex-col overflow-hidden">
      <div
        className="h-fit overflow-auto"
        ref={scrollRef}
        onScroll={(e) => handleScroll(e)}
      >
        <div className="relative top-0 z-10">
          <Profile />

          {/* <ClaimPopup isOpen={isOpenClaim} toggleModal={toggleModalClaim} /> */}
        </div>
        <div
          id="filter-bar"
          className={`sticky top-0 z-10 flex h-[52px] justify-between border-b border-stroke bg-[#080804] px-8 font-normal max-md:px-5`}
        >
          <div className="flex items-center gap-4">
            <Icon
              active={isShowFilter}
              onClick={() => setIsShowFilter(!isShowFilter)}
            >
              <MdOutlineFilterAlt />
            </Icon>
          </div>

          <div className="flex items-center gap-4 py-2">
            {/* <Search /> */}
            <div className="flex items-center gap-0">
              <Icon
                onClick={() => handleChangeViewList("card")}
                active={isShowCard}
              >
                <FiGrid />
              </Icon>

              <Icon
                onClick={() => handleChangeViewList("list")}
                active={isShowList}
              >
                <MdOutlineFormatListBulleted />
              </Icon>
            </div>
            {/* <Icon>
                <TbReload />
              </Icon> */}

            <Icon
              onClick={() => setIsShowActivity(!isShowActivity)}
              active={isShowActivity}
            >
              <TbActivity />
            </Icon>
          </div>
        </div>

        <div className="flex">
          {isShowFilter && <Filter />}
          {isShowCard && (
            <TableCard
              isShowFilter={isShowFilter}
              isShowActivity={isShowActivity}
              isFetching={isFetching}
              nfts={nfts}
            />
          )}
          {isShowList && <TableList />}
          {isShowActivity && <Activity />}
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
