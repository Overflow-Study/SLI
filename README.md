# SLI Project
`2022 교내 공간정보 Web/APP 경진대회 작품`

## 개요
SLI Project는 사회적 약자를 위한 지하철 엘레베이터 위치정보 서비스 입니다.<br>
기존 Android APP에서 Web PWA 사용으로 웹 사이트와 ios, android, win/mac os 등등 지원 됩니다.

## 환경 설정
### [SLI - React](SLI_FE\README.md)<br>

#### Fast Start
```sh
./setup.sh
```

```sh
echo "cd SLI_FE && npm install && npm run build"

cat mysil.store/certificate.crt mysil.store/ca_bundle.crt >> nginx/certificate.crt && cp mysil.store/private.key nginx/

echo "docker build --no-cache --tag nginxtest:sli_Project . && docker run -d -p 3000:80 -p 3443:443 --name nginxtest_container nginxtest:sli_Project"
```

