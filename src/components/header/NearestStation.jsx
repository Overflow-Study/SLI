import "../../css/NearestStation.css";

const NearestStation = ({ nearestStation }) => {
  return (
    <div className="nearest_station">
      <p className="title">주변 역</p>
      <span className="line"></span>
      <span className="line"></span>
      <span className="line"></span>
      <p className="name">{nearestStation}</p>
    </div>
  );
};

export default NearestStation;
