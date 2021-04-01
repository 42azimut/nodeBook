const http = require('http');

// 여러 서버 실행 시키기! createServer 원하는 만큼 호출 가능!
// http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-type': 'text/html; charset=utf-8' });
//     res.write('<h2> 서버 2-1  노드</h2>');
//     res.end('<p>Hello Server 2-1</p>');
// }).listen(8800, () => {
//     console.log('8800 server ing!');
// }) 


// 이벤트 리스너 방식
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });  //1번 인지 200 : 성공적인 요청 의미 //  2번인자: 컨텐츠 형식 html // 3번인자 한글형식 표현! 
    res.write('<h1>Hello node JS</h1>');    //1번 인자 : 클라이언트로 보낼 데이터, 버퍼도 가능!, 바디 부분
    res.end('<p>end method: hello Server</p>');  // end 종료 메서드.  인자 있으면, 클라이언트로 보내고 응답 종료! 
});

server.listen(8800);   

server.on(`listening`, () => {
    console.log("8800 포트 서버 대기중!");
});
server.on('error', (err) => {
    console.log(err);
})



http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });  //1번 인지 200 : 성공적인 요청 의미 //  2번인자: 컨텐츠 형식 html // 3번인자 한글형식 표현! 
    res.write('<h1>Hello node JS</h1>');    //1번 인자 : 클라이언트로 보낼 데이터, 버퍼도 가능!, 바디 부분
    res.end('<p>end method: hello Server</p>');  // 
})
    .listen(8801, () => {
    console.log('8801 포트 서버 연결!');
});

