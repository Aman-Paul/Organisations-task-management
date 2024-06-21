const express = require('express');
const orgController = require('../controllers/org.controller');
const router = express.Router();

router.get('/list', orgController.getOrgList)

module.exports = router;