//import or create the reference to the Model
const Todo = require('../schemas/Todo');
const TodoList = require('../schemas/TodoList');
const logger = require('../utils/logger');
const { sendSuccess, sendError, sendCreated } = require('../utils/responseHandlers');

const getTodosByList = async (req, res) => {
    try {
        const {listId} = req.params;
        const list = await TodoList.findById(listId);

        if(!list) {
            return sendError(res, 'Todo list not found', 404);
        }

        const isOwner = list.user.toString() === req.user._id.toString() && req.user;
        if(!list.isPublic && !isOwner && req.user?.role !== 'admin') {
            return sendError(res, 'Access denied to this todo list', 403);
        }

        const todos =  await Todo.find({ todoList: listId })
                                 .select('-__v')
                                 .sort({ createdAt: -1 });
        return sendSuccess(res, todos);

    } catch (error) {
        logger.error(error);
        sendError(res, error);
    }
}

const getTodoById = async(req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if(!todo) {
            return sendError(res, 'Todo not found', 404);
        }

        return sendSuccess(res, todo);
    } catch (error) {
        logger.error(error);
        sendError(res, error);
    }
}

const createTodo = async (req, res) => {
    try {
        const body =req.body;
        if(!body) {
            return sendError(res, 'Request body is required', 400);
        }

        //create the new todo
        const newTodo = await Todo.create({
            title: body.title.trim(),
            description: body.description,
            todoList: req.params.listId
        })

        return sendCreated(res, newTodo);
    } catch (error) {
        logger.error(error);
        return sendError(res, error);
    }
}

const updateTodo = async (req, res) => {
    try {
        const {title, description, completed} = req.body;
        const todo = await Todo.findOneAndUpdate(
            {_id: req.params.id},
            {
                title, description, completed
            },
            {new: true, runValidators: true}
        );

        if(!todo) {
            return sendError(res, 'Todo not found', 404);
        }

        return sendSuccess(res, todo);
    } catch (error) {
        logger.error(error);
        return sendError(res, error);
    }
}

const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({_id: req.params.id});
        if(!todo) {
            return sendError(res, 'Todo not found', 404);
        }
        return sendSuccess(res, todo);
    } catch (error) {
        logger.error(error);
        return sendError(res, error);
    }
}

module.exports = {
    getTodosByList,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo
}