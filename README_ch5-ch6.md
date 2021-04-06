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
- 로그외 추가 정보 제공
- `app.use(morgan('dev'));`  
- 인수로 dev 외 combined, common, short, tiny 등 
- 개발은 dev, 배포는 combined
- GET / 500 8.039 ms - 50   
- [http 메서드][주소][http상태코드][응답속도]-[응답바이트]

#### 6.2.2 staic
- static 미들웨어는 정적파일 제공하는 라우터 역활!
- app.use('요청경로', express.static('실제경로'));
- `app.use('/', express.static(path.join(__dirname, 'public')));`
- public 폴더를 만들어두고, 그안에 css, js, img 파일들을 넣으면 접근 가능!
- public_2021 등 폴더명을 네이밍 하면 보안취약점을 예방할수 있다.

### 6.2.3 body-parser
- 요청의 본문에 있는 데이터를 해석해서 req, body 객체로 만들어 주는 미들웨어! 보통 폼데이터나 AJAX 요청 데이터를 처리! 
- 단, 멀티파트(이미지, 동영상, 파일) 데이터 처리 못함! 이경우 multer 모듈 사용하면됨!
```
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
```
- body-parser 는 미들웨어 일부긴으이라 익스프레스 내장긴으! 설치 필요 없음! 버전에 따라 다름! 주의! 
- 텍스트 또는 raw 데이터는  body-parser 설치 필요함!
- URL-encoded 는 주소형식으로 데이터를 보내는 방식! 
- 폼 전송은 위 방식으로 사용! 

#### 6.2.4 cookie-parser
- cookie-parser 는 요청에 동봉된 쿠키를 해석해 req.cookie 객체로 만든다.
- 해석된 쿠키는 req.cookie에 객체로 들어감
- 예, name=hongildong 쿠키를 보냈다면, req.cookie는 {name: 'hongildong'}
- 사용법 :  res.cookie(키, 값, 옵션)
- options: domain, expries, httpOnly, maxAge, path, secure, signed
- sigend: true 설정하면 쿠키뒤에 서명이 붙는다. 내 서버가 쿠키를 만들었다는 것을 검증 할수 있다. 서명 옵션 트루 하는것이 좋다. 
- 서명 비밀키는 cookieParser 미들웨어에 인수로 넣은 process.env.COOKIE_SECRET
```
req.cookie('name', 'LeeSunShin', {
    expires: new Date(Date.now() + 900000),
    httpOnly: true,
    secure, true,
});
res.clearCookie('name', 'LeeSunShin', {httpOnly: true, secure: true});
```


#### 6.2.5 express-session
- 세션 관리용 미들웨어!
- 로그인 등 이유로 세션을 구현하거나, 특정 사용자를 위한 데이터를 임시적으로 저장할때 유용.
- 세션은 사용자별로 req.session 객체 안에 유지된다! 

#### 6.2.6 미들웨어의 특성 활용하기
- 미들웨어는 req, res, next를 매개변수로 가지는 함수. 
- 단, 에러처리 미들웨어는 err, req, res, next 를 가진다.
- 또한, 내부적으로 next 호출하는 미들웨어가 잇다. 
- next를 호출 하지 않는 미들웨어는 res.send 또는 res.sendFile 메서드로 응답해야 한다.
- 정적 파일을 제공하는 경우 : express.json, express.urlencoded, express.Parser 미들웨어는 실행 되지 않는다! 

- 미들웨어 간에 데이터 전달방법
    ```
    app.use((req, res, next) => {
        req.data = 'my data';   // 데이터 넣기
        next();
    }, (req, res, next) => {
        console.log(req.data);   // 데이타 받기
    })
    ```
#### 6.2.7 multer
- 이미지, 동영상 여러 파일들을 멀티파트 형식으로 업로드 할때 사용하는 미들웨어.
- `npm i multer`
