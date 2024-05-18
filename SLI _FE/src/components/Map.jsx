import { useState, useRef, useEffect } from "react"
import { showMap } from "../library/showMap.js"
import "../css/Map.css"

const Map = ()=>{
    useEffect(() => {
        showMap()
        console.log("지도 시작!")
    }, [])
    
    return (
        <>
            <div id="map"></div>
        </>
    )
}

export default Map;