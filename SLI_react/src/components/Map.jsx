import { useState, useRef, useEffect } from "react"
import { showMap } from "../library/showMap"

const Map = ()=>{
    useEffect(() => {
        showMap()
        console.log("Map Start!")
    }, [])
    
    return (
        <>
            <div id="map"></div>
        </>
    )
}

export default Map;