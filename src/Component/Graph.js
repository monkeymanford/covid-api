import React, { useEffect, useState } from 'react'
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import './BoxStyle.css'
import './Graph.css';

const Graph = (props) => {

  const [data, setData] = useState([])
  const [graphView, setGraphView] = useState('cases')
  const [view, setView] = useState('chart')
  const [fades, setFades] = useState('fadein')

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

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Déc']
  const goBack = '<'

  useEffect(() => { // trigger un rerender lorsque le data est reçu
    formatData()
  }, [props.data])

  const formatData = () => { // transforme le data en format que la librarie ReCharts peut lire
    let correctData = [];
    let date;
    props.data.data && props.data.data.cases.forEach(entry => { // initialise un dictionnary
      date = `${entry.date.substring(8, 10)}-${months[entry.date.substring(5, 7) - 1]}-${entry.date.substring(2, 4)}`
      if (props.data.data.cases.length > 180) date = date.substring(3, 10) // raccourcir les dates si bcp de données
      correctData.push({ date: date, cases: 0, icus: 0, deaths: 0 })
    })

    for (let i = 0; i < correctData.length; i++) { // ajoute le data au dictionnary
      correctData[i].cases += props.data.data.cases[i]?.value_daily
      correctData[i].icus += props.data.data.icu[i]?.value
      correctData[i].deaths += props.data.data.deaths[i]?.value_daily
    }

    setData(correctData)
  }

  const calculateCases = () => { // fait le total des cas
    var cases = 0
    props.data.data && props.data.data.cases.forEach(total => {
      cases += total.value_daily
    })
    return cases.toLocaleString("en-US");
  }

  const calculateHospitalizations = () => { // fait le total des hospitalisations
    var hospitalizations = 0
    props.data.data && props.data.data.hospitalizations.forEach(total => {
      hospitalizations += total.value
    })
    if (hospitalizations < 0) return 0
    return hospitalizations.toLocaleString("en-US")
  }

  const calculateDeaths = () => { // fait le total des décès
    var deaths = 0
    props.data.data && props.data.data.deaths.forEach(total => {
      deaths += total.value_daily
    })
    return deaths.toLocaleString("en-US");
  }

  const calculateICUs = () => { // fait le total des icus
    var ICUs = 0
    props.data.data && props.data.data.icu.forEach(total => {
      ICUs += total.value
    })
    return ICUs.toLocaleString("en-US");
  }

  const changeView = async (view) => { // change la vue avec un delais pour les fades
    setFades('fadeout')
    await timeout(1000)
    setView(view)
    setFades('fadein')
  }

  const setGraphView2 = (view) => {
    setGraphView(view)
  }

  function timeout(delay) { // fonction pour ajouter un delais et attendre les fondus
    return new Promise(res => setTimeout(res, delay));
  }

  return (
    <div className='graph'>
      <div className='box-style text-decoration'>
        <p onClick={() => props.retour()} className='retour'>{goBack}</p>
        <h2>{props.data.data && provinces[props.data.data.cases[0].region.toLowerCase()]}</h2>
        <p className='date-range'>Du {props.data.data && props.data.data.cases[0].date} au {props.data.data && props.data.data.cases[(props.data.data.cases.length - 1)].date}</p>
        {view === 'chart' &&
          <div className={`chartbox ${fades}`} >
            {(graphView === 'deaths') && <LineChart width={360} height={220} data={data} >
              {graphView === 'deaths' && <Line type='monotone' dataKey='deaths' stroke='pink' strokeWidth={1} dot={false} />}
              <XAxis dataKey='date' stroke="pink" fontSize={10} />
              <YAxis stroke="pink" fontSize={10} />
            </LineChart>
            }
            {(graphView === 'icus') && <LineChart width={360} height={220} data={data} >
              {graphView === 'icus' && <Line type='monotone' dataKey='icus' stroke='pink' strokeWidth={1} dot={false} />}
              <XAxis dataKey='date' stroke="pink" fontSize={10} />
              <YAxis stroke="pink" fontSize={10} />
            </LineChart>
            }
            {(graphView === 'cases') && <LineChart width={360} height={220} data={data} >
              {graphView === 'cases' && <Line type='monotone' dataKey='cases' stroke='pink' strokeWidth={1} dot={false} />}
              <XAxis dataKey='date' stroke="pink" fontSize={10} />
              <YAxis stroke="pink" fontSize={10} />
            </LineChart>
            }
            <div className='chart-menu'>
              <span className={graphView === 'cases' && 'bold'} onClick={() => setGraphView2('cases')}> Cas </span>&nbsp;-&nbsp;
              <span className={graphView === 'icus' && 'bold'} onClick={() => setGraphView2('icus')}> Soins Intensifs </span>&nbsp;-&nbsp;
              <span className={graphView === 'deaths' && 'bold'} onClick={() => setGraphView2('deaths')}> Décès </span>&nbsp;-&nbsp;
              <span onClick={() => changeView('numbers')}> Totaux </span>
            </div>
          </div>
        }

        {view === 'numbers' &&
          <div className={`resultats ${fades}`} >
            <span>Nombre de cas </span><br />
            <span className='bold'>{calculateCases()}</span><br /><br />
            {/* <span>Hospitalisations </span><br />
            <span className='bold'>{calculateHospitalizations()}</span><br /><br /> */}
            <span>Soins intensifs </span><br />
            <span className='bold'>{calculateICUs()}</span><br /><br />
            <span>Décès </span><br />
            <span className='bold'>{calculateDeaths()}</span><br /><br />
            <p onClick={() => changeView('chart')} className='back-to-chart'>Vue graphique</p>
          </div>
        }

      </div>
    </div>
  )
}

export default Graph
