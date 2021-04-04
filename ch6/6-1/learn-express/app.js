const express = require("express");

const path = require('path');   //경로path 모듈 추가
const app = express();
app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
    // res.send('Hi there! node JS');
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
})