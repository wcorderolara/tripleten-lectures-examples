const express = require('express');
const router = express.Router();
// const todoService = require('../services/todoService');
const {getTodosByList, createTodo, getTodoById, updateTodo, deleteTodo} = require('../services/todoController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getTodosByList);
router.post('/', protect, createTodo);

router.route('/:id')
    .get(protect, getTodoById)
    .put(protect, updateTodo)
    .delete(protect, deleteTodo);

module.exports = router;