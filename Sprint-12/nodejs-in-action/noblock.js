const fs = require('fs');
console.log('1. Starting to read file...');

fs.readFile('data.txt', 'utf-8', (error, data) => {
    if(error) {
        console.log('Error reading file:', error);
        return;
    }

    console.log('2. File Content:', data);

})


console.log('3. Done!!!');
