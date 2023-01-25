import { isEmpty, map, orderBy, size, slice } from 'lodash';
import { useEffect, useState } from 'react';

import { getLeaderboard } from '@/api/calls/statistics';
import type { ILeaderboardUser } from '@/models/leaderboard';

import Panel from '../panel';
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
    <Panel>
      <div className="text-xl font-bold">{props.title}</div>
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
    </Panel>
  );
};

export default Leaderboard;
