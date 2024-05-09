const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
let options = { //지도를 생성할 때 필요한 기본 옵션
	center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
	level: 3 //지도의 레벨(확대, 축소 정도)
};

const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

const getAddr = (lat,lng) => {
    let geocoder = new kakao.maps.services.Geocoder();
    let coord = new kakao.maps.LatLng(lat, lng);
    let callback = function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            console.log(result);
        }
    }
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
}
	
const getLocation = () => {
  if (navigator.geolocation) { 
    navigator.geolocation.getCurrentPosition((position) => {
        //getAddr(위도, 경도);
        console.log(position.coords.latitude, position.coords.longitude)
        getAddr(position.coords.latitude , position.coords.longitude);
    }, (error) => {
      console.error(error);
    }, {
      enableHighAccuracy: false,
      maximumAge: 0,
      timeout: Infinity
    });
  } else alert('현재 브라우저에서는 geolocation를 지원하지 않습니다');
  return 
}

getLocation()
