//import or create the reference to the Model
const Todo = require('../schemas/Todo');
const logger = require('../utils/logger');
const { sendSuccess, sendError, sendCreated } = require('../utils/responseHandlers');

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({})
        sendSuccess(res, todos);

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
            user: body.user
        })

        sendCreated(res, newTodo);
    } catch (error) {
        logger.error(error);
        sendError(res, error);
    }
}

module.exports = {
    getTodos,
    createTodo
}