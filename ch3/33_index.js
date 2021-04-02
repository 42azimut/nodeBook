const { odd, even } = require('./33_var.js');
const checkNumber_recieve = require('./33_func.js');

function checkStringOddEven(str) {
    if (str.length % 2 === 1) {
        console.log(str.length % 2);
        return odd;
    }
    return even;
}

console.log(checkNumber_recieve(190023));
console.log(checkStringOddEven('howdo'));
