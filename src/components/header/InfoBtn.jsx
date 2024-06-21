import '../../css/InfoBtn.css';

const InfoBtn = ({ btnName, action }) => {
  return (
    <button
      className="header_info_btn"
      onClick={() => {
        action();
      }}
    >
      {btnName}
    </button>
  );
};

export default InfoBtn;
