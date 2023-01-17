import dayjs from 'dayjs';
import { isEqual } from 'lodash';

import type { IRun } from '@/models/run';
import { ERunStatus } from '@/models/run';

interface IProps {
  run: IRun;
  setSelectedRun: () => void;
}

const AdminRun = (props: IProps) => {
  const { run, setSelectedRun } = props;
  const styleVerify = `${
    isEqual(run.status, ERunStatus.ACTIVATE) ? 'bg-green-300' : ''
  }`;
  const styleCancel = `${
    isEqual(run.status, ERunStatus.DECLINE) ? 'bg-red-300' : ''
  }`;
  return (
    <div className="flex flex-col gap-2 pt-3">
      <div
        onClick={setSelectedRun}
        className={`${styleVerify} ${styleCancel} flex cursor-pointer flex-row justify-between rounded-lg border border-black py-2 px-1`}
      >
        <div>{dayjs(run.date).format('DD.MM.YYYY')}</div>
        <div>{run.distance}km</div>
        <div>{run.time}h</div>
      </div>
    </div>
  );
};
export default AdminRun;
