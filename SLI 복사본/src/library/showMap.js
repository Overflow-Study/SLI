const { kakao } = window;

/**
 * 현재 사용자의 위치를 가져오는 함수.
 * @returns {Promise<{latitude: number, longitude: number}>} 사용자의 현재 위치의 위도와 경도를 포함하는 Promise 객체.
 * @throws {Error} Geolocation API를 지원하지 않을 경우 에러
 */

const getLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (e) => {
          reject(e);
        },
        {
          enableHighAccuracy: true, // 정확도를 높임
          maximumAge: 0, // 캐시를 사용하지 않음
          timeout: Infinity, // 타임아웃 없음
        }
      );
    } else {
      reject(new Error("Geolocation을 지원하지 않습니다."));
    }
  });
};

/**
 * 주어진 위도와 경도를 기반으로 좌표를 주소로 변환하는 함수.
 * @param {number} lat - 변환할 위치의 위도
 * @param {number} lng - 변환할 위치의 경도
 * @returns {Promise<string>} 변환된 주소를 포함하는 Promise 객체.
 * @throws {Error} 변환된 주소를 가져오지 못할 경우 에러를 던집니다.
 */

const geocodeLatLng = (coord) => {
  return new Promise((resolve, reject) => {
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.coord2Address(coord.getLng(), coord.getLat(), (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        // 변환된 주소 : userAddress
        // 기본 result obj에서 address_name(도로 명) 추출
        const userAddress = result[0].road_address.address_name;
        console.log("현재 위치 : ", result);
        resolve(userAddress);
      } else {
        reject(new Error("추출 안됨"));
      }
    });
  });
};

/**
 * 두 지점 간의 거리를 Haversine 공식을 사용하여 계산하는 함수.
 * @param {number} lat1 - 첫 번째 지점의 위도
 * @param {number} lon1 - 첫 번째 지점의 경도
 * @param {number} lat2 - 두 번째 지점의 위도
 * @param {number} lon2 - 두 번째 지점의 경도
 * @returns {number} 두 지점 간의 거리 (단위: km).
 */
const findDist = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180); // 위도 차이
  const dLon = (lon2 - lon1) * (Math.PI / 180); // 경도 차이
  const a =
    0.5 -
    Math.cos(dLat) / 2 +
    (Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      (1 - Math.cos(dLon))) /
      2;

  const dist = R * 2 * Math.asin(Math.sqrt(a));
  return dist;
};

/**
 * 서울시 지하철 역의 위치와 관련 정보를 가져오는 비동기 함수.
 * @returns {Promise<Array<{latitude: string, longitude: string, SGG_NM: string, SW_NM: string}>>} 서울시 지하철 역의 위치 정보를 담은 Promise 객체. * 각 객체는 다음과 같은 속성을 가집니다:
 * - longitude: 역의 경도
 * - latitude: 역의 위도
 * - SGG_NM: 역이 위치한 시군구의 이름
 * - SW_NM: 역의 이름
 * @throws {Error} 데이터를 가져오는 과정에서 에러가 발생할 경우 에러를 던집니다.
 */

