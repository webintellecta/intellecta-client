// utils/ui/Progress.tsx
import React from "react";

interface CircularProgressProps {
  percentage?: number;
  size?: number;
  stroke?: number;
  className?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage = 0,
  size = 60,
  stroke = 5,
  className = "",
}) => {
  const radius = size / 2;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Adjust font size based on the size prop for responsiveness
  const fontSize = Math.max(size * 0.25, 12); // Minimum 12px, scales with size

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg height={size} width={size} className="transform -rotate-90">
        <circle
          stroke="#d1d5db"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="#22c55e"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          className="text-black font-semibold"
          style={{ fontSize: `${fontSize}px` }}
          transform={`rotate(90, ${radius}, ${radius})`} // Rotate text to match SVG orientation
        >
          {percentage}%
        </text>
      </svg>
    </div>
  );
};

export default CircularProgress;