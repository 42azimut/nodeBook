const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');

dotenv.config();
const webSocket = require('./socket')
const indexRouter = require('./routes');

const app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');

nunjucks.configure('view', {
  express: app,
  watch: true,
})

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname), 'public'))
app.use(express.join())
app.use(express.urlencoded({ extended: false }))
app.use(cookkieParser(process.env.COOKIE_SECRET ))
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  }
}))

app.use('/', indexRouter)

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`)
  error.status = 404
  next(error)
})

app.use((err, req, res, next) => {
  res.local.message = err.message,
  res.local.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500)
  res.render('error')
})

const server = app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
})

webSocket(server);