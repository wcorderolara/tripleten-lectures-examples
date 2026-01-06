const fs = require('fs').promises;
const path = require('path');
const config = require('../config/config');
const logger = require('../utils/logger');
const {generateId} = require('../utils/helpers.js');

// Initialize: Ensure data directory and todos file exist
async function initialize() {
    try {
        // create data directory if it doesn't exist
        await fs.mkdir(config.dataDir,{ recursive: true });

        // create todos.json file if it doesn't exist
        try {
            await fs.access(config.todosFile);
            logger.info('Todos file exists.');
        } catch (error) {
            await fs.writeFile(config.todosFile, '[]', 'utf8');
            logger.info('Created new todos file.');
        }
    } catch (error) {
        logger.error(`Initialization error: ${error.message}`);
        throw error;
    }
}

// CONTROLLERS
/**
 * CRUD
 * Create
 *   Save all the items
 *   Add one item
 * Read
 *  Read all the elements
 *  Read one element by id
 * Update
 * Delete
 */

// Read all todos from JSON file
async function getAllTodos() {
    try {
        const data = await fs.readFile(config.todosFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        logger.error(`Failed to read todos: ${error.message}`);
        throw error;
    }
}

// Write/Save all todos to file
async function saveTodos(todos) {
    try {
        const data = JSON.stringify(todos, null, 2);
        await fs.writeFile(config.todosFile, data, 'utf8');
        logger.debug('Todos saved to file successfully.');
    } catch (error) {
        logger.error(`Failed to save todos: ${error.message}`);
        throw error;
    }
}

// Get a single todo by ID
async function getTodoById(id) {
    const todos = await getAllTodos();
    return todos.find( (todo) => todo.id === id) || null;
}

// Delete a todo by ID
async function deleteTodo(id) {
    const todos = await getAllTodos();
    const index = todos.findIndex( (todo) => todo.id === id);

    if(index === -1) {
        return null;
    }

    const deleted = todos.splice(index, 1)[0];
    await saveTodos(todos);

    logger.info(`Deleted todo with id: ${id}`);
    return deleted;
}

// Create a new todo
async function  createTodo(todoData) {
    const todos = await getAllTodos();
    const newTodo = {
        id: generateId(),
        title: todoData.title,
        description: todoData.description || '',
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }

    todos.push(newTodo);
    await saveTodos(todos);
    logger.info(`Created new todo with id: ${newTodo.id}`);
    return newTodo;
}

// Update a todo by ID
/*
{
    id: 45,
    title: "old title",
    description: "old desc",
    completed: false,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
}

 id: 45
 updates: {
    title: "New Title"
 }

 filteredUpdates = {
    title: "New Title"
}
AFTER UPDATE
{
    id: 45,
    title: "New Title",
    description: "old desc",
    completed: false,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2026-01-06T09:49:30.000Z"
}

*/
async function updateTodo(id, updates) {
    const todos = await getAllTodos();
    const index = todos.findIndex( (todo) => todo.id === id);

    if(index === -1) {
        logger.error(`Todo with id: ${id} not found for update.`);
        return null;
    }

    const allowedUpdates = ['title', 'description', ' completed'];
    const filteredUpdates = {};

    for(const key of allowedUpdates) {
        if(updates[key] !== undefined) {
            filteredUpdates[key] = updates[key];
        }
    }

    todos[index] = {
        ...todos[index],
        ...filteredUpdates,
        updatedAt: new Date().toISOString()
    }

    await saveTodos(todos);
    logger.info(`Updated todo with id: ${id}`);
    return todos[index];

}

module.exports = {
    getAllTodos,
    getTodoById,
    deleteTodo,
    createTodo,
    updateTodo,
    initialize
}