//import or create the reference to the Model
const Todo = require('../schemas/Todo');
const logger = require('../utils/logger');
const { sendSuccess, sendError, sendCreated } = require('../utils/responseHandlers');

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({})
        return sendSuccess(res, todos);

    } catch (error) {
        logger.error(error);
        sendError(res, error);
    }
}

const getTodoById = async(req, res) => {
    try {
        const todo = await Todo.findById(req.params.id)
                               .populate('user', 'username email');
        if(!todo) {
            return sendError(res, 'Todo not found', 404);
        }

        return sendSuccess(res, todo);
    } catch (error) {
        logger.error(error);
        sendError(res, error);
    }
}

const getTodosByUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);

        if(!user) {
            return sendError(res, 'User not found', 404);
        }
        const filter = { user: req.params.userId };

        const todos = await Todo.find(filter)
                                .sort({ createdAt: -1 })
                                .select('-__v');

        return sendSuccess(res, todos);

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
    getTodos,
    getTodoById,
    getTodosByUser,
    createTodo,
    updateTodo,
    deleteTodo
}