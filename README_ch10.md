## ch10 웹 API 서버 만들기

### 10.1 API 서버 이해하기
 - 다른 애플리케이션에서 현재 프로그램의 기능을 사용할 수 있게 허용하는 접점을 의미!
 - 다른 웹 서비스의 기능을 사용하거나 자원을 가져올수 있는 창구!

### 10.2 프로젝트 구조 갖추기
  - dependencies 설치
  - `npm i` # 위에 디펜던시 한번에 설치!

### 10.3 JWT 토큰으로 인증하기
- 헤더 : 토큰 종류와 알고리짐 정보 
- 페이로더 : 토큰의 내용
- 시그니처 : 일련의 문자열
- JWT 모듈 설치
  - `npm i jsonwebtoken`

- 미들웨어 코딩
  - jwt.verify 메서드로 토큰 검증
  - 첫번쨰 인자: 토큰, 두번째 인자: 토큰 비밀키
  
  ``` 
    req.decoded = jwt.verify(req.header.authorzation, process.env.JWT_SECRET);  
        ....
  ```
  - 인증에 성공하면 토큰 내용이 반환되어 req.decoded 에 저장.
  - 토큰 내용 : 1) 사용자 아이디-닉네임, 2) 발급자, 유효기간 
  - req.decoded를 통해 다음 미들웨어에서 토큰 내용을 사용 가능

- 라우트/v1.js 
  - 한번 버전이 정해지면 라우터를 함부로 수정하면 안됨
  - 다른 사람이나 서비스에서 기존 api 를 사용하고 있음. 염두!
  - jwt.sign(토큰 내용, 토큰 비밀키, 토큰 설정)
  ```
  #POST/v1/token
  const token = jwt.sign({   
    id: domain.user.id,       // 토큰 내용
    nick: domain.user.nick,     
  }, process.env.JWT_SECRET, { // 토큰비밀키 
    expiresIn: '1m',      // 만료기간
    issuer: 'nodebird2',  // 발급자
  })
  ``

### 10.4 다른 서비스에서 호출하기
