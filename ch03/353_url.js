const url = require('url');

// const URL = url;   //url 모듈안에 URL 생성자 있음! 
// console.log(URL);


const { URL } = url;
console.log(URL);

const myURL = new URL('https://github.com/42azimut/md_doc_Study/blob/main/markDownStudy.md');
console.log('new URL():', myURL);
console.log('url.format():', url.format(myURL));
console.log('======== 아래 노드 url ========');
const parsedURL = url.parse('https://github.com/42azimut/md_doc_Study/blob/main/markDownStudy.md');
console.log('url.parse():', parsedURL);
console.log('url.format():', url.format(parsedURL));