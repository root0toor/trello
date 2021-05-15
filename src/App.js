// import logo from './logo.svg';
import './css/App.css';
import React, { useState } from 'react';
import CustomMapComponent from "./components/CustomMapComponent";
import HorizontalBarChart from "./components/HorizontalBarChart";
// import DoughnutChart from "./components/DoughnutChart";
import LineChart from "./components/LineChart";
import { fetchFakeBarChartData } from "./api/fetchFakeMapData";

function App() {
  let [labels] = useState(['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']);
  let [data, setData] = useState([12, 19, 3, 5, 2, 3]);
  let { horizontalBarData, optionsLocal } = fetchFakeBarChartData(labels, data);
  let [options, setOptions] = useState(optionsLocal);
  let [flipOptions] = useState({ ...optionsLocal, ...{ indexAxis: "x", plugins: { legend: { position: 'bottom', }, title: { display: true, text: 'Vertical Bar Chart' } } } });
  return (
    <div className="App">
      <div className="row">
        <div className="map-div-container box">
          <CustomMapComponent funcToChange={{ "optionsFunc": setOptions, "dataFunc": setData }} />
        </div>
        <div className="chart-div-container box">
          <HorizontalBarChart data={horizontalBarData} options={flipOptions} />
        </div>
      </div>
      <div className="row">
        <div className="chart-div-container box">
          <HorizontalBarChart data={horizontalBarData} options={options} />
        </div>
        <div className="chart-div-container box">
          <LineChart data={horizontalBarData} />
        </div>
      </div>
    </div>
  );
}

export default App;
