## ch8. MongoDB
### 8.1 NoSQL & SQL

| SQL(MySQL) |  NoSQL(mongoDB)  |
| :-------: | :------: |
|    규칙에 맞는 데이터 입력 |   자유로운 데이터 입력    |
|   테이블간 JOIN 지원 | 컬렉션 간 JOIN 미지원 |
|   안정성, 일관성 | 확장성, 가용성 |
|   용어(테이블, 칼럼, 로우) | 용어(컬렉션, 다큐먼트, 필드) |
___
- NoSQL 특징
  - NoSQL에는 고정된 테이블이 없음
  - 테이블에 상응하는 컬렉션 개념 존재 그러나 칼럼은 없음
  - 예) MySQL은 users 테이블을 만든후 name, age, married 등의 칼럼과 자료형, 옵션을 정의
  - NoSQL 몽고디비는 그냥 users 컬렉션 만들고 끝! users 컬렉션에는 어떤한 데이터든 들어 갈수 있다.
  - 몽고디비는 MySQL과 달리 **JOIN** 기능이 없음.
  - 데이터의 일관성을 보장이 약하나, 데이터를 빠르게 넣을 수 있고 쉽게 여러 서버에 데이터를 분산할수 있다. 

- 용어
  - Mysql의 테이블, 로우, 칼럼
  - NoSQL에서는 컬렉션, 다큐먼트 필드

### 8.2.2  맥 설치
```
# 홈블루 설치 함

# 몽고 디비 설치
brew tap mongodb/brew
brew install mongodb-community

#mac 저장경로 /usr/local/var/mongodb 에 데이터가 저장

# 몽고 디비 실행
brew services start mongodb-community
==>Succesfully .....

$ mongo   # 실행!

#관리자 계정 추가
use admin
db.createUser({user:'이름', pwd:'비밀번호', roles:['root']})

# ctrl+c
brew services stop mongodb-community

vim /usr/local/etc/mongod.conf
 -설정 시큐러티

# 관리자로 몽고디비 실행
brew services start mongodb-community
mongo 
mongo admin -u [name] -p [psword]  #대괄호 빼라!
```

## 8.3 컴퍼스 설치하기
```
brew cask install mongodb-compass-community #설치 에러 cask
- 그냥 웹에서 다운로드 설치
```

### 8.3.4 커넥션 생성하기
 
## 8.4 데이터베이스 및 컬렉션 생성하기
- nodejs 라는 이름의 디비와 7장의 mysql 테이블에 상응하는 컬렉션을 만든다.
- 데이터베이스 만드는 명령어는 `use [데이터베이스 이름]`
  - `use nodejs`
- 목록확인(데이터 최소 한개 이상이어야 목록에 표시됨)
  - `show dbs`
- 현재 사용중인 데이터 베이스 확인 
  - `db`
- 컬렉션 따로 생성 안해도 됨. 다큐먼트 넣는 순간 컬렉션도 **자동 생성**
  - `db.createCollection('컬렉션 이름')`
  ```
    db.createCollection('users')
    db.createCollection('comments')
  ```
- 생성 컬렉션 목록 확인
  - `show collections`

## 8.5 CRUD 작업하기
### 8.5.1 Create(생성)
- 컬렉션에 컬럼을 정의하지 않아도 됨. 아무 데이터나 넣을수 있다.
- 몽고디비의 자료형
  - 기본적으로 자바스크립트 문법 사용.
  - 자스 객체 자료형으로 사용
- `db.컬렉션명.save(다큐먼트)` 로 다큐먼트 생성. 자스 객체처럼 사용!
```
db.users.save({name:'azim', age:34, married: false, comment: '몽고디비 공부 사용방법은 이러하데!', createdAt: new Date() });

db.users.save({name:'IU_love', age:24, married: false, comment: '몽고 디비 친구 nosql 공부중!', createdAt: new Date() });

db.users.find({ name: 'azim'}, { _id: 1})
> { "_id" : ObjectId("607a977c278b9538a006eca8") }

db.comments.save({ commenter:ObjectId("607a977c278b9538a006eca8"), comment: '댓글 aazim의 댓글', createdAt: new Date() });
```

### 8.5.2 READ(조회)
```
# 컬렉션 내 모든 다큐먼트를 조회
db.users.find({});
db.comments.find({});

# 특정 필드만 조회 find()메서드의 두번째 인수로 조회할 필드 입력. 1 나오고, 0 안나옴
db.users.find({}, {_id: 0, name: 1, married: 1});

# 조건 조회 첫번째 인수 객체에 입력
db.users.find({age: { $gt:30 }, married: false}, {_id:0, name:1, age:1});

- $gt(초과), $gte(이상), $lt(미만), $lte(이하), $ne(같지 않음), $or(또는), $in(배열 요소중 하나) 등...
```

### 8.5.3 update(수정)
- 첫번째 객체는 : 수정할 다큐먼트 지정
- 두번째 객체는 : 수정할 내용 입력 $set 연산자 사용(일부필드만 수정할떄 사용)
- 만약 $set 사용안하고 수정하면 통째로 수정됨.
```
db.users.update({name:'iu_love'}, { $set: { comment: '업데이트 수정 글' }});
```

### 8.5.4 Delete(삭제)
- 삭제할 다큐먼트에 대한 정보가 담긴 객체를 첫 번재 인수로 제공.
```
db.users.remove({name: 'iu_love'});
```

## 8.6 몽구스 사용하기
- 기본 설치
  - npm init
  - npm i express morgan nunjucks mongoose
  - npm i -D nodemon









