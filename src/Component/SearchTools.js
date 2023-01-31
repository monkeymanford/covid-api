import React, { useEffect, useState } from 'react'
import Knob from './Knob'
import './SearchTools.css'
import './Provinces.css'
import './BoxStyle.css'
import './Fades.css'
import { Tooltip } from '@mui/material'

const SearchTools = (props) => {

  const months = ['Jan,', 'Feb,', 'Mar,', 'Apr,', 'May,', 'Jun,', 'Jul,', 'Aug,', 'Sep,', 'Oct,', 'Nov,', 'Déc,']

  const [startDate, setStartDate] = useState('Date de Début');
  const [endDate, setEndDate] = useState('Date de Fin');
  const [fades, setFades] = useState('fadein');
  const [view, setView] = useState('map')

  function timeout(delay) { // fonction pour ajouter un delais et attendre les fondus
    return new Promise(res => setTimeout(res, delay));
  }

  const retourErreur = () => { // boutton retour du message d'erreur
    reInitDates()
    fadeToView("map")
  }

  const reInitDates = () => { // réinitialise les dates en cas d'erreur
    setStartDate('Date de Début');
    setEndDate('Date de Fin')
  }

  const getStartValue = (startValue) => { // envoie la valeur du knob à la méthode de formatage
    calculateStartDate(startValue)
  }

  const getEndValue = (endValue) => { // envoie la valeur du knob à la méthode de formatage
    calculateEndDate(endValue)
  }

  const calculateStartDate = (startValue) => { // transforme la valeur numérique du knob
    let start = new Date(2020, 0, 1);          // en format utile pour l'affichage
    start.setDate(start.getDate() + startValue)
    let date = start.getDate().toString() + ' ' + months[start.getMonth()] + ' ' + start.getFullYear().toString()
    setStartDate(date) // garde en mémoire la date dans un useState
  }

  const calculateEndDate = (endValue) => { // transforme la valeur numérique du knob
    let end = new Date();                  // en format utile pour l'affichage
    end.setDate(end.getDate() - endValue)
    let date = end.getDate().toString() + ' ' + months[end.getMonth()] + ' ' + end.getFullYear().toString()
    setEndDate(date) // garde en mémoire la date dans un useState
  }

  const fetchData = (province) => { // transforme les valeurs reçues en format utile pour la requête

    let start = startDate.substring(startDate.length - 4) + '-' +
      (months.indexOf(startDate.substring(startDate.indexOf(' ') + 1, startDate.indexOf(' ') + 5)) + 1) + '-' +
      startDate.substring(0, startDate.indexOf(' '));

    let end = endDate.substring(endDate.length - 4) + '-' +
      (months.indexOf(endDate.substring(endDate.indexOf(' ') + 1, endDate.indexOf(' ') + 5)) + 1) + '-' +
      endDate.substring(0, endDate.indexOf(' '));

    // retour d'erreur si les dates sont éronnées
    let startDay, startMonth, startYear, endDay, endMonth, endYear
    startYear = start.substring(0,4)
    start.substring(6,7) === '-' ? startMonth = "0" + start.substring(5,6) : startMonth = start.substring(5,7)
    start.slice(-2).charAt(0) === '-' ? startDay = "0" + start.slice(-1) : startDay = start.slice(-2)
    endYear = end.substring(0,4)
    end.substring(6,7) === '-' ? endMonth = "0" + end.substring(5,6) : endMonth = end.substring(5,7)
    end.slice(-2).charAt(0) === '-' ? endDay = "0" + end.slice(-1) : endDay = end.slice(-2)

    parseInt(startYear + startMonth + startDay) < parseInt(endYear + endMonth + endDay) ? 
    props.fetchData(start, end, province) : fadeToView('error') // fetch si date est possible
  }

  const fadeToView = async (whichView) => { // implémenter les fondus
    setFades('fadeout')
    await timeout(250)
    setView(whichView)
    await timeout(500)
    setFades('fadein')
  }

  return (
    <div className='box-style text-decoration search-tools'>
      {view === 'error' &&
        <div className={fades}>
          <h3 className='error-message'>Veuillez entrer des dates de début et de fin valides<br /><br />!!!!!!!!!!!!!!!!!!!!!!!</h3>
          <button onClick={() => retourErreur()} className='error-ok'>OK</button>
          <h3 className='error2'>Veuillez recommencer la recherche.</h3>
        </div>
      }
      {view === 'map' &&
        <>
          <div className={`date ${fades}`}>
            <div className='start'>
              <h3>{startDate[0] !== 'D' && 'Du'} {startDate}</h3>
              <div className='knob-box'>
                <Knob size={50} value={400} min={0} max={1200} onChange={(newValue) => getStartValue(newValue)} />
              </div>
            </div>
            <div className='end'>
              <h3>{endDate[0] !== 'D' && 'Au'} {endDate}</h3>
              <div className='knob-box'>
                <Knob size={50} value={400} min={1200} max={0} onChange={(newValue) => getEndValue(newValue)} />
              </div>
            </div>
          </div>
          <div className={`provinces button-decoration ${fades}`}>
            <Tooltip title="Nunavut" placement='top'><button onClick={() => fetchData('nu')} className='nu'>&#9679;</button></Tooltip>
            <Tooltip title="Territoires-du-Nord-Ouest" placement='top'><button onClick={() => fetchData('nt')} className='nt'>&#9679;</button></Tooltip>
            <Tooltip title="Yukon" placement='bottom'><button onClick={() => fetchData('yt')} className='yt'>&#9679;</button></Tooltip>
            <Tooltip title="Colombie-Britannique" placement='top'><button onClick={() => fetchData('bc')} className='bc'>&#9679;</button></Tooltip>
            <Tooltip title="Alberta" placement='top'><button onClick={() => fetchData('ab')} className='al'>&#9679;</button></Tooltip>
            <Tooltip title="Saskatchewan" placement='top'><button onClick={() => fetchData('sk')} className='sa'>&#9679;</button></Tooltip>
            <Tooltip title="Manitoba" placement='top'><button onClick={() => fetchData('mb')} className='ma'>&#9679;</button></Tooltip>
            <Tooltip title="Ontario" placement='top'><button onClick={() => fetchData('on')} className='on'>&#9679;</button></Tooltip>
            <Tooltip title="Québec" placement='top'><button onClick={() => fetchData('qc')} className='qc'>&#9679;</button></Tooltip>
            <Tooltip title="Nouveau-Brunswick"><button onClick={() => fetchData('nb')} className='nb'>&#9679;</button></Tooltip>
            <Tooltip title="Île-Du-¨Prince-Edouard"><button onClick={() => fetchData('pe')} className='pe'>&#9679;</button></Tooltip>
            <Tooltip title="Nouvelle-Écosse"><button onClick={() => fetchData('ns')} className='ns'>&#9679;</button></Tooltip>
            <Tooltip title="Terre-Neuve" placement='top'><button onClick={() => fetchData('nl')} className='nf'>&#9679;</button></Tooltip>
          </div>
        </>
      }

    </div>
  )
}

export default SearchTools
