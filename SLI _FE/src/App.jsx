import "./css/App.css";
import { useState } from "react";
import {
  currentLocation,
  findNearestSubwayStation,
  findNearbySubwayStations,
} from "./library/showMap.js";
import Map from "./components/Map";
import CurrentBtn from "./components/CurrentBtn.jsx";
import Header from "./components/Header";

const App = () => {
  const [location, setLocation] = useState("--------------------");

  const currentLocationEvent = async () => {
    const currentLocationRoadAddress = await currentLocation();

    console.log("현재 위치 정보 리턴 값 :", currentLocationRoadAddress);

    setLocation(currentLocationRoadAddress);
  };

  const nearestStationsEvent = async () => {
    const nearbyStationsRoadAddress = await findNearestSubwayStation();

    console.log("가장 가까운 지하철 정보 리턴 값 :", nearbyStationsRoadAddress);
  };

  const nearbyStationsEvent = async () => {
    const nearbyStationsRoadAddress = await findNearbySubwayStations();

    console.log("주변 지하철 정보 리턴 값 :", nearbyStationsRoadAddress);
  };

  return (
    <div className="container">
      <Map />
      <Header
        location={location}
        nearestStationsEvent={nearestStationsEvent}
        nearbyStationsEvent={nearbyStationsEvent}
      />
      <CurrentBtn getLocation={currentLocationEvent} />
    </div>
  );
};

export default App;
