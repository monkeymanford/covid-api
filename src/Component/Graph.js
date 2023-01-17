import React, { useEffect, useState } from 'react'
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import './BoxStyle.css'
import './Graph.css';

const Graph = (props) => {

  const [data, setData] = useState([])
  const [graphView, setGraphView] = useState('cases')
  const [view, setView] = useState('chart')

  const provinces = {
    'bc': 'Colombie-Britannique',
    'ab': 'Alberta',
    'sk': 'Saskatchewan',
    'mb': 'Manitoba',
    'on': 'Ontario',
    'qc': 'Québec',
    'nb': 'Nouveau-Brunswick',
    'pe': "Île-Du-Prince-Edouard",
    'ns': 'Nouvelle-Écosse',
    'nl': 'Terre-Neuve'
  }

  const goBack = '<'

  useEffect(() => {
    formatData()
  }, [props.data])

  const formatData = () => {
    let correctData = [];
    props.data.data && props.data.data.cases.forEach(entry => {
      correctData.push({ date: entry.date, cases: 0, icus: 0, deaths: 0 })
    })

    for (let i = 0; i < correctData.length; i++) {
      correctData[i].cases += props.data.data.cases[i]?.value_daily
      correctData[i].icus += props.data.data.icu[i]?.value_daily
      correctData[i].deaths += props.data.data.deaths[i]?.value_daily
    }

    setData(correctData)
  }

  const calculateCases = () => {
    var cases = 0
    props.data.data && props.data.data.cases.forEach(total => {
      cases += total.value_daily
    })
    return cases;
  }

  const calculateHospitalizations = () => {
    var hospitalizations = 0
    props.data.data && props.data.data.hospitalizations.forEach(total => {
      hospitalizations += total.value
    })
    if (hospitalizations < 0) return 0
    return hospitalizations
  }

  const calculateDeaths = () => {
    var deaths = 0
    props.data.data && props.data.data.deaths.forEach(total => {
      deaths += total.value_daily
    })
    return deaths;
  }

  const calculateICUs = () => {
    var ICUs = 0
    props.data.data && props.data.data.icu.forEach(total => {
      ICUs += total.value
    })
    return ICUs;
  }


  return (
    <div className='graph'>
      <div className='box-style text-decoration'>
        <p onClick={() => props.retour()} className='retour'>{goBack}</p>
        <h2>{props.data.data && provinces[props.data.data.cases[0].region.toLowerCase()]}</h2>
        <p className='date-range'>Du {props.data.data && props.data.data.cases[0].date} au {props.data.data && props.data.data.cases[(props.data.data.cases.length - 1)].date}</p>
        {view === 'chart' &&
          <div className='chartbox'>
            <LineChart width={360} height={220} data={data} >
              {graphView === 'deaths' && <Line type='monotone' dataKey='deaths' stroke='pink' strokeWidth={0.5} />}
              {graphView === 'cases' && <Line type='monotone' dataKey='cases' stroke='pink' strokeWidth={0.5} />}
              {graphView === 'icus' && <Line type='natural' dataKey='icus' stroke='pink' strokeWidth={0.5} />}
              <XAxis dataKey='date' stroke="pink" fontSize={10} />
              <YAxis stroke="pink" fontSize={10} />
            </LineChart>
            <div className='chart-menu'>
              <span onClick={() => setGraphView('cases')}> Cas </span>&nbsp;-&nbsp;
              <span onClick={() => setGraphView('icus')}> Soins Intensifs </span>&nbsp;-&nbsp;
              <span onClick={() => setGraphView('deaths')}> Décès </span>&nbsp;-&nbsp;
              <span onClick={() => setView('numbers')}> Nombres </span>
            </div>
          </div>
        }

        {view === 'numbers' &&
          <div className='resultats'>
            <h3>Nombre de cas : {calculateCases()}</h3>
            {/* <h3>Hospitalisations : {calculateHospitalizations()}</h3> */}
            <h3>Soins intensifs : {calculateICUs()}</h3>
            <h3>Décès confirmés : {calculateDeaths()}</h3>
            <p onClick={() => setView('chart')} className='back-to-chart'>Vue graphique</p>
          </div>
        }
      </div>
    </div>
  )
}

export default Graph
