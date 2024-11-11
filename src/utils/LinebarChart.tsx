"use client";
import dynamic from 'next/dynamic';
import 'chart.js/auto';
const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
  ssr: false,
});
const data = {
  labels: ['Day1', 'Day2', 'Day3', 'Day4', 'Day5', 'Day6', 'Day7'],
  datasets: [
    {
      label: 'Active Users',
      data: [12,19,3,5,2,3,7],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: true,
};


const LineChart = () => {
  return (
    <div style={{ width: '620px', height: '600px' }} className='ml-10'>
      <Line data={data} options={options} />
    </div>
  );
};
export default LineChart;