const express = require('express');
const User = require('../database/models/user.model');
const authController = require('../controllers/auth.controller');
const router = express.Router();

router.post('/signup', (req, res) => {
    authController.signup(req, res);
});

router.post('/signin', (req, res) => {
  authController.signin(req, res);
});

module.exports = router;