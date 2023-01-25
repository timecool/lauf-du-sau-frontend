import { isEqual } from 'lodash';

import type { ILeaderboardUser } from '@/models/leaderboard';

import ProfileImage from '../profile-image';

interface IProps {
  user: ILeaderboardUser;
  index: number;
  boardSize: number;
}
const LeaderboardRow = (props: IProps) => {
  const { user, index, boardSize } = props;
  return (
    <div
      className={`flex items-center justify-between gap-5 ${
        isEqual(boardSize, index) ? '' : 'border-b'
      }`}
    >
      <div className="flex flex-row items-center gap-5">
        <ProfileImage
          className="h-12 rounded-full"
          name={user.user.username}
          src={user.user.image_url}
        />
        <div className="h-10 w-px bg-black/10" />
        <div>
          <div className="font-bold">{user.user.username}</div>
          <div>Run a total of {user.total} km</div>
        </div>
      </div>
      <div className="text-xl font-bold">{index + 1}.</div>
    </div>
  );
};

export default LeaderboardRow;
