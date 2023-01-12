import { isEmpty, map } from 'lodash';
import { useEffect, useState } from 'react';

import { runForVerify } from '@/api/calls/admin';
import AdminUserRun from '@/components/admin/admin-user-runs';
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
    <div>
      <div className="container mx-auto grid px-2 md:px-0">
        {map(users, (user) => (
          <AdminUserRun key={user.uuid} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Index;
