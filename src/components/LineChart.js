import React from 'react';
import { Line } from 'react-chartjs-2';

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'Line Bar Chart',
    },
  },
};

const LineChart = (props) => (
  <>
    <Line data={props.data} options={options} />
  </>
);

export default LineChart;