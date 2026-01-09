const express = require('express');
const router = express.Router();
const {getUserById, createUser, updateUser, deleteUser, getAllUsers} = require('../services/userController');


router.route('/')
    .get(getAllUsers)
    .post(createUser);

router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;
