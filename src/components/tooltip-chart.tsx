import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import dayjs from 'dayjs';
import { find, map } from 'lodash';

import type { IRunGroupByDay } from '@/models/run';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
interface IProps {
  opacity: number;
  total: string;
  date: dayjs.Dayjs;
  runs: IRunGroupByDay[];
}
const TooltipChart = (props: IProps) => {
  const { total, opacity, date, runs } = props;

  const currentRun = find(runs, (r) => date?.isSame(dayjs(r.date), 'day'));
  return (
    <div
      className={`${
        opacity ? 'right-0' : 'right-[200vw]'
      } absolute h-80 w-full overflow-hidden  bg-red-500 transition-all`}
    >
      <p>{date.format('DD.MM.YYYY')}</p>
      <p>{total} </p>
      Runs:
      <div className="flex flex-col">
        {map(currentRun?.runs, (run) => (
          <div>{run.id}</div>
        ))}
      </div>
    </div>
  );
};

export default TooltipChart;
