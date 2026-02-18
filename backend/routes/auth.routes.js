const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');

// POST /auth/login
router.post('/login', authController);

module.exports = router;