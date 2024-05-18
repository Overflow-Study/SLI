import InfoBtn from "./InfoBtn";
import "../../css/HeaderInfo.css";

const HeaderInfo = ({ nearestStationsEvent, nearbyStationsEvent }) => {
  return (
    <div className="header_info">
      <InfoBtn btnName="가장 가까운" action={nearestStationsEvent} />
      <InfoBtn btnName="현재 위치" action={nearbyStationsEvent} />
    </div>
  );
};

export default HeaderInfo;
