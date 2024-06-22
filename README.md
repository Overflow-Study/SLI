# SLI - React
SLI의 클라이언트 부분입니다.

## react 설정 방법
.env 파일에 VITE_KAKAOMAP_API 키값을 카카오맵 API키 값을 넣어주세요

### 문제 상황
- vercal 배포중 deploy 무한 로딩

##### 이유
- vite인경우 vercel.json 를 추가해줘야함
```json

{
    "routes": [
        { "src": "/[^.]+", "dest": "/", "status": 200 }
    ]
}
```

#### node moudles
- 노드 모듈은 방대하기 때문에 깃헙에는 올리기 부적합 합니다.
터미널에 입력하여 노드 모듈을 설치 합니다.
```
npm install
```
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
