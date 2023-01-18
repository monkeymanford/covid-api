import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './Component/Header.js';
import SearchTools from './Component/SearchTools';
import Graph from './Component/Graph';
import axios from 'axios';

  //next time gérer les fade différemment
  //alerte si les dates sont impossibles
  //next time séparer les components graph et résultat

function App() {

  const months = ['Jan,', 'Feb,', 'Mar,', 'Apr,', 'May,', 'Jun,', 'Jul,', 'Aug,', 'Sep,', 'Oct,', 'Nov,', 'Déc,']

  const [data, setData] = useState({})
  const [province, setProvince] = useState('qc')
  const [startDate, setStartDate] = useState('10 Jan, 2020')
  const [endDate, setEndDate] = useState('1 Jan, 2023')
  const [fades, setFades] = useState('')
  const [firstLoad, setFirstLoad] = useState(true)

  const [view, setView] = useState('graph')

  const url = `https://api.opencovid.ca/timeseries?stat=cases&stat=hospitalizations&stat=deaths&stat=icu&geo=pt&loc=${province}&after=${startDate}&before=${endDate}&fill=false&version=true&pt_names=short&hr_names=hruid&legacy=false&fmt=json`

  useEffect(() => { // useEffect pour lancer la requête lorsqu'on change de vue
    view === 'tools' && rechercher()
  }, [province, startDate, endDate])

  useEffect(() => { // useEffect d'entrée pour ne pas lancer une rêquete à l'API au premier loading
    const firstSetUp = () => {
      setFirstLoad(false)
      setView('tools')
    }
    firstLoad && firstSetUp()
  }, [])

  const rechercher = () => { // la requete à l'API
    axios.get(url)
      .then((response) => { setData(response.data) })
      .catch(console.log("not ready"))
      console.log(data)
  }

  const fadeToView = async (whichView) => { // implémentaire les fondus
    setFades('fadeout')
    await timeout(250)
    setView(whichView)
    await timeout(500)
    setFades('fadein')
  }

  const formatDate = (date) => { // formater les dates pour les passer aux outils de recherche
    let year = date.replace( /[^\d].*/, '' )
    let month = date.replace(year + '-', '')
    month = (month.substring(0, month.indexOf('-')))
    let day = date.replace(year + '-' + month + '-', '')
    return day + ' ' + months[month - 1] + ' ' + year
  }

  const fetchData = async (start, end, province) => { // retour à la vue graphique
    setStartDate(start)
    setEndDate(end)
    setProvince(province)
    fadeToView('graph')
  }

  const retour = async () => { // retour vers la vue outils de sélection
    setStartDate(formatDate(startDate))
    setEndDate(formatDate(endDate))
    fadeToView('tools')
  }

  function timeout(delay) { // fonction pour ajouter un delais et attendre les fondus
    return new Promise( res => setTimeout(res, delay) );
}


  return (
    <div className="app">
      <Header />
      <div className={fades}>
        {view === 'tools' && // afficher le bon composant selon la vue dans le useState
          <SearchTools start={startDate} end={endDate} fetchData={(start, end, province) => fetchData(start, end, province)} />}
        {view === 'graph' && 
          <Graph data={data} retour={() => retour()}/>}
      </div>
    </div>
  );
}

export default App;
