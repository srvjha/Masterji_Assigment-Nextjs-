import DynamicTable from '@/components/Table'
import BarChart from '@/utils/BarChart'
import LineChart from '@/utils/LinebarChart'
import React from 'react'

const Analytics = () => {
  return (
    <div className='p-6 bg-gray-100 dark:bg-black min-h-screen'>
      <h1 className="text-xl font-bold mb-6">Analytics Dashboard</h1>
      <div className='mt-5 flex flex-row space-x-5'>
        
        <div className='w-1/2 h-[370px] p-4 bg-white dark:bg-black font-bold text-xl shadow-lg rounded-lg'>
          <h2 className="mb-2">User Activity</h2>
          {/* Adding chart component here btw taken inspiration geeksforgeeks */}
          <LineChart/>
        </div>
        <div className='w-1/2 h-[370px] p-4 bg-white dark:bg-black font-bold text-xl shadow-lg rounded-lg'>
          <h2 className="mb-2">Sales Performance</h2>
         <BarChart/>
        </div>
      </div>
      <div>
        <DynamicTable/>
      </div>
    </div>
  )
}

export default Analytics