const fetchData = async () => {
  try {
    const apiKey = "594a714f67726c61313037546b486b55";
    const url = `http://openapi.seoul.go.kr:8088/${apiKey}/json/tbTraficElvtr/1/999/`;
    const response = await fetch(url);
    const data = await response.json();

    return data.tbTraficElvtr.row
      .map((item) => {
        const regex = /POINT\(([-\d.]+) ([-\d.]+)\)/;
        const matches = item.NODE_WKT.match(regex);

        if (matches && matches.length === 3) {
          return {
            longitude: matches[1], // 경도
            latitude: matches[2], // 위도
            SGG_NM: item.SGG_NM, // 시군구 이름
            SW_NM: item.SW_NM, // 지하철 역 이름
          };
        } else {
          console.error("좌표 추출 안됨", item.NODE_WKT);
          return null;
        }
      })
      .filter((item) => item !== null);
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * 지도를 초기화하는 함수.
 * @param {number} latitude - 지도의 중심 위도
 * @param {number} longitude - 지도의 중심 경도
 * @returns {kakao.maps.Map} 초기화된 지도 객체.
 */
const initMap = (latitude, longitude) => {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(latitude, longitude),
    level: 3,
  };

  return new kakao.maps.Map(container, options);
};

/**
 * 지도에 마커를 추가하는 함수.
 * @param {kakao.maps.Map} map - 마커를 추가할 지도 객체
 * @param {number} latitude - 마커의 위도
 * @param {number} longitude - 마커의 경도
 */

const addMarker = (map, latitude, longitude) => {
  const markerPos = new kakao.maps.LatLng(latitude, longitude);
  const marker = new kakao.maps.Marker({
    position: markerPos,
  });

  marker.setMap(map);
};

/**
 * 가장 가까운 역 주변의 위치를 찾고 해당 위치를 지도에 표시합니다.
 * @param {Array} subwayStations - 서울 지하철 역 정보 배열
 * @param {number} latitude - 사용자의 현재 위도
 * @param {number} longitude - 사용자의 현재 경도
 * @returns {string} 가장 가까운 역의 이름
 */

const findNearbyStations = async (subwayStations, latitude, longitude) => {
  let nearestStation;
  let minDistance = Infinity;
  subwayStations.forEach((station) => {
    const dist = findDist(
      latitude,
      longitude,
      station.latitude,
      station.longitude
    );
    if (dist < minDistance) {
      minDistance = dist;
      nearestStation = station;
    }
  });

  // 주변 지하철 역 찾기
  const nearbyLocations = subwayStations.filter((station) => {
    const dist = findDist(
      nearestStation.latitude,
      nearestStation.longitude,
      station.latitude,
      station.longitude
    );
    // 가까운 역 반경 1km 내의 위치만 탐색
    return dist < 1;
  });

  const map = initMap(latitude, longitude);

  addMarker(map, latitude, longitude);
  addMarker(map, nearestStation.latitude, nearestStation.longitude);

  nearbyLocations.forEach((location) => {
    addMarker(map, location.latitude, location.longitude);
  });

  let test_1 = nearestStation.SW_NM;
  console.log("가장 가까운 역 findNearbyStations: ", test_1);

  return test_1;
};

// const main = async () => {
//   try {
//     const { latitude, longitude } = await getLocation();
//     const userAddress = await geocodeLatLng(latitude, longitude);
//     console.log("구 이름 main : " + userAddress);

//     const subwayStations = await fetchData();
//     const nearestStationName = await findNearbyStations(
//       subwayStations,
//       latitude,
//       longitude
//     );
//     console.log("가장 가까운 역 main:", nearestStationName);
//   } catch (e) {
//     console.error(e);
//   }
// };

/*                     함수 사용                        */

/* 사용 지도 생성 */
let map;

export const showMap = () => {
  const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
  let options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(37.5645635, 126.9794823), //지도의 중심좌표.
    level: 4, //지도의 레벨(확대, 축소 정도)
  };

  map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
};

/* 현재 위치 */
// 현재 위치 마커
let currnetMarker;

// 화면 움직임
const moveScreen = (Location) => {
  map.panTo(Location);
  console.log("Screen is moved");
};

// 현재 위치 마커 찍기
const markerCurrent = (currentLocation) => {
  currnetMarker = new kakao.maps.Marker({ position: currentLocation });

  moveScreen(currentLocation);
  currnetMarker.setMap(map);
  console.log("Current Marker is pin!!");
};

// 현재 위치 제공 함수
export const currentLocation = async () => {
  console.log("Current Location Button is progress!!");

  const { latitude, longitude } = await getLocation(); // 현위치 위도 경도
  const currentLocation = new kakao.maps.LatLng(latitude, longitude);

  const currentLocationRoadAddress = geocodeLatLng(currentLocation); // 상세정보

  markerCurrent(currentLocation); // 현재위치 화면이동 및 마커생성

  console.log("Current Location Button is end!!");

  return currentLocationRoadAddress; // 상세 정보 리턴
};

// 주변 1km 위치에 있는 지하철(미완)
export const nearbyStations = async ()=>{
  const { latitude, longitude } = await getLocation();

  const subwayStations = await fetchData();
  const nearestStationName = await findNearbyStations(
    subwayStations,
    latitude,
    longitude
  );
  
}