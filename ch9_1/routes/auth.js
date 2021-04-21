const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedin } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

// Sign Up
router.post('join', isNotLoggedin, async(req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });  //기존유저 존재확인
    if (exUser) {
      return res.redirect('/join?error=exit');
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
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
