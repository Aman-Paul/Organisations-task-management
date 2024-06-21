const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const orgRoutes = require('./org.routes');
const authenticate = require('../middlewares/authenticate');

router.use('/auth', authRoutes);
router.use('/org', authenticate, orgRoutes);

router.get('/', (req, res) => {
  res.send('Welcome to the API');
});

module.exports = router;