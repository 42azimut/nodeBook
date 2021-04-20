const express = require('express');
const { isLoggedIn, isNotLoggendIn } = require('./middlewares');

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followerIdList = [];
  next();
});

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', { title: '내 정보 - NodeBird 2nd'});
});


router.get('/join', isNotLoggendIn, (req, res) => {
  res.render('join', { title: '회원 가입 - NodeBird 2nd'});
});

router.get('/', (req, res, next) => {
  const twits = [];
  res.render('main', {
    title: `NodeBird 2nd`,
    twits,
  });
});

module.exports = router;


