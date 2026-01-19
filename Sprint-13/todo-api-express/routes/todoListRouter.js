const express = require('express');
const router = express.Router();
const { getMyLists,
    getLists,
    getListsByUser,
    createList,
    updateList,
    deleteList } = require('../services/todoListController');
const { protect, restrictTo } = require('../middleware/auth');

router.route('/')
    .get(protect, getMyLists)
    .post(protect, createList);

router.route('/:listId')
    .get(protect, getLists)
    .put(protect, updateList)
    .delete(protect, deleteList);

router.route('/user/:userId')
    .get(protect, restrictTo('admin'), getListsByUser);

module.exports = router;