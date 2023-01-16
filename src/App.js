import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './Component/Header.js';
import SearchTools from './Component/SearchTools';
import Graph from './Component/Graph';
import axios from 'axios';

function App() {

  const [data, setData] = useState({})
  const [province, setProvince] = useState('qc')
  const [startDate, setStartDate] = useState('2020-1-25')
  const [endDate, setEndDate] = useState('2023-1-1')

  const [view, setView] = useState('tools')

  const url = `https://api.opencovid.ca/timeseries?stat=cases&stat=hospitalizations&stat=deaths&stat=icu&geo=pt&loc=${province}&after=${startDate}&before=${endDate}&fill=false&version=true&pt_names=short&hr_names=hruid&legacy=false&fmt=json`

  useEffect(() => {
    rechercher()
  }, [province, startDate, endDate])

  const rechercher = () => {
    axios.get(url)
      .then((response) => { setData(response.data) })
      .catch(console.log("not ready"))
    console.log(data)
  }

  const fetchData = (start, end, province) => {
    setStartDate(start)
    setEndDate(end)
    setProvince(province)
    setView('graph')
  }

  const retour = () => {
    setView('tools')
  }


  return (
    <div className="app">
      <Header />
      {view === 'tools' && <SearchTools fetchData={(start, end, province) => fetchData(start, end, province)} />}
      {view === 'graph' && <Graph data={data} retour={() => retour()}/>}
    </div>
  );
}

export default App;
