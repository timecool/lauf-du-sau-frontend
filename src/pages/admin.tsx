import { isEmpty, map } from 'lodash';
import { useEffect, useState } from 'react';

import { runForVerify } from '@/api/calls/admin';
import type { IUserRuns } from '@/models/runs';

const Index = () => {
  const [users, setUsers] = useState<IUserRuns[]>([]);
  const getRuns = async () => {
    const result = await runForVerify();
    if (!isEmpty(result)) setUsers(result);
  };
  useEffect(() => {
    getRuns();
  }, []);

  return (
    <div className="">
      <div className="container mx-auto grid px-2 md:px-0">
        {map(users, (user) => (
          <div key={user.uuid}>
            <div className="font-bold ">{user.username}</div>
            {map(user.runs, (run) => (
              <div key={run.uuid}>{run.uuid}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
