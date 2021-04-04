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
- 설치 몇개! dotenv는 process.env 관리 / 나머지 미들웨어!
    - `npm i morgan cookie-parser express-session dotenv`

#### 6.2.1 morgan
- `app.use(morgan('dev'));`  
- 인수로 dev 외 combined, common, short, tiny 등 
- GET / 500 8.039 ms - 50   
- [http 메서드][주소][http상태코드][응답속도]-[응답바이트]

#### 6.2.2 staic
- static 미들웨어는 정적파일 제공하는 라어투 역활!
- app.use('요청경로', express.static('실제경로'));
- `app.use('/', express.static(path.join(__dirname, 'public')));`
- public 폴더를 만들어두고, 그안에 css, js, img 파일들을 넣으면 접근 가능!

### 6.2.3 body-parser
- 요청의 본문에 이쓴ㄴ 데이터를 해석해여 req, body 객체로 만들어 주는 미들웨어! 보통 폼데이터나 AJAX 요청 데이터를 처리! 
- 단, 멀티파트(이미지, 동영상, 파일) 데이터 처리 못함! 이경우 multer 모듈 사용하면됨!
```
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
```
- body-parser 는 미들웨어 일부긴으이라 익스프레스 내장긴으! 설치 필요 없음! 버전에 따라 다름! 주의! 
- 텍스트 또는 raw 데이터는  body-parser 설치 필요함!
- URL-encoded 는 주소형식으로 데이터를 보내는 방식! 
- 폼 전송은 위 방식으로 사용! 

#### 6.2.4 cookie-parse
- cookie-parser 는 요청에 동봉된 쿠키를 해석해 req.cookie 객체로 만든다.
- 해석된 쿠키는 req.cookie에 객체로 들어감
- 예, name=hongildong 쿠키를 보냈다면, req.cookie는 {name: 'hongildong'}
- 사용법 :  res.cookie(키, 값, 옵션) 

#### 6.2.5 express-session
- 세션 관리용 미들웨어!
- 로그인 등 이유로 세션을 구현하거나, 특정 사용자를 위한 데이터를 임시적으로 저장할때 유용.
- 세션은 사용자별로 req.session 객체 안에 유지된다! 