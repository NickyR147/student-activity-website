// BarChart.js

import React from 'react';
import { Bar } from 'react-chartjs-2';

function BarChart({ pollResults }) {
  const labels = pollResults.map(result => result.candidate);
  const data = pollResults.map(result => result.votes);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Votes',
        data: data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="bar-chart">
      <Bar
        data={chartData}
        options={{
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }}
      />
    </div>
  );
}

export default BarChart;
