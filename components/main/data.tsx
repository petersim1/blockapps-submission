"use client";

import { useContext, useEffect, useState } from "react";
import { ModalContext } from "@/providers/modal";
import Team from "../team";

const LeaderboardData = ({ data, season }: { data: any[]; season: string }): JSX.Element => {
  const { toggleOpen, setContent } = useContext(ModalContext);

  const handleClick = (d: any): void => {
    setContent(<Team data={d} season={season} />);
    toggleOpen();
  }

  return (
    <div className="w-full gap-1 flex flex-col">
      {data.map((item, ind) => (
        <ul
          key={ind}
          className="leaderboard-element rounded-md
shadow bg-dark cursor-pointer transition-colors odd:bg-gray-800"
          onClick={(): void => handleClick(item)}
        >
          <li
            className="cursor-pointer rounded-lg text-sm
flex items-center gap-2 whitespace-nowrap max-w-full px-4"
          >
            <span>{item.teamFullName}</span>
          </li>
          <li
            className="cursor-pointer rounded-lg text-sm
flex items-center gap-2 whitespace-nowrap max-w-full px-4"
          >
            <span>{item.points}</span>
          </li>
          <li
            className="cursor-pointer rounded-lg text-sm
flex items-center gap-2 whitespace-nowrap max-w-full px-4"
          >
            <span>{item.wins}</span>
          </li>
          <li
            className="cursor-pointer rounded-lg text-sm
flex items-center gap-2 whitespace-nowrap max-w-full px-4"
          >
            <span>{item.losses}</span>
          </li>
          <li
            className="cursor-pointer rounded-lg text-sm
flex items-center gap-2 whitespace-nowrap max-w-full px-4"
          >
            <span>{item.goalsFor}</span>
          </li>
          <li
            className="cursor-pointer rounded-lg text-sm
flex items-center gap-2 whitespace-nowrap max-w-full px-4"
          >
            <span>{item.goalsAgainst}</span>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default LeaderboardData;