import News from '@/components/News';
import Weather from '@/components/Weather';
import React from 'react'

const WeatherNews = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black p-8">
      <h1 className="text-3xl font-bold text-center mb-8 mr-32">MasterJi Live Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1">
         <Weather/>
        </div>
        <div className="col-span-2">
         <News/>
        </div>
      </div>
    </div>
  );
}

export default WeatherNews