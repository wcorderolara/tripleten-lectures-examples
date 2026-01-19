const express = require('express');
const router = express.Router();
// const todoService = require('../services/todoService');
const {getTodos, createTodo, getTodoById, updateTodo, deleteTodo, getTodosByUser} = require('../services/todoController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getTodos);
router.post('/', createTodo);

router.route('/:id')
    .get(getTodoById)
    .put(updateTodo)
    .delete(deleteTodo);

router.get('/user/:userId', getTodosByUser);

module.exports = router;