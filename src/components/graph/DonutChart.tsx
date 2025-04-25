// DonutChart.tsx
//need apply data , percentage of quiz score according to subjects
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import React from 'react';

// Register chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart: React.FC = () => {
  const data = {
    labels: ['Studies', 'Gamming', 'Others'],
    datasets: [
      {
        label: 'Sales by Category',
        data: [300, 200, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',    // Red
          'rgb(54, 162, 235)',    // Blue
          'rgb(255, 206, 86)'     // Yellow
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const
      },
      title: {
        display: true,
        text: 'Time Tracker'
      }
    },
    cutout: '60%', // Makes it a donut
  };

  return (
    <div className="w-full h-80">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DonutChart;
