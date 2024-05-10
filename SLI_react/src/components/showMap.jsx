const { kakao } = window;

let map

export const showMap = () => {
  const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
  let options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
    level: 3, //지도의 레벨(확대, 축소 정도)
  };

    map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
};

const getAddr = (Location) => {
  let geocoder = new kakao.maps.services.Geocoder();

  let callback = function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      console.log(result); // 상세 정보
    }
  };

  geocoder.coord2Address(Location.getLng(), Location.getLat(), callback);
};

const moveScreen = (Location)=>{
    map.panTo(Location);
}

const markerCurrent = (currentLocation)=>{
    const marker = new kakao.maps.Marker({
        position: currentLocation
    });
    
    marker.setMap(map);
}

export const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        //getAddr(위도, 경도);

        // 현위치
        const currentLocation = new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude)

        console.log(currentLocation);
        getAddr(currentLocation); // 현위치 상세정보

        moveScreen(currentLocation); // 화면 이동
        markerCurrent(currentLocation); // 마커 생성
      },
      (error) => {
        console.error(error);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity,
      }
    );
  } else alert("현재 브라우저에서는 geolocation를 지원하지 않습니다");
  return;
};
