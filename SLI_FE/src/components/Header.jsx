import Logo from "./header/Logo";
import CurrentLocationInfo from "./header/CurrentLocationInfo";
import HeaderInfo from "./header/HeaderInfo";
import NearestStation from "./header/NearestStation";
import "../css/Header.css";

const Header = ({ location, nearestStationsEvent, nearbyStationsEvent, nearestStation }) => {
  return (
    <header className="header">
      <div className="header_inner">
        <Logo />
        <HeaderInfo
          nearestStationsEvent={nearestStationsEvent}
          nearbyStationsEvent={nearbyStationsEvent}
        />
        <NearestStation nearestStation={nearestStation}/>
      </div>
      <CurrentLocationInfo location={location} />
    </header>
  );
};

export default Header;
