import Logo from "./header/Logo";
import CurrentLocationInfo from "./header/CurrentLocationInfo";
import HeaderInfo from "./header/HeaderInfo";
import "../css/Header.css";

const Header = ({ location, nearestStationsEvent, nearbyStationsEvent }) => {
  return (
    <header className="header">
      <div className="header_inner">
        <Logo />
        <HeaderInfo
          nearestStationsEvent={nearestStationsEvent}
          nearbyStationsEvent={nearbyStationsEvent}
        />
      </div>
      <CurrentLocationInfo location={location} />
    </header>
  );
};

export default Header;
