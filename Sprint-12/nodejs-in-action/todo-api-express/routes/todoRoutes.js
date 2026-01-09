const express = require('express');
const router = express.Router();
// const todoService = require('../services/todoService');
const {getTodos, createTodo, getTodoById, updateTodo, deleteTodo, getTodosByUser} = require('../services/todoController');

router.route('/')
    .get(getTodos)
    .post(createTodo);


router.route('/:id')
    .get(getTodoById)
    .put(updateTodo)
    .delete(deleteTodo);

router.get('/user/:userId', getTodosByUser);

module.exports = router;