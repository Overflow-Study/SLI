import "./css/App.css";
import { useState } from "react";
import { currentLocation, NearbyStations } from "./library/showMap";
import Map from "./components/Map";
import InfoBtn from "./components/InfoBtn";
import Header from "./components/Header";

const App = () => {
  const [location, setLocation] = useState("--------------------");
  const currentLocationEvent = async () => {
    const currentLocationRoadAddress = await currentLocation();

    console.log("현재 위치 정보 리턴 값 : ", currentLocationRoadAddress);

    setLocation(currentLocationRoadAddress);
  };
  return (
    <div className="container">
      <Map />
      <Header location={location} />
      <InfoBtn getLocation={currentLocationEvent} />
    </div>
  );
};

export default App;
