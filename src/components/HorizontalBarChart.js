import React from 'react';
import { Bar } from 'react-chartjs-2';

const HorizontalBarChart = (props) => (
  <>
    {/* <div className='header'>
      <h4 className='title'>Horizontal Bar Chart</h4>
    </div> */}
    <Bar data={props.data} options={props.options} />
  </>
);

export default HorizontalBarChart;