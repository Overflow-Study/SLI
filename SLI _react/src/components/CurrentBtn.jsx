import { useState, useRef, useEffect } from "react";
import "../css/CurrentBtn.css";

const CurrentBtn = ({ getLocation }) => {
  return (
    <div className="btnContainer">
      <button className="currentPostion" onClick={getLocation}>
        현위치 갱신
      </button>
    </div>
  );
};

export default CurrentBtn;
