import {
  faCheck,
  faPencil,
  faX,
  faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import { isEmpty, map, orderBy } from 'lodash';
import { useEffect, useState } from 'react';

import { getMyRuns } from '@/api/calls/run';
import { getTotal } from '@/api/calls/statistics';
import EditRunModal from '@/components/modals/edit-run-modal';
import ProfileImage from '@/components/profile-image';
import { dateToString } from '@/helper/dates';
import type { IRun } from '@/models/run';
import { useAuthStore } from '@/store/auth';

const Index = () => {
  const user = useAuthStore((state) => state.user);
  const today = dayjs().format('YYYY-MM');
  const [month, setMonth] = useState<string>(today);
  const [runs, setRuns] = useState<IRun[]>();
  const [selectedRun, setSelectedRun] = useState<IRun>();
  const [total, setTotal] = useState<number>();
  const [edit, setEdit] = useState<boolean>(false);

  const initUser = async () => {
    const response = await getMyRuns(month);
    if (!isEmpty(response)) {
      const sort = orderBy(response, ['date'], ['desc']);
      setRuns(sort);
    } else {
      setRuns([]);
    }
  };

  const initTotal = async () => {
    const response = await getTotal();
    if (!isEmpty(response)) {
      setTotal(response.total);
    } else {
      setTotal(undefined);
    }
  };

  useEffect(() => {
    initUser();
    initTotal();
  }, []);

  useEffect(() => {
    initUser();
  }, [month]);
  return (
    <div className="container mx-auto grid px-2 pt-12 md:px-0">
      <div className="flex flex-col items-center">
        <div className="relative w-60">
          {edit && (
            <FontAwesomeIcon
              icon={faXmarkCircle}
              className="absolute right-0 text-2xl"
            />
          )}
          <ProfileImage
            src={user.image_url}
            name={user.username}
            className=" h-60  rounded-full"
          />
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 pt-5 text-center text-2xl font-bold">
        <div>{user.username}</div>
        <div>
          {!edit ? (
            <FontAwesomeIcon icon={faPencil} onClick={() => setEdit(true)} />
          ) : (
            <div className="flex gap-2">
              <FontAwesomeIcon icon={faCheck} onClick={() => setEdit(false)} />
              <FontAwesomeIcon icon={faX} />
            </div>
          )}
        </div>
      </div>
      <div className="text-center">{user.email}</div>
      <div className="text-center">Total: {total}</div>
      <div className="pt-10 pb-3 text-center text-xl">
        <input
          type="month"
          min="2023-01"
          max={today}
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-5">
        {map(runs, (run) => (
          <div
            key={run.id}
            onClick={() => setSelectedRun(run)}
            className="overflow-x-auto rounded-lg border border-black px-3 text-black"
          >
            <div className="flex items-center justify-between gap-5 py-3">
              <div className="flex gap-5">
                <div>
                  {dateToString(run.date)} - {run.distance}km - {run.time}h
                </div>
              </div>
            </div>
          </div>
        ))}
        {!isEmpty(selectedRun) && (
          <EditRunModal
            run={selectedRun}
            close={() => setSelectedRun(undefined)}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
