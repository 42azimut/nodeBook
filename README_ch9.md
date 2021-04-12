## ch9  익스프레스로 SNS 서비스 만들기

### 9.1 프로젝트 구조 갖추기
- `npm init`
- `npm i sequelize mysql2 sequelize-cli`
- `npx sequelize init`
- `npm i express cookie-parser express-session morgan multer dotenv nunjucks`
- `npm i -D nodemon`
- public / css
- views / html files
- router / page.js
- app.js

### 9.2 데이터 베이스 세팅하기
1) 사용자 테이블(로그인 기능)  - users.js
2) 게시글 테이블(게시글 저장) - post.js
3) 해시태그 테이블(해시태그 사용) - hashtag.js
4) 팔로우 기능...

- models/users.js (사용자 정보 저장 모델)
  - 이메일, 닉, 비번, 소셜로그인 제공자(ex, KaKao), 소셜id
  - 테이블 옵션 : timestamps, paranoid, createdAt, updatedAt, deletedAt 생성

- models/post.js
  - content, img(이미지 경로)
  - 게시글 등록자의 아이디를 담은 컬럼은 나중에 관계 설정할때 시퀄라이즈가 알아서 생성함.

- models/hashtag.js
  - title(태그 이름 저장)
  - 해시태그 모델 따로 두는 것은 이후 태그로 검색하기 위해서

- 위 생성 모델들을 시퀄라이즈에 등록. models/index.js 


- 아래 코드 참조
- User 모델과 Post 모델은 1(User):N(Post) 관계이므로, hasMany로 연결되어 있음.
- user.getPosts, user.addPosts 같은 관계 메서들들이 생성됨.
- 같은 모델끼리 N:M 관계 가능! 팔로잉 기능이 대표적인 N:M 관계. 
- 사용자 한명이 여러명 팔로워 가능, 한사람이 여려명 팔로잉 가능.
- 즉, User 모델과, User 모델간에 N:M 관계
- 모델이름과 컬럼 이름은 달리 해야ㅑ함. 모델이름이 UserUser 안됨
- through 옵션을 사용해 생성할 모델이름을 Follow로 정함.
- foreignKey 옵션에 각각 followerId, followingId 넣어 두 사용자 아이디를 구별!
- as 옵션은 둘다 User 구분 안되기 때문. 주의(as는 foreignKey와 반대 모델 가리킴)
```
static associate(db) {
    db.User.hasMany(db.Post);
    db.User.belongsToMany(db.User, {
      foreignKey: 'followingId',
      as: 'Followers',
      through: 'Follow',
    });
    db.User.belongsToMany(db.User, {
      foreignKey: 'followerId',
      as: 'Followings',
      through: 'Follow',
    })
  }

```

- 시퀄라이즈는 config.json을 읽어 데이터베이스를 생성할수 있다.
- config.json 수정 
  - psword : '*****'
  - db_name : 'nodebird'

- `npx sequelize db:create`  // 데이터 베이스 명령입력.

### 9.3 Passport 모듈로 로그인 구현하기
- 소셜 로그인  & 로컬 로그인
#### 9.3.1 로컬 로그인 구현하기
- 자체 로그인 구현하기 위해 : 패스포트에서 passport-local 모듈 필요. 이미 설치.
  1) 회원가입 2) 로그인 3) 로그아웃 라우터생성

- 조건 1 : 로그인한 사용자는 회원가입과 로그인 라우터에 접근 안되어야 함.
- 조건 2 : 로그인 안한 유저는 로그아웃 라우터 접근 불가.
- 따라서 라우터에 따라 접근 권한을 제어 하는 미들웨어가 필요.
- Passport가 req  객체에 추가해주는 **req.isAuthenticated**  메서드 사용

- routes/page.js
  - res.locals.user 속성에 **req.user** 담음. 넌적스에서 user 객체를 통해 사용자 정보 접근 가능! 

  ```
  router.user((req, res, next) = > {
    res.locals.user = req.uesr;
    ... 
    next();
  });
  ```

- routes/auth.js   (회원가입, 로그인, 로그아웃 라우터 작성)
- app.js에 연결할때 /auth 접두사를 붙임! 라우터 주소는  /auth/join, /auth/login, /auth/logout
  1) 회원가입 라우터
    - 기존 같은 이메일 가입자 사용자(exUser) 있는지 조회 한뒤, 있으면 회원가입으로 보냄.
    - 같은 사용자 이메일 없으면, 비번 암호화하고, 사용자 정보 생성
    - 비번 암호화 저장. bcrypt모듈 사용. 
    - bcrypt 모듈의  hash 메서드 사용하면 쉽게 암호화 가능. 
    - bcrypt 두번째 인수는 pbkdf2  반복횟수 비슷한 기능. 12이상 추천 31까지 사용가능.
    - 프로미스 지원함수이므로 await을 사용함.

  2) 로그인 라우터
    - 로그인 요청이 들어오면 passport.authenticate('local') 미들웨어가 로컬 로그인 전략을 수행.
    - 전략코드에서 전략이 성공하거나 실패하면 authenticate 메서드의 콜백 함수가 실행.
    - 콜백함수의 첫번째 매개변수(authError)값이 있다면 실패. 
    - 두번째 매개변수 값이 있다면 성공. req.login 메서드 호출
  
  3) 로그아웃 라우터
    - req.logout()메서드는 req.user 객체를 제거.
    - req.session.destroy 는 req.session 객체의 내용을 제거
  
- passport/localStrategy.js
- passport-local 모듈에서 Strategy 생성자를 불러와 그 안에 전략을 구현
  1) LocalStrategy 생성자의 첫번째 인수로 주어진 객체는 전략에 관한 설정을 함.
    - usernameField 와 passwordField 에는 일치하는 로그인 라우터의 req.body 속성명을 적으면 됨. req.body.email에 이메일 주소가, req.body.password 비번이 담겨 들어오므로 email과 password 를 각각 넣는다.
  2) 실제 전략 수행 async 함수. 
    - LocalStrategy 생성자의 두번째 인수로 들어감. 
    - 첫번째 인수에서 넣어준 email, password는 각각  async 함수의 첫번재와 두번째 매개변수가 됨. 세번째 매개변수인 done 함수는 passport.authenticate의 콜백 함수이다.

- 전략 내용은
  1) 먼저 사용자 디비에서 일치하는 이메일이 있는지 찾은후, 있으면 bcrypt의 compare함수로 비번 비교. 
  2) 비번 일치하면 done 함수의 두번째 인수로 사용자 정보 넣어 보냄.
  3) 두번째 인수를 사용하지 않는 경우는 로그인에 실패 했을 때뿐. 
  4) done 함수의 첫번째 인수를 사용하는 경우 서버 쪽에서 에러가 발생했을때
  5) 세번째 인수를 사용하는 경우는 로그인 처리 과정에서 비번이 일치 하지 않거나 존재 하지 않는 회원일때와 같은 사용자 정의 에러가 발생했을 때 이다. 
