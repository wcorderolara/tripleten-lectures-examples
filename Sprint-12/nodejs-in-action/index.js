// File System module
const fs = require('fs');

fs.readFile('data.txt', 'utf8', (err, data) => {
    if(err) {
        console.error('Error reading file:', err);
    }

    console.log('File contents:', data);
})