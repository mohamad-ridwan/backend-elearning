const express = require('express');

const router = express.Router();

const panduangControllers = require('../controllers/panduan');

router.post('/post', panduangControllers.post)
router.get('/get', panduangControllers.get)

module.exports = router;