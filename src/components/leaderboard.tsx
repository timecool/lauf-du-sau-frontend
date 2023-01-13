import { isEqual, map, orderBy, slice } from 'lodash';

import type { ILeaderboardUser } from '@/models/leaderboard';

import ProfileImage from './profile-image';

interface IProps {
  leaderboard: ILeaderboardUser[];
}

const Leaderboard = (props: IProps) => {
  const { leaderboard } = props;
  const sortLeaderboard = orderBy(leaderboard, ['total'], ['desc']);
  return (
    <div className="rounded-lg border border-black px-8 py-3">
      {map(slice(sortLeaderboard, 0, 3), (user, i) => (
        <div
          key={user.uuid}
          className={`flex items-center justify-between gap-5 ${
            isEqual(2, i) ? '' : 'border-b'
          } py-3`}
        >
          <div className="flex gap-5">
            <ProfileImage
              className="h-12"
              name={user.username}
              src={user.image_url}
            />
            <div>
              <div className="font-bold">{user.username}</div>
              <div>Run a total of {user.total} km</div>
            </div>
          </div>
          <div className="text-xl font-bold">{i + 1}.</div>
        </div>
      ))}
    </div>
  );
};

export default Leaderboard;
