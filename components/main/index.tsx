"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import LeaderboardData from "./data";
import LeaderboardNav from "./nav";
import { cn } from "@/lib/utils";

const Overview = ({ initialData, seasons, activeSeason }: { initialData: any[], seasons: any[]; activeSeason: string }): JSX.Element => {
  const [sortKey, setSortKey] = useState("teamFullName");
  const [listOrder, setListOrder] = useState("asc");
  const [data, setData] = useState([...initialData]);
  const router = useRouter();

  const handleSeason = (season: string) => {
    if (season == activeSeason) return;
    router.replace(`/?season=${season}`);
  }

  const handleSearch = (header: string): void => {
    let newOrder = "asc";
    if (header === sortKey) {
      newOrder = listOrder === "asc" ? "desc" : "asc";
    }
    const dataSorted = data.toSorted((a,b) => {
      if (a[header] > b[header]) {
        return newOrder == "asc" ? 1 : -1;
      }
      if (a[header] < b[header]) {
        return newOrder == "asc" ? -1 : 1;
      }
      return 0;
    });
    setSortKey(header)
    setListOrder(newOrder);
    setData(dataSorted);
  };

  return (
    <div className="flex flex-col items-center max-w-full">
      <div className="flex flex-row gap-2 justify-start flex-wrap">
        {seasons.map((season, ind) => (
          <div
            key={ind}
            className={cn("border border-white p-1 rounded-md text-xs cursor-pointer", season.id != activeSeason && "opacity-50")}
            onClick={() => handleSeason(season.id)}
          >
            {season.id}
          </div>
        ))}
      </div>
      <div className="flex flex-col leaderboard-container">
        <LeaderboardNav sort={sortKey} order={listOrder} handleSearch={handleSearch} />
        <div className="leaderboard">
          <LeaderboardData data={data} season={activeSeason} />
        </div>
      </div>
    </div>
  );
};

export default Overview;