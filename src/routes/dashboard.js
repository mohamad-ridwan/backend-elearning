const express = require('express')

const router = express.Router();

const dashboardControllers = require('../controllers/dashboard')

router.get('/', dashboardControllers.get)

module.exports = router;