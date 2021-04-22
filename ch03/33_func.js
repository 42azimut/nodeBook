const { odd, even } = require('./33_var.js');   //구조분해 할당! 

// 원래 아래와 같이 할수 잇지만, 구조분해 사용하여 위 한줄 코드로 만단다!
// const value = require('./33_var.js');
// const odd = value.odd;
// const even = value.even;

function checkOddEven(num) {
    if (num % 2) {
        return odd;
    }
    return even;
}
module.exports = checkOddEven;