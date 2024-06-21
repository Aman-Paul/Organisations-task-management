const express = require('express');
const User = require('../database/models/user.model');
const authController = require('../controllers/auth.controller');
const router = express.Router();

module.exports = router;