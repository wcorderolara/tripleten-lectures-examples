const express = require('express');
const router = express.Router();
const {getUser, createUser, updateUser, deleteUser, getUsers} = require('../services/userController');
const { protect, restrictTo } = require('../middleware/auth');


router.route('/')
    .get(protect, restrictTo('admin'), getUsers)
    .post(protect, restrictTo('admin', 'user'), createUser);

router.route('/:id')
    .get(protect, getUser)
    .put(protect, updateUser)
    .delete(protect, deleteUser);

module.exports = router;
