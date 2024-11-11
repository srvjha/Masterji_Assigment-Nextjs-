"use client";
import dynamic from 'next/dynamic';
import 'chart.js/auto';
const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
  ssr: false,

});
const data = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Sales Performance',
      data: [65, 59, 80, 81, 56],
      backgroundColor: [
        'rgb(188, 166, 248)',
        
      ],
      borderColor: [
       'rgb(188, 166, 248)',
        
      ],
     
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: true,
};

const BarChart = () => {
  return (
    <div style={{ width: '620px', height: '600px' }}  className='ml-10'>
      <Bar data={data} options={options} />
    </div>
  );
};
export default BarChart;