
const sayNode = function() {
    console.log('Node');
};
let es = "ES";

const newObject = {
    sayJS() {
        console.log('JS');
    },
    sayNode,
    [es + 6]: 'Fanstastic',
};
newObject.sayNode();
newObject.sayJS();
console.log(newObject.ES6);
