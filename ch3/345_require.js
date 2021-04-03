console.log('requireㄱㅏ 가장위에 오지 않아도 됩니다.');

module.exports = '저를 찾아 보세요!';

require('./33_var.js');

console.log('require.cache 입니다.');
console.log(require.cache);
console.log('require.main--');
console.log(require.main);
console.log(require.main === module);
console.log(require.main.filename);