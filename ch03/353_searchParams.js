const { URL } = require('url');

const myURL = new URL('https://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript&category=utube');
console.log('searchParams:', myURL.searchParams);
console.log('searchParams.getAll():', myURL.searchParams.getAll('category'));
console.log('searchParams.get():', myURL.searchParams.get('limit'));
console.log('searchParams.get():', myURL.searchParams.get('page'));
console.log('searchParams.has()', myURL.searchParams.has('page'));
console.log('searchParams.has()', myURL.searchParams.has('category'));
console.log('searchParams.keys()', myURL.searchParams.keys());
console.log('searchParams.values()', myURL.searchParams.values());

myURL.searchParams.append('filter', 'es6');
myURL.searchParams.append('filter', 'vue-js');
console.log('searchParams.getAll()===>:', myURL.searchParams.getAll('filter'));

console.log('searchParams.toString():', myURL.searchParams.toString());
myURL.search = myURL.searchParams.toString();
