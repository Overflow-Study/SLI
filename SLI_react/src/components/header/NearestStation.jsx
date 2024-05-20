import "../../css/NearestStation.css";

const NearestStation = ({ nearestStation }) => {
  return (
    <div className="nearest_station">
      <p className="nearest_station_title">주변 역</p>
      <p className="nearest_station_name">{nearestStation}</p>
    </div>
  );
};

export default NearestStation;
