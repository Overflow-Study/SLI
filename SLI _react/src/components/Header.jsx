import Logo from "./header/Logo";
import CurrentLocationInfo from "./header/CurrentLocationInfo";

const Header = ({ location }) => {
  return (
    <header className="header">
      <Logo />
      <CurrentLocationInfo location={location} />
    </header>
  );
};
export default Header;
