const fs = require('fs');
console.log('1. Starting to read file...');

const data = fs.readFileSync('data.txt', 'utf-8');

console.log('2. File Content:', data);

console.log('3. Done!!!');


