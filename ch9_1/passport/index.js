const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');


module.exports = () => {
  // 로그인시에만 실행 
  // req.session(세션) 객체에 어떤 데이터를 저장할지 정하는 메서드
  passport.serializeUser((user, done) => {
    done(null, user.id);   //첫번재 인수는 에러 발생시 사용. 두번재 저장하고픈 데이터
  });

  //모든 요청시 실행 - 유저 정보 (아이디) 확인
  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id }})  //매개변수 id와 디비 사용자정보 조회
      .then(user=>done(null, user))   //조회 정보를 req.user에 저장
      .catch(err=>done(err));
  });
}