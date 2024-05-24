import { Suspense } from 'react';

import Overview from '@/components/main';
import { getSeasons, getTeams } from '@/actions';

const Home = async ({ searchParams }: { searchParams: { season: string }}): Promise<JSX.Element> => {

  const { season } = searchParams;

  const seasons = await getSeasons();

  let activeSeason = season;
  if (!season || !seasons.map((s: any) => s.id).includes(Number(season))) {
    activeSeason = seasons.slice(-1)[0].id;
  }

  const data = await getTeams(activeSeason);

  return (
    <main className="flex flex-col h-full justify-center items-center p-4">
      <h1 className="text-2xl">NHL Stats</h1>
      <p className="text-sm text-gray-400 mt-2 mb-4">Select a season. Click into each team to see more detailed metrics.</p>
      <Suspense fallback={<div className="conic animate-spin duration-1250 w-6 h-6" />}>
        <Overview initialData={data} seasons={seasons} activeSeason={activeSeason} key={activeSeason} />
      </Suspense>
    </main>
  )
};

export default Home;
