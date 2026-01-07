const path = require('path');

const config = {
    port: process.env.PORT || 4000,
    dataDir: path.join(__dirname, '..', 'data'),
    todosFile: path.join(__dirname, '..', 'data', 'todos.json'),
}

module.exports = config;