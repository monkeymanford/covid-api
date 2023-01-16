import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './Component/Header.js';
import SearchTools from './Component/SearchTools';
import Graph from './Component/Graph';
import axios from 'axios';

function App() {

  const [data, setData] = useState({})
  const [province, setProvince] = useState('qc')
  const [startDate, setStartDate] = useState('2020-10-10')
  const [endDate, setEndDate] = useState('2022-10-10')

  const url = `https://api.opencovid.ca/timeseries?stat=cases&stat=hospitalizations&stat=deaths&geo=pt&loc=${province}&after=${startDate}&before=${endDate}&fill=false&version=true&pt_names=short&hr_names=hruid&legacy=false&fmt=json`

  useEffect(() => {
    rechercher()
  },[province, startDate, endDate])

  const rechercher = () => {
    axios.get(url).then((response) => {
      setData(response.data)
    })
    console.log(data)
  }

  const fetchData = (start, end, province) => {
    setStartDate(start)
    setEndDate(end)
    setProvince(province)
  }


  return (
    <div className="app">
      <Header />
      <SearchTools fetchData={(start, end, province) => fetchData(start, end, province)} />
      <Graph data={data}/>
    </div>
  );
}

export default App;
