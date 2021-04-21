const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

// Sign Up
router.post('/join', isNotLoggedIn, async(req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });  //기존유저 존재확인
    if (exUser) {
      return res.redirect('/join?error=exist');
    }
    const hash = await bcrypt.hash(password, 12);  //hash()메서드사용 , 프로미스 지원 / await 사용
    await User.create({  //기존유저 없으면 비번암호화(hash), 유저정보 객체 생성
      email,
      nick,
      password: hash,
    });
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// Log In
router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => { //첫번쨰 매개변수 실패, 두번째 매개변수값 성공
    if (authError) {  
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/');
    });
  })(req, res, next);  //미들웨어 내의 미들웨어에는 (req, res, next) 붙인다.
});

// Log Out
router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();  // req.user 객체를 제거
  req.session.destroy();  // 요청.세션의 객체 내용 제거
  res.redirect('/');
});

module.exports = router;


