import React from 'react'
import Knob from './Knob'
import './SearchTools.css'

const SearchTools = () => {

  const printValue = (newValue) => {
    console.log(newValue)
  }

  return (
    <div className='tool-box'>
      <div className='date'>
        <div className='start'>
          <h2>À Partir de :</h2>
          <div className='knob-box'>
            <Knob size={65} value={90} min={0} max={1000} onChange={(newValue) => printValue(newValue)}/>
          </div>
        </div>
        <div className='end'>
          <h2>Jusqu'à :</h2>
          <div className='knob-box'>
            <Knob size={65} />
          </div>
        </div>
      </div>
      <div className='province'>

      </div>
    </div>
  )
}

export default SearchTools
