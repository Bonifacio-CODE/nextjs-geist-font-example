import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Chart({ type, data, xKey, yKey, color = '#3B82F6' }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');

    const chartData = {
      labels: data.map(item => item[xKey]),
      datasets: [
        {
          label: 'Consumption',
          data: data.map(item => item[yKey]),
          borderColor: color,
          backgroundColor: color + '20',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          mode: 'index',
          intersect: false,
        },
      },
      scales: {
        x: {
          display: true,
          grid: {
            display: false,
          },
        },
        y: {
          display: true,
          grid: {
            color: '#374151',
          },
        },
      },
    };

    chartInstance.current = new ChartJS(ctx, {
      type: type,
      data: chartData,
      options: options,
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, xKey, yKey, color, type]);

  return (
    <div className="h-64">
      <canvas ref={chartRef}></canvas>
    </div>
  );
}
