const Operations = require('./math.js');
const {sum, multiply } = require('./math2.js');

const op = new Operations(6, 4);

console.log(`Addition: ${sum(10,3)}`);

console.log(`Substraction: ${op.substract()}`);

console.log(`Multiplication: ${multiply(-5, 4)}`);