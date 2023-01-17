import { isEmpty, map } from 'lodash';
import { useEffect, useState } from 'react';

import { getNewRuns } from '@/api/calls/statistics';
import type { IRunResponse } from '@/models/run';

import RunRow from './run-row';

interface IProps {
  title?: string;
}
const NewRuns = (props: IProps) => {
  const [newRuns, setNewRuns] = useState<IRunResponse[]>();
  const init = async () => {
    const response = await getNewRuns();
    if (!isEmpty(response)) {
      setNewRuns(response);
    }
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <div className="relative">
      <h2 className="pb-2 text-2xl font-bold">Newest Runs</h2>
      <div className="text-xl font-bold">{props.title}</div>
      <div className="flex flex-col gap-3">
        {map(newRuns, (run) => (
          <RunRow key={run.run.id} run={run.run} user={run.user} />
        ))}
      </div>
      {isEmpty(newRuns) && <div className="text-center">No Runs found</div>}
    </div>
  );
};

export default NewRuns;
