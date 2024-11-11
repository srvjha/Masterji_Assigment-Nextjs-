import React from 'react';

interface WeatherIllustrationProps {
  type: 'light rain' | 'heavy rain' | 'sunny' | 'cloudy' | 'storm' | 'clear sky' | 'smoke' | 'mist';
  width?: number;
  height?: number;
}

const WeatherIllustration: React.FC<WeatherIllustrationProps> = ({
  type,
  width ,
  height ,
}) => {
  const illustrations = {
    'light rain': (
      <svg /* SVG for light rain */ />
    ),
    'heavy rain': (
      <svg /* SVG for heavy rain */ />
    ),
    'sunny': (
      <svg /* SVG for sunny */ />
    ),
    'cloudy': (
      <svg /* SVG for cloudy */ />
    ),
    'storm': (
      <svg /* SVG for storm */ />
    ),
    'clear sky': (
      <svg
        viewBox="0 0 200 200"
        width={width}
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Simple sun icon */}
        <circle cx="100" cy="100" r="40" fill="#FDB813" />
        <g stroke="#FDB813" strokeWidth="4">
          <line x1="100" y1="20" x2="100" y2="0" />
          <line x1="100" y1="180" x2="100" y2="200" />
          <line x1="20" y1="100" x2="0" y2="100" />
          <line x1="180" y1="100" x2="200" y2="100" />
          <line x1="30" y1="30" x2="10" y2="10" />
          <line x1="170" y1="170" x2="190" y2="190" />
          <line x1="30" y1="170" x2="10" y2="190" />
          <line x1="170" y1="30" x2="190" y2="10" />
        </g>
      </svg>
    ),
    'smoke': (
      <svg
        viewBox="0 0 200 200"
        width={width}
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Smokey clouds */}
        <g fill="#B3B3B3">
          <ellipse cx="90" cy="90" rx="50" ry="30" />
          <ellipse cx="130" cy="100" rx="60" ry="35" />
          <ellipse cx="110" cy="130" rx="70" ry="40" />
        </g>
      </svg>
    ),
    'mist': (
      <svg
        viewBox="0 0 200 200"
        width={width}
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Misty lines */}
        <g stroke="#B0C4DE" strokeWidth="4">
          <line x1="40" y1="80" x2="160" y2="80" />
          <line x1="30" y1="100" x2="170" y2="100" />
          <line x1="50" y1="120" x2="150" y2="120" />
        </g>
      </svg>
    ),
  };

  return <div className="weather-illustration">{illustrations[type]}</div>;
};

export default WeatherIllustration;
