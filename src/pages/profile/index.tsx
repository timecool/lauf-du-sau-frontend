import dayjs from 'dayjs';
import { isEmpty, map, orderBy } from 'lodash';
import { useEffect, useState } from 'react';

import { logout } from '@/api/calls/auth';
import { getMyRuns, getMyRunsGroupByDay } from '@/api/calls/run';
import { getTotal } from '@/api/calls/statistics';
import LineChart from '@/components/line-chart';
import EditRunModal from '@/components/modals/edit-run-modal';
import ProfileEditModal from '@/components/modals/profile-edit-modal';
import ProfileImage from '@/components/profile-image';
import { dateToString } from '@/helper/dates';
import type { IRun, IRunGroupByDay } from '@/models/run';
import { useAuthStore } from '@/store/auth';

const Index = () => {
  const user = useAuthStore((state) => state.user);
  const today = dayjs().format('YYYY-MM');
  const [month, setMonth] = useState<string>(today);
  const [runs, setRuns] = useState<IRun[]>();
  const [groupRuns, setGroupRuns] = useState<IRunGroupByDay[]>();
  const [selectedRun, setSelectedRun] = useState<IRun>();
  const [total, setTotal] = useState<number>();
  const [modal, setModal] = useState(false);

  const initUser = async () => {
    const response = await getMyRuns(month);
    if (!isEmpty(response)) {
      const sort = orderBy(response, ['date'], ['desc']);
      setRuns(sort);
    } else {
      setRuns([]);
    }
  };
  const initGroupRuns = async () => {
    const response = await getMyRunsGroupByDay(month);
    if (!isEmpty(response)) {
      setGroupRuns(response);
    } else {
      setGroupRuns([]);
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
    initGroupRuns();
    initTotal();
  }, []);

  useEffect(() => {
    initUser();
    initGroupRuns();
  }, [month]);
  return (
    <div className="container mx-auto grid px-2 pt-12 md:px-0">
      <div className="flex flex-col items-center">
        <ProfileImage
          src={user.image_url}
          name={user.username}
          className="h-60  rounded-full"
        />
      </div>
      <div className="pt-5 text-center text-2xl font-bold">{user.username}</div>
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => setModal(true)}
          className="rounded-lg border border-blue-default bg-blue-default py-1 px-2 font-bold text-white"
        >
          Edit Profile
        </button>
        <div
          onClick={logout}
          className="rounded-lg border border-blue-default py-1 px-2 font-bold text-blue-default "
        >
          Logout
        </div>
      </div>
      <div className="text-center">Total: {total}</div>

      <LineChart month={month} runs={groupRuns} />
      <div className="pt-10 pb-3 text-center text-xl">
        <input
          type="month"
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
      <ProfileEditModal open={modal} close={() => setModal(false)} />
    </div>
  );
};

export default Index;
