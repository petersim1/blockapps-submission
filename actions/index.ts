"use server";

import { TEAM_MAPPER } from "@/lib/constants";

export const getSeasons = (n: number=10): Promise<any> => {
  // returns last N seasons, in ascending order.
  return fetch("https://api.nhle.com/stats/rest/en/season?sort=id")
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((result) => {
      const { data } = result;
      return data.slice(data.length - n);
    })
};

export const getSeason = (season: string): Promise<any> => {
  return fetch(`https://api.nhle.com/stats/rest/en/season?cayenneExp=id=${season}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((result) => {
      const { data } = result;
      return data;
    })
};

export const getCurrentSeasonId = (): Promise<any> => {
  return getSeasons()
    .then((seasons) => {
      return seasons.slice(-1)[0].id
    });
};

export const getTeams = (season: string, sort?: string): Promise<any> => {
  const sortKey = sort ?? "teamFullName";
  const BASE_URL = `https://api.nhle.com/stats/rest/en/team/summary?cayenneExp=seasonId=${season}&sort=${sortKey}`;

  return fetch(BASE_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((result) => {
      const { data } = result;
      return data;
    });
};

export const getTeamSeason = (teamId: number, season: string): Promise<any> => {
  const BASE_URL = `https://api.nhle.com/stats/rest/en/team/summary?cayenneExp=seasonId=${season}%20and%20teamId=${teamId}`;

  return fetch(BASE_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((result) => {
      const { data } = result;
      return data[0];
    });
}

export const getTeamSeasonPlayers = (teamId: number, season: string): Promise<any> => {
  const teamTriCode = TEAM_MAPPER[teamId];
  const URL = `https://api-web.nhle.com/v1/roster/${teamTriCode}/${season}`;

  const POSITION_MAPPER: Record<string, string> = {
    forwards: "forward",
    defensemen: "defense",
    goalies: "goalie",
  }
  
  return fetch(URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((result) => {
      const players: any[] = [];
      Object.entries(result).forEach(([key,values]) => {
        (values as any[]).forEach((player: any) => {
          const { id, headshot, firstName, lastName } = player;
          players.push({
            playerType: POSITION_MAPPER[key],
            id,
            headshot,
            firstName: firstName.default,
            lastName: lastName.default,
          })
        })
      })
      return players;
    });
};