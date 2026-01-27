const TodoList = require('../schemas/TodoList');
const Todo = require('../schemas/Todo');
const User = require('../schemas/User');
const logger = require('../utils/logger');
const {sendSuccess, sendError, sendCreated} = require('../utils/responseHandlers');

const getMyLists = async (req, res, next) => {
    try {
        const lists = await TodoList.find({user: req.user._id})
                                    .select('-__v')
                                    .sort({createdAt: -1})

        const listWithCounts = await Promise.all(
            lists.map(async (list) => {
                const totalCount = await Todo.countDocuments({ todoList: list._id });

                return {
                    ...list.toObject(),
                    todoCount: totalCount
                }
            })
        );

        return sendSuccess(res, {data: listWithCounts, count: listWithCounts.length});
    } catch (error) {
        logger.error('Error fetching user todo lists:', error);
        sendError(res, 'Failed to fetch todo lists', 500);
    }
}

const getLists = async (req, res, next) => {
    try {
        const list = await TodoList.findOne({ _id: req.params.listId, user: req.user._id })
                                   .select('-__v')
                                   .populate('user', 'name');
        if(!list) {
            return sendError(res, 'Todo list not found', 404);
        }

        const isOwner = req.user && list.user._id.toString() === req.user._id.toString();
        const isAdmin = req.user && req.user.role === 'admin';

        if(!list.isPublic && !isOwner && !isAdmin) {
            return sendError(res, 'Access denied to this todo list', 403);
        }

        const todos = await Todo.find({ todoList: list._id })
                                .select('-__v')
                                .sort({ createdAt: -1 });

        return sendSuccess(res, { ...list.toObject(), todos });
    } catch (error) {
        logger.error('Error fetching todo list:', error);
        sendError(res, 'Failed to fetch todo list', 500);
    }
}

const getListsByUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId);

        if(!user) {
            return sendError(res, 'User not found', 404);
        }

        if(req.user && req.user?.role !== 'admin') {
            return sendError(res, 'Access denied to this user\'s todo lists', 403);
        }

        const lists = await TodoList.find({ user: req.params.userId })
                                    .select('-__v')
                                    .sort({ createdAt: -1 });
        return sendSuccess(res, lists);
    } catch (error) {
        logger.error('Error fetching user todo lists:', error);
        sendError(res, 'Failed to fetch todo lists', 500);
    }
}

const createList = async (req, res, next) => {
    try {
        const {name, description, isPublic} = req.body;
        const newList = await TodoList.create({
            name,
            description,
            isPublic: isPublic ?? true,
            user: req.user._id
        });

        return sendCreated(res, newList);
    } catch (error) {
        logger.error('Error creating todo list:', error);
        sendError(res, 'Failed to create todo list', 500);
    }
}

const updateList = async (req, res, next) => {
    try {
        const existingList = await TodoList.findById(req.params.listId);

        if(!existingList) {
            return sendError(res, 'Todo list not found', 404);
        }

        if(existingList.user.toString() !== req.user._id.toString()) {
            return sendError(res, 'Unauthorized to update this todo list', 403);
        }

        const {name, description, isPublic} = req.body;

        const list = await TodoList.findOneAndUpdate(
            { _id: req.params.listId },
            { name, description, isPublic},
            { new: true, runValidators: true }
        )

        return sendSuccess(res, list);
    } catch (error) {
        logger.error('Error updating todo list:', error);
        sendError(res, 'Failed to update todo list', 500);
    }
}

const deleteList = async (req, res, next) => {
    try {
        const list = await TodoList.findOne({ _id: req.params.listId});

        if(!list) {
            return sendError(res, 'Todo list not found', 404);
        }

        if(list.user.toString() !== req.user._id.toString()) {
            return sendError(res, 'Unauthorized to delete this todo list', 403);
        }

        await TodoList.findByIdAndDelete(list._id);

        return sendSuccess(res, { message: 'Todo list deleted successfully' });
    } catch (error) {
        logger.error('Error deleting todo list:', error);
        sendError(res, 'Failed to delete todo list', 500);
    }
}

module.exports = {
    getMyLists,
    getLists,
    getListsByUser,
    createList,
    updateList,
    deleteList
}
