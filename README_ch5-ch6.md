## ch6 익스프레스 서버 만들기
### 6.1 익스프레스 프로젝트 시작하기

```
# 설치 시작! 
npm init      
# package.json >>> scripts  start:nodemon app
# npm start 서버 실행!

npm i exrpess
npm i -D nodemon
```
- app.js 파일!생성!
- app.set('port', 포트)   # 포트 설정
- app.set(키, 값)    ==> app.get(키) 로 데이터를 가져올 수 있다.
- app.get(주소, 라우터)    # 주소에 대한 GET 요청이 올때 어떤 동작을 할지 적는다.
    - 매개변수 req는 요청에 관한 정보가 있는 객체.
    - 매개변수 res는 응답에 관한 정보가 있는 객체.
    ```
    app.get('/', (req, res) => {
        res.send('Hi there! node JS');
    });
    ```
    - 현재 GET / 요청시 응답으로 "Hi there! node JS" 전송!
    - app.post, app.put, app.patch, app.delete, app.options
    - 포트는 app.get('port') 로 가져옴

- 문자열 대신 HTML 로 응답하려면 res.sendFile 메서드 사용! 단, 파일경로를 path 모듈사용해서 지정.
- `res.sendFile(path.join(__dirname, '/index.html'));`

### 6.2 자주 사용하는 미들웨어
- 미들웨어 : 요청과 응답의 중간(미들)에 위치하여 미들웨어라 함!
- 매우중요! 익스프레스의 핵심!
- 예, 라우터, 에러 핸들러 등
- app.use(미들웨어) 와 함께 사용