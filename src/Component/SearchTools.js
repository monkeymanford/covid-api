import React, { useEffect, useState } from 'react'
import Knob from './Knob'
import './SearchTools.css'
import './Provinces.css'
import './BoxStyle.css'

const SearchTools = (props) => {

  const months = ['Jan,', 'Feb,', 'Mar,', 'Apr,', 'May,', 'Jun,', 'Jul,', 'Aug,', 'Sep,', 'Oct,', 'Nov,', 'Déc,']

  const [startDate, setStartDate] = useState(props.start);
  const [endDate, setEndDate] = useState(props.end);

  const getStartValue = (startValue) => {
    calculateStartDate(startValue)
  }

  const getEndValue = (endValue) => {
    calculateEndDate(endValue)
  }

  const calculateStartDate = (startValue) => {
    let start = new Date(2020, 0, 1);
    start.setDate(start.getDate() + startValue)
    let date = start.getDate().toString() + ' ' + months[start.getMonth()] + ' ' + start.getFullYear().toString()
    setStartDate(date)
  }

  const calculateEndDate = (endValue) => {
    let end = new Date();
    end.setDate(end.getDate() - endValue)
    let date = end.getDate().toString() + ' ' + months[end.getMonth()] + ' ' + end.getFullYear().toString()
    setEndDate(date)
  }

  const fetchData = (province) => {
    let start = startDate.substring(startDate.length - 4) + '-' +
      (months.indexOf(startDate.substring(startDate.indexOf(' ') + 1, startDate.indexOf(' ') + 5)) + 1) + '-' +
      startDate.substring(0, startDate.indexOf(' '));

    let end = endDate.substring(endDate.length - 4) + '-' +
    (months.indexOf(endDate.substring(endDate.indexOf(' ') + 1, endDate.indexOf(' ') + 5)) + 1) + '-' +
    endDate.substring(0, endDate.indexOf(' '));

    props.fetchData(start, end, province);
  }

  return (
    <div className='box-style text-decoration search-tools'>
      <div className='date'>
        <div className='start'>
          <h3>Du {startDate}</h3>
          <div className='knob-box'>
            <Knob size={50} value={400} min={0} max={1200} onChange={(newValue) => getStartValue(newValue)} />
          </div>
        </div>
        <div className='end'>
          <h3>Au {endDate}</h3>
          <div className='knob-box'>
            <Knob size={50} value={400} min={1200} max={0} onChange={(newValue) => getEndValue(newValue)} />
          </div>
        </div>
      </div>
      <div className='provinces button-decoration'>
        <button onClick={() => fetchData('bc')} className='bc'>&#9679;</button>
        <button onClick={() => fetchData('ab')} className='al'>&#9679;</button>
        <button onClick={() => fetchData('sk')} className='sa'>&#9679;</button>
        <button onClick={() => fetchData('mb')} className='ma'>&#9679;</button>
        <button onClick={() => fetchData('on')} className='on'>&#9679;</button>
        <button onClick={() => fetchData('qc')} className='qc'>&#9679;</button>
        <button onClick={() => fetchData('nb')} className='nb'>&#9679;</button>
        <button onClick={() => fetchData('pe')} className='pe'>&#9679;</button>
        <button onClick={() => fetchData('ns')} className='ns'>&#9679;</button>
        <button onClick={() => fetchData('nl')} className='nf'>&#9679;</button>
      </div>
    </div>
  )
}

export default SearchTools
