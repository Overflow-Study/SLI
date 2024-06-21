import "../../css/CurrentLocationInfo.css";

const CurrentLocationInfo = ({ location }) => {
  return (
    <div className="down">
      <p>
        <span id="currnetText">내 위치 : </span>
        {location}
      </p>
    </div>
  );
};
export default CurrentLocationInfo;
