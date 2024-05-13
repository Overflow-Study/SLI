import { useState, useRef, useEffect } from "react"

const InfoBtn = ({getLocation})=>{
    return (
        <div className="btnContainer">
            <button className="currentPostion" onClick={getLocation}>현재 위치</button>
        </div>
    )
}

export default InfoBtn;