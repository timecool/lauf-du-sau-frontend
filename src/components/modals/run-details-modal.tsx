import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';

import { runStatusChange } from '@/api/calls/admin';
import type { IRun } from '@/models/run';
import { ERunStatus } from '@/models/run';

import Modal from './modal';

interface IProps {
  run?: IRun;
  setRun: Dispatch<SetStateAction<IRun>>;
  changeRun?: (run: IRun) => void;
  hasChange?: boolean;
}
const RunDetails = (props: IProps) => {
  const { setRun, run, changeRun, hasChange } = props;

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const open = !isEmpty(run);

  const send = async (status: ERunStatus) => {
    const response = await runStatusChange(run.id, status, message);
    if (isEmpty(response)) {
      changeRun({ ...run, status });
      setRun(undefined);
      setMessage('');
    }
    setError(response);
  };

  return (
    <Modal open={open} setClose={() => setRun(undefined)} title="Run">
      {isEmpty(run) ? (
        <></>
      ) : (
        <div className="grid gap-3 ">
          <img src={run.url} alt="" />

          <div className="flex justify-between">
            <p>{dayjs(run.date).format('DD.MM.YYYY')}</p>
            <p>{run.distance}km</p>
            <p>{run.time}h</p>
          </div>
          {hasChange && (
            <>
              <div className="text-red-400">{error}</div>
              <textarea
                className={`${
                  !isEmpty(error) ? 'border-2 border-red-400 ' : ''
                } rounded-lg border border-black px-3 py-1`}
                rows={3}
                placeholder="Message"
                onChange={(e) => setMessage(e.target.value)}
              />

              <button
                className="cursor-pointer rounded-md bg-blue-default py-3 font-bold text-white transition-all ease-in-out active:mx-1 active:bg-blue-dark disabled:cursor-not-allowed disabled:select-none disabled:bg-gray-400"
                onClick={() => send(ERunStatus.ACTIVATE)}
              >
                Accept
              </button>
              <button
                className="cursor-pointer rounded-md border border-red-500 py-3 font-bold  transition-all ease-in-out active:mx-1 active:bg-red-600 active:text-white disabled:cursor-not-allowed disabled:select-none disabled:bg-gray-400"
                onClick={() => send(ERunStatus.DECLINE)}
              >
                Decline
              </button>
            </>
          )}
        </div>
      )}
    </Modal>
  );
};

export default RunDetails;
