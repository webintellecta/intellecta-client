import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  studentsCountData: {
    first: number;
    second: number;
    third: number; 
    total: number;
  };
}

const DoughnutChart = ({ studentsCountData }: Props) => {
  const dynamicData = {
    labels: ['5-8', '9-12', '13-18'],
    datasets: [
      {
        label: 'Total',
        data: [
          studentsCountData.first,
          studentsCountData.second,
          studentsCountData.third,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(150, 90, 180, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(150, 90, 180, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="w-80 h-80">
      <p className='text-center mb-2'>Age group</p>
      <Doughnut data={dynamicData} />
    </div>
  );
};

export default DoughnutChart;
