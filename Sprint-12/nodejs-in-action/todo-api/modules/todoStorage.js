const fs = require('fs').promises;
const path = require('path');
const config = require('../config/config');
const logger = require('../utils/logger');
const {generateId} = require('../utils/helpers.js');

// Read all todos from JSON file
// CONTROLLERS
async function getAllTodos() {
    try {
        const data = await fs.readFile(config.todosFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        logger.error(`Failed to read todos: ${error.message}`);
        throw error;
    }
}

module.exports = {
    getAllTodos
}