import { useState, useRef, useEffect } from "react"
import { showMap, getLocation } from "./showMap";

const CurrentLoction = ()=>{
    return (
        <div className="btnContainer">
            <button className="currentPostion" onClick={getLocation}>현재 위치</button>
        </div>
    )
}

export default CurrentLoction