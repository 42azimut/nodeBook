const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

dotenv.config();
const app = express();
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name: 'session-cookie',
}));

try {
  fs.readdirSync('multer_uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더 생성 합니다.');
  fs.mkdirSync('multer_uploads'); 
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, res, done) {
      done(null, 'multer_uploads/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'multipart.html'));
});

// 싱글 미들웨어 (파일 하나만)
// app.post('/upload', upload.single('image'), (req, res) => {
//   console.log(req.file, res.body);
//   res.send('ok');
// });

// 여러파일 업로드 미들웨어
// app.post('/upload', upload.array('many'), (req, res) => {
//   console.log(req.files, req.body);
//   res.send('OoooKKKK');
// });

// fields 미들웨어 사용
app.post('/upload', upload.fields([{name: 'image1'}, {name: 'image2'}]), 
  (req, res) => {
  console.log(req.files, req.body);
  res.send('OoooKKKK');
});

app.use((req, res, next) => {
  console.log(('모든 요청에서 실행됩니다.'));
  next();
});

app.get('/', (req, res, next) => {
  console.log('GET / 요청에서만 실행된다고 ');
  next();
}, (req, res) => {
  throw new Error('에러는 에러 처리 throw new Error() 로 던져서 미들웨어로 간다고!!!!');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), `에서 대기중`);
}); 