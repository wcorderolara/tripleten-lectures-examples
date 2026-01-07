const express = require('express');
const router = express.Router();
const todoService = require('../services/todoService');
const {sendSuccess, sendError, sendCreated} = require('../utils/responseHandlers');
const logger = require('../utils/logger');

const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

router.get('/', asyncHandler((req, res) => {
    sendSuccess(res, {
        messsage: 'Welcome to the TODO API',
        version: '1.0.0',
        endpoints: {
            'GET /api/todos': 'Get All Todos',
            'GET /api/todos/:id': 'Get Todo by Id'
        }
    })
}))

// GET ALL TODOS and GET THE SINGLE TODO BY ID
// /api/todos --> GET
router.get('/todos', asyncHandler(async(req, res) => {
    try {
        let todos = await todoService.getAllTodos();

        sendSuccess(res, {
            count: todos.length,
            todos: todos
        })
    } catch (error) {
        logger.error(`Error fetching todos: ${error.message}`);
        sendError(res, 'Failed to fetch todos');
    }
}));

// GET TODO BY ID
// /api/todos/:id --> GET
router.get('/todos/:id', async(req, res) => {
    try {
        const todo = await todoService.getTodoById(req.params.id);
        if(todo) {
            sendSuccess(res, todo);
        } else {
            sendError(res, 'Todo not found', 404);
        }
    } catch (error) {
        logger.error(`Error fetching todo by id: ${error.message}`);
        sendError(res, 'Failed to fetch todo');
    }
})

// CREATE NEW TODO
// /api/todos --> POST
router.post('/todos', async(req, res) => {
    try {
        const body =req.body;
        if(!body) {
            return sendError(res, 'Request body is required', 400);
        }

        //create the new todo
        const newTodo = await todoService.createTodo({
            title: body.title.trim(),
            description: body.description
        })

        sendCreated(res, newTodo);
    } catch (error) {
        logger.error(`Error creating todo: ${error.message}`);
        sendError(res, 'Failed to create todo');
    }
})

// UPDATE TODO BY ID /api/todos/:id --> PUT
router.put('/todos/:id', async(req, res) => {
    try {
        const todoUpdated = await todoService.updateTodo(req.params.id, req.body);
        if(!todoUpdated) {
            return sendError(res, 'Todo not found', 404);
        }
        sendSuccess(res, todoUpdated);
    } catch (error) {
        logger.error(`Error updating todo: ${error.message}`);
        sendError(res, 'Failed to update todo');
    }
})

// DELETE /api/todos/:id --> DELETE
router.delete('/todos/:id', async(req, res) => {
    try {
        const todoDeleted = await todoService.deleteTodo(req.params.id);
        if(!todoDeleted) {
            return sendError(res, 'Todo not found', 404);
        }
        sendSuccess(res, todoDeleted);
    } catch (error) {
        logger.error(`Error deleting todo: ${error.message}`);
        sendError(res, 'Failed to delete todo');
    }
})

module.exports = router;