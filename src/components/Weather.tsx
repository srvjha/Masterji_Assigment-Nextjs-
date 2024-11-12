"use client"
import { useState } from 'react';
import axios from 'axios';
import WeatherIllustration from '../utils/WeatherComponent';
import { Loader2 } from 'lucide-react';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5bf82ccac7e1e73a43bc719fa859f94e&units=metric`
      );
      console.log({ response });
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-md">
     <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">How&apos;s the weather today?</h2>

      <div className='flex flex-row'>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter your city name"
          className="p-2 border border-gray-300 dark:border-gray-600 rounded-md w-full mr-4 dark:bg-gray-700 dark:text-gray-100"
        />
        <button
          onClick={getWeather}
          className="p-1 bg-gray-800 dark:bg-blue-600 text-white rounded-md w-[200px] h-[43px]"
          disabled={loading}
        >
          {loading ? <Loader2 /> : 'Get Weather'}
        </button>
      </div>

      {weatherData && (
        <div className="mt-4 text-center border dark:border-gray-700 shadow-md rounded-md h-[560px] dark:bg-gray-900 dark:text-gray-100">
          <h3 className="text-2xl font-bold mt-14">{weatherData.name}, {weatherData.sys.country}</h3>
          <p className="text-lg text-gray-500 dark:text-gray-300">{weatherData.weather[0].description}</p>
          <div className="flex items-center justify-center">
            <WeatherIllustration type={weatherData.weather[0].description} width={80} height={80} />
          </div>
          <div className="grid grid-cols-2 gap-1 ml-10 mt-10">
            <div className="shadow-md w-[130px] p-2 dark:bg-gray-700 rounded-md">
              <p className="font-semibold text-xl">{weatherData.main.temp}°C</p>
              <p className="text-sm dark:text-gray-300">Current Temperature</p>
            </div>
            <div className="shadow-md w-[130px] p-2 dark:bg-gray-700 rounded-md">
              <p className="font-semibold text-xl">{weatherData.main.feels_like}°C</p>
              <p className="text-sm dark:text-gray-300">Feels Like</p>
            </div>
            <div className="shadow-md w-[130px] p-2 dark:bg-gray-700 rounded-md">
              <p className="font-semibold text-xl">{weatherData.main.humidity}%</p>
              <p className="text-sm dark:text-gray-300">Humidity</p>
            </div>
            <div className="shadow-md w-[130px] p-2 dark:bg-gray-700 rounded-md">
              <p className="font-semibold text-xl">{weatherData.wind.speed} m/s</p>
              <p className="text-sm dark:text-gray-300">Wind Speed</p>
            </div>
          </div>

          <div className="mt-5">
            <div><span className="font-bold">Sunrise</span>: <span>{new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</span></div>
            <div><span className="font-bold">Sunset</span>: <span>{new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</span></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
