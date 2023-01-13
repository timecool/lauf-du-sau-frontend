import { isEmpty } from 'lodash';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { getLeaderboard } from '@/api/calls/statistics';
import type { ILeaderboardUser } from '@/models/leaderboard';

import Leaderboard from '../leaderboard';

const Home = () => {
  const [leaderboard, setLeaderboard] = useState<ILeaderboardUser[]>();
  const init = async () => {
    const response = await getLeaderboard();
    if (!isEmpty(response)) setLeaderboard(response);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div className="container mx-auto grid px-2 pt-12 md:px-0">
      <Link href="/leaderboard" className="flex items-center justify-between">
        <h2 className="pb-2 text-2xl font-bold">Leaderboard</h2>
        <div className="text-sm">Show more</div>
      </Link>
      <Leaderboard leaderboard={leaderboard} />
    </div>
  );
};

export default Home;
