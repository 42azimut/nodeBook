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



