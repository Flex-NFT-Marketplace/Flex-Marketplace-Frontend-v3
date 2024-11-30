import Checkbox from "@/lib/@core/Checkbox";
import { ITraits } from "@/types/IStagingCollection";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface TraitsProps {
  //   traits: ITraits;
}

const Traits: React.FC<TraitsProps> = ({}) => {
  const [isShowTraits, setIsShowTraits] = useState(false);
  const [traitsActive, setTraitsActive] = useState<string>("");
  return (
    <div>
      <div
        className="flex cursor-pointer items-center justify-between text-xl transition-all"
        onClick={() => setIsShowTraits(!isShowTraits)}
      >
        <p>Traits</p>
        <div className="flex items-center gap-2 text-grays">
          <p>223</p>
          {isShowTraits ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
      </div>
      <div className={`${!isShowTraits && "hidden"} flex flex-col gap-3`}>
        {Array.from({ length: 10 }).map((_, index: number) => (
          <div className="flex justify-between items-center">
            <p>Traits</p>
            <div className="flex items-center gap-2 text-grays">
              <p>223</p>
              <label className={"container-checkbox"}>
                <input type="radio" name={`traits-1`} />
                <span className="checkmark"></span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Traits;
