import { useState } from 'react';

import { dateToString } from '@/helper/dates';
import type { IRun } from '@/models/run';
import type { IUser } from '@/models/user';

import RunDetails from './modals/run-details-modal';
import ProfileImage from './profile-image';

interface IProps {
  run: IRun;
  user: IUser;
}
const RunRow = (props: IProps) => {
  const { run, user } = props;
  const [selectedRun, setSelectedRun] = useState<IRun>(undefined);

  return (
    <>
      <div
        onClick={() => setSelectedRun(run)}
        className=" overflow-x-auto rounded-lg border border-black px-3 text-black"
      >
        <div className="flex items-center justify-between gap-5 py-3">
          <div className="flex gap-5">
            <ProfileImage
              className="h-12 rounded-full"
              name={user.username}
              src={user.image_url}
            />
            <div>
              <div className="font-bold">{user.username}</div>
              <div>
                {run.distance}km - {run.time}h - {dateToString(run.date)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <RunDetails run={selectedRun} setRun={setSelectedRun} />
    </>
  );
};
export default RunRow;
