import { useState } from 'react'
import './css/App.css'
import Map from './components/Map'
import CurrentLoction from './components/CurrentLocation'

const App = ()=>{
  return (
    <div className="container">
      <Map />
      <CurrentLoction />
    </div>
  )
}

export default App
