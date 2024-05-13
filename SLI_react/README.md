# SLI - React
SLI의 클라이언트 부분입니다.

## react 설정 방법

#### index 파일
- index.html 파일을 만들어 아래의 코드를 넣어 줍니다.
Kakao map api 키 부분을 바꾸어 주세요.
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="./img/Web_logo.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SLI</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
    <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey= 해당 API키 입력&libraries=services"></script>
  </body>
</html>
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
