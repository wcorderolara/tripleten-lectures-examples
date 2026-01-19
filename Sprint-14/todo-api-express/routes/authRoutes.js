const express = require('express');
const router = express.Router();
const { signUp, signIn } = require('../services/authController');

// Public routes
router.post('/signup', signUp)
router.post('/signin', signIn)

module.exports = router;