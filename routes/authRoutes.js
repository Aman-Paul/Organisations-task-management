const express = require('express');
const User = require('../database/models/user.model');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/signup', (req, res) => {
    authController.signup(req, res);
});

router.post('/signin', (req, res) => {
  res.send(`User signin`);
});

module.exports = router;