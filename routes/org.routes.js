const express = require('express');
const orgController = require('../controllers/org.controller');
const router = express.Router();

router.get('/list', orgController.getOrgList);
router.post('/', orgController.createOrg);

module.exports = router;