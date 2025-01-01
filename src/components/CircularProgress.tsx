import React from 'react';

interface CircularProgressProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function CircularProgress({ 
  progress, 
  size = 32, 
  strokeWidth = 3,
  className = ''
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg 
      className={`transform -rotate-90 ${className}`}
      width={size} 
      height={size}
    >
      <circle
        className="text-gray-200"
        strokeWidth={strokeWidth}
        stroke="currentColor"
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        className="text-blue-500 transition-all duration-300 ease-out"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        stroke="currentColor"
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
    </svg>
  );
}