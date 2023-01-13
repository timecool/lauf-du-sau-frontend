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
  const init = async () => {
    const response = await getLeaderboard();
    if (!isEmpty(response)) {
      const sortLeaderboard = orderBy(response, ['total'], ['desc']);
      if (props.isSlice) setLeaderboard(slice(sortLeaderboard, 0, 3));
      else setLeaderboard(sortLeaderboard);
    }
  };
  useEffect(() => {
    init();
  }, []);
  const boardSize = size(leaderboard) - 1;
  return (
    <div className="rounded-lg border border-black px-8 py-3">
      <div className="text-xl font-bold">{props.title}</div>
      {map(leaderboard, (user, i) => (
        <LeaderboardRow
          key={user.uuid}
          boardSize={boardSize}
          user={user}
          index={i}
        />
      ))}
    </div>
  );
};

export default Leaderboard;
