"use client";

import { useContext, useEffect, useState } from "react";
import { ModalContext } from "@/providers/modal";
import { X } from "@/assets";
import { getTeamSeasonPlayers } from "@/actions";

const DATA_SHOW: Record<string, string> = {
  faceoffWinPct: "faceoff win %",
  gamesPlayed: "games played",
  goalsAgainst: "goals against",
  goalsAgainstPerGame: "goals against (avg)",
  goalsFor: "goals for",
  goalsForPerGame: "goals for (avg)",
  losses: "losses",
  otLosses: "OT losses",
  penaltyKillNetPct: "penalty kill net %",
  penaltyKillPct: "penalty kill %",
  pointPct: "point %",
  points: "points",
  powerPlayNetPct: "powerplay net %",
  powerPlayPct: "powerplay %",
  regulationAndOtWins: "regulation + OT wins",
  shotsAgainstPerGame: "shots against (avg)",
  shotsForPerGame: "shots for (avg)",
  wins: "wins",
  winsInRegulation: "regulation wins",
  winsInShootout: "shootout wins",
}

const Team = ({ data, season }: { data: any; season: string }): JSX.Element => {

  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState([]);
  const { toggleOpen } = useContext(ModalContext);

  useEffect(() => {
    getTeamSeasonPlayers(data.teamId, season)
      .then((result) => {
        setPlayers(result);
      }).catch((error) => {
        console.log(error);
      }).finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col h-full justify-start items-start p-4">
      <div
        onClick={(): void => toggleOpen()}
        className="absolute top-4 right-4 w-5 h-5 cursor-pointer z-10"
      >
        <X height="1rem" width="1rem" />
      </div>
      <h1 className="text-2xl">{data.teamFullName}</h1>
      <p className="text-sm">{season} season</p>
      <div className="flex flex-row justify-between items-start w-full my-6">
        <div>
          <p className="text-center my-2">Team Stats:</p>
          <div className="flex flex-row text-xs">
            <div>
              {Object.values(DATA_SHOW).map((value) => (
                <p key={value} className="odd:bg-gray-800 px-2 py-1">{value}</p>
              ))}
            </div>
            <div>
            {Object.entries(DATA_SHOW).map(([key, value]) => (
              <p key={key} className="odd:bg-gray-800 px-2 py-1">
                {Math.round(data[key] * (value.includes("%") ? 100 : 1) * 1000) / 1000}
              </p>
            ))}
            </div>
          </div>
        </div>
        <div>
          <p className="text-center my-2">Team Roster:</p>
          {loading ? (
            <div className="conic animate-spin duration-1250 w-6 h-6" />
            ) : (
            <div className="overflow-y-scroll max-h-[calc(1.5rem*20)]">
            {players.map((player: any, ind: number) => (
              <div key={ind} className="flex flex-row items-center gap-4 text-xs justify-between py-1">
                <div className="flex flex-row items-center">
                  <div className="w-8 h-8 rounded-full relative bg-contain bg-center mr-2" style={{ backgroundImage: `url(${player.headshot})`}} />
                  <p>
                    <span className="mr-1">{player.firstName}</span>
                    <span>{player.lastName}</span>
                  </p>
                </div>
                <p className='w-20 opacity-60'>{player.playerType}</p>
              </div>
            ))}
          </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Team;
