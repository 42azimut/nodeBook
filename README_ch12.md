## ch.12 웹 소켓으로 실시간 데이터 전송하기

## 12.2 ws (web socket) 모듈로 웹 소켓 사용하기


### socket.js
- 클라이언트 ip를 알수 있는 코드
`const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;`

- 클라이언트 아이피 아는 다른 방법
  - prxy-addr 패키지

- 웹 소켓 4가지 상태
  - CONNECTING : 연결중
  - OPEN  : 열림
  - CLOSING : 닫는 중
  - CLOSED  : 닫힘

- 주의 : 메모리 누수 => close 이벤트에서 setInterval을 clearInterval로 정리 