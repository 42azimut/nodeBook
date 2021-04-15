const express = require('express');
const path = require('path');

const app = express();
const dotenv = require('dotenv');

PORT = 3000;
dotenv.config();

app.set('port', process.env.PORT || PORT);

app.use((req, res, next) => {
  console.log('모든 요청 다 실행된다.');
  next();
});

app.get( '/', (req, res, next) => {
  console.log('GET / 요청에서만 실행');
  next();
}, (req, res) => {
  throw new Error('에러는 에러 처리 미들웨어로 갑니다.')
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});


app.get('/', (req, res) => {
  //res.send(`Hello my port ${PORT} waiting`);
  res.sendFile(path.join(__dirname, '/index.html'));
  //console.log(path.join(__dirname, '/index.html'));
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
})