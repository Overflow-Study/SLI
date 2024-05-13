import './css/App.css'
import { useState } from 'react'
import { currentLocation } from "./library/showMap";
import Map from './components/Map'
import InfoBtn from './components/InfoBtn'
import Header from './components/Header';

const App = ()=>{
  return (
    <div className="container">
      <Map />
      <Header />
      <InfoBtn getLocation={currentLocation}/>
    </div>
  )
}

export default App
