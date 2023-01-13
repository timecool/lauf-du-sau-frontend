import Link from 'next/link';

import Leaderboard from '../leaderboard/leaderboard';

const Home = () => {
  return (
    <div className="container mx-auto grid px-2 pt-12 md:px-0">
      <Link href="/leaderboard" className="flex items-center justify-between">
        <h2 className="pb-2 text-2xl font-bold">Leaderboard</h2>
        <div className="text-sm">Show more</div>
      </Link>
      <Leaderboard isSlice />
    </div>
  );
};

export default Home;
