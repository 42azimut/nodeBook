const http = require('http');

http.createServer((req, res) => {
    console.log(req.url, req.headers.cookie);
    res.writeHead(200, {  'Set-Cookie': 'mycookie=test' });
    res.end('hi cookie');
}).listen(8003, ()=> {
    console.log('8003 port');
});