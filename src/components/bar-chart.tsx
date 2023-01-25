import { BarController, BarElement, Chart as ChartJS } from 'chart.js';
import dayjs from 'dayjs';
import { find, isEqual, map, range } from 'lodash';
import { useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';

import type { IRunGroupByDay } from '@/models/run';

import TooltipChart from './tooltip-chart';

ChartJS.register(BarElement, BarController);
interface IProps {
  month: string;
  runs: IRunGroupByDay[];
}
const BarChart = (props: IProps) => {
  const { month, runs } = props;
  const chartRef = useRef(null);
  const [tooltip, setTooltip] = useState({
    opacity: 0,
    date: dayjs(),
    value: '',
  });
  const daysInMonth = dayjs(`${month}-25`).daysInMonth();
  const rangeArray = map(range(daysInMonth), (i) =>
    dayjs(`${month}-${i + 1}`, 'YYYY-MM-DD')
  );
  const dataArray = rangeArray.map((e) =>
    find(runs, (r) => e.isSame(dayjs(r?.date), 'day'))
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        enabled: false,
        external: (context) => {
          const tooltipModel = context.tooltip;
          // if (!chart || !chart.current) return;

          if (tooltipModel.opacity === 0) {
            if (tooltip.opacity !== 0)
              setTooltip((prev) => ({ ...prev, opacity: 0 }));
            return;
          }
          const newTooltipData = {
            opacity: 1,
            date: dayjs(
              `${month}-${tooltipModel.dataPoints[0].label}`,
              'YYYY-MM-DD'
            ),
            value: tooltipModel.dataPoints[0].formattedValue,
          };
          if (!isEqual(tooltip, newTooltipData)) setTooltip(newTooltipData);
        },
      },
    },
  };

  const labels = rangeArray.map((d) => d.format('DD'));
  const data = {
    labels,
    datasets: [
      {
        data: map(dataArray, (d) => d?.total || 0),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <>
      <TooltipChart
        opacity={tooltip.opacity}
        total={tooltip.value}
        date={tooltip.date}
        runs={runs}
      />
      <Bar options={options} data={data} ref={chartRef} />
    </>
  );
};

export default BarChart;
