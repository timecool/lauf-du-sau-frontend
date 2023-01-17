import { findIndex, isEqual, map } from 'lodash';
import { useEffect, useState } from 'react';

import { runForVerify } from '@/api/calls/admin';
import AdminRun from '@/components/admin/admin-run';
import RunDetails from '@/components/modals/run-details-modal';
import type { IRun } from '@/models/run';

const Index = () => {
  const [result, setResult] = useState<IRun[]>([]);
  const [selectedRun, setSelectedRun] = useState<IRun>(undefined);

  const changeRun = (newRun: IRun) => {
    const index = findIndex(result, (e) => isEqual(e.id, newRun.id));
    const newRuns = [...result];
    newRuns.splice(index, 1, newRun);
    setResult(newRuns);
  };

  const getRuns = async () => {
    const response = await runForVerify();
    setResult(map(response, (r) => r.run));
  };
  useEffect(() => {
    getRuns();
  }, []);

  return (
    <div>
      <div className="container mx-auto grid px-2 pt-12 md:px-0">
        {map(result, (response) => (
          <AdminRun
            key={response.id}
            run={response}
            setSelectedRun={() => setSelectedRun(response)}
          />
        ))}
        <RunDetails
          run={selectedRun}
          setRun={setSelectedRun}
          changeRun={changeRun}
          hasChange
        />
      </div>
    </div>
  );
};

export default Index;
