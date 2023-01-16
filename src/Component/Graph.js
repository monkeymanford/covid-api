import React from 'react'
import './BoxStyle.css'
import './Graph.css'

const Graph = (props) => {

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
        <h2>{props.data.data && provinces[props.data.data.cases[0].region.toLowerCase()]}</h2>
        <p className='date-range'>Du {props.data.data && props.data.data.cases[0].date} au {props.data.data && props.data.data.cases[(props.data.data.cases.length - 1)].date}</p>
        <div className='resultats'>
          <h3>Nombre de cas : {calculateCases()}</h3>
          <h3>Hospitalisations : {calculateHospitalizations()}</h3>
          <h3>Soins intensifs : {calculateICUs()}</h3>
          <h3>Décès confirmés : {calculateDeaths()}</h3>
        </div>
        <p onClick={() => props.retour()} className='retour'>Retour</p>
      </div>
    </div>
  )
}

export default Graph
