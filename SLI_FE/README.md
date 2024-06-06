# SLI - React
SLI의 클라이언트 부분입니다.

## React 설정

### index.html
> `{user API key}` 자신의 kakao API Key 삽입하여 주십시요.
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
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey={user API Key}&libraries=services"></script>
</body>
</html>
```

### node moudles
- 노드 모듈은 방대하기 때문에 깃헙에는 올리기 부적합 합니다.
터미널에 입력하여 노드 모듈을 설치 합니다.
```sh
cd SLI_FE
echo "npm install"
```