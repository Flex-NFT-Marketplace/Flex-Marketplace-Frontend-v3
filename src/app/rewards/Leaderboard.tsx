"use client";
import ImageKit from "@/packages/@ui-kit/Image";

const Leaderboard = () => {
  return (
    <div className="relative flex-1">
      <div className="relative h-full overflow-auto">
        <div className="border-b border-line px-6 pb-4 lg:pt-8">
          <p className="text-xl font-bold uppercase max-lg:hidden">
            Leaderboard
          </p>
        </div>
        <div className="px-6">
          <table className="min-w-full rounded-lg text-white">
            <thead className="top-0 bg-background lg:sticky">
              <tr className="border-b border-line px-6">
                <th className=" py-4 text-left">POSITION</th>
                <th className="px-6 py-4 text-left">PROFILE</th>
                <th className="py-4 text-center lg:px-6">POINTS</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 20 }).map((_, index) => (
                <tr key={index}>
                  <td className="">{index}</td>
                  <td className="flex items-center px-6">
                    <ImageKit
                      src={""}
                      alt={""}
                      className="mr-4 h-10 w-10 rounded-full"
                    />
                    <span className="line-clamp-1">{"LAVIEH.STARK"}</span>
                  </td>
                  <td className="text-center lg:px-6">{200}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
