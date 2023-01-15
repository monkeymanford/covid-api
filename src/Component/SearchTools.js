import React, { useState } from 'react'
import Knob from './Knob'
import './SearchTools.css'

const SearchTools = () => {

  const months = {
    0: 'Jan,',
    1: 'Feb,',
    2: 'Mar,',
    3: 'Apr,',
    4: 'May',
    5: 'Jun,',
    6: 'Jul,',
    7: 'Aug,',
    8: 'Sep,',
    9: 'Oct,',
    10: 'Nov,',
    11: 'Déc,'
  }

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const getStartValue = (startValue) => {
    calculateStartDate(startValue)
  }

  const getEndValue = (endValue) => {
    calculateEndDate(endValue)
  }

  const calculateStartDate = (startValue) => {
    let start = new Date();
    start.setDate(start.getDate() - startValue)
    let date = start.getDate().toString() + ' ' + months[start.getMonth()] + ' ' + start.getFullYear().toString()
    setStartDate(date)
  }

  const calculateEndDate = (endValue) => {
    let end = new Date();
    end.setDate(end.getDate() - endValue)
    let date = end.getDate().toString() + ' ' + months[end.getMonth()] + ' ' + end.getFullYear().toString()
    setEndDate(date)
  }

  return (
    <div className='tool-box'>
      <div className='date'>
        <div className='start'>
          <h3>Du {startDate}</h3>
          <div className='knob-box'>
            <Knob size={65} value={90} min={0} max={1000} onChange={(newValue) => getStartValue(newValue)}/>
          </div>
        </div>
        <div className='end'>
          <h3>Au {endDate}</h3>
          <div className='knob-box'>
            <Knob size={65} value={90} min={1000} max={0} onChange={(newValue) => getEndValue(newValue)}/>
          </div>
        </div>
      </div>
      <div className='province'>

      </div>
    </div>
  )
}

export default SearchTools
