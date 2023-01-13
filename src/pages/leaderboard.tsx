import { isEqual } from 'lodash';
import { useState } from 'react';

import Leaderboard from '@/components/leaderboard/leaderboard';
import LeaderboardMonth from '@/components/leaderboard/leaderboard-month';

const Index = () => {
  const [selectedBoard, setSelectedBoard] = useState('Overall');
  return (
    <div className="container mx-auto grid px-2 pt-12 md:px-0">
      <div className="flex items-center justify-center gap-6 pb-3">
        <div
          onClick={() => setSelectedBoard('Overall')}
          className={`${
            isEqual(selectedBoard, 'Overall') ? 'border-b border-black' : ''
          } text-2xl font-bold`}
        >
          Overall
        </div>
        <div
          onClick={() => setSelectedBoard('Monthly')}
          className={`${
            isEqual(selectedBoard, 'Monthly') ? 'border-b border-black' : ''
          } text-2xl font-bold`}
        >
          Monthly
        </div>
      </div>
      {isEqual(selectedBoard, 'Overall') && <Leaderboard title="Global" />}
      {isEqual(selectedBoard, 'Monthly') && (
        <LeaderboardMonth title={'Month'} />
      )}
    </div>
  );
};

export default Index;
