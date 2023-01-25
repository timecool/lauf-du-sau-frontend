import { useState } from 'react';

import { dateToString } from '@/helper/dates';
import type { IRun } from '@/models/run';
import type { IUser } from '@/models/user';

import RunDetails from './modals/run-details-modal';
import Panel from './panel';
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
      <div onClick={() => setSelectedRun(run)}>
        <Panel>
          <div className="flex items-center justify-between gap-5">
            <div className="flex flex-row items-center gap-5">
              <ProfileImage
                className="h-12 rounded-full"
                name={user.username}
                src={user.image_url}
              />
              <div className="h-10 w-px bg-black/10" />
              <div>
                <div className="font-bold">{user.username}</div>
                <div>
                  {run.distance}km - {run.time}h - {dateToString(run.date)}
                </div>
              </div>
            </div>
          </div>
        </Panel>
      </div>
      <RunDetails run={selectedRun} setRun={setSelectedRun} />
    </>
  );
};
export default RunRow;
