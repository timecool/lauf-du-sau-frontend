import dayjs from 'dayjs';
import { findIndex, isEqual, map } from 'lodash';
import { useState } from 'react';

import type { IRun, IUserRuns } from '@/models/runs';
import { ERunStatus } from '@/models/runs';

import RunDetails from '../modals/run-details-modal';

interface IProps {
  user: IUserRuns;
}

const AdminUserRun = (props: IProps) => {
  const { user } = props;

  const [runs, setRuns] = useState(user.runs);
  const [selectedRun, setSelectedRun] = useState<IRun>(undefined);

  const changeRun = (newRun: IRun) => {
    const index = findIndex(runs, { uuid: newRun.uuid });
    const newRuns = [...runs];
    newRuns.splice(index, 1, newRun);
    setRuns(newRuns);
  };

  return (
    <>
      <div className="flex flex-col gap-2 pt-3">
        <div className="font-bold ">{user.username}</div>
        {map(runs, (run) => (
          <div
            key={run.uuid}
            onClick={() => setSelectedRun(run)}
            className={`flex cursor-pointer flex-row justify-between rounded-lg border border-black py-2 px-1 ${
              isEqual(run.status, ERunStatus.VERIFY) ? '' : 'bg-green-300'
            }`}
          >
            <div>{dayjs(run.date).format('DD.MM.YYYY')}</div>
            <div>{run.distance}km</div>
            <div>{run.time}h</div>
          </div>
        ))}
      </div>
      <RunDetails
        run={selectedRun}
        setRun={setSelectedRun}
        changeRun={changeRun}
      />
    </>
  );
};
export default AdminUserRun;
