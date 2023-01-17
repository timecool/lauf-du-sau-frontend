import dayjs from 'dayjs';
import { isEmpty, map, orderBy, size, slice } from 'lodash';
import { useEffect, useState } from 'react';

import { getLeaderboard } from '@/api/calls/statistics';
import type { ILeaderboardUser } from '@/models/leaderboard';

import LeaderboardRow from './leaderboard-row';

interface IProps {
  isSlice?: boolean;
  title?: string;
}
const Leaderboard = (props: IProps) => {
  const [leaderboard, setLeaderboard] = useState<ILeaderboardUser[]>();
  const today = dayjs().format('YYYY-MM');
  const [month, setMonth] = useState<string>(today);

  const init = async () => {
    const response = await getLeaderboard(month);
    if (!isEmpty(response)) {
      const sortLeaderboard = orderBy(response, ['date'], ['desc']);
      if (props.isSlice) setLeaderboard(slice(sortLeaderboard, 0, 3));
      else setLeaderboard(sortLeaderboard);
    } else {
      setLeaderboard([]);
    }
  };
  useEffect(() => {
    init();
  }, []);
  useEffect(() => {
    init();
  }, [month]);
  const boardSize = size(leaderboard) - 1;

  return (
    <div className="relative h-[70vh] overflow-x-auto rounded-lg border border-black px-8 py-3 text-black">
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold">{props.title}</div>
        <input
          type="month"
          min="2023-01"
          max={today}
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
      </div>

      {map(leaderboard, (user, i) => (
        <LeaderboardRow
          key={user.user.id}
          boardSize={boardSize}
          user={user}
          index={i}
        />
      ))}

      {isEmpty(leaderboard) && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          No Runs found
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
