const fs = require('fs');

async function readFileExample() {
    console.log('1. Starting to read file...');

    try {
        const data = await fs.promises.readFile('data.txt','utf8');

        console.log('2. File Content:', data);
    } catch (error) {
        console.log('Error reading file:', error);
    }

    console.log('3. Done!!!');
}

readFileExample();
console.log('4. This runs immediately after calling readFileExample()');