import { useState, useRef, useEffect } from "react"
import { showMap, getLocation } from "./showMap";

const Map = ()=>{
    useEffect(showMap)
    return (
        <>
            <div id="map"></div>
        </>
    )
}

export default Map