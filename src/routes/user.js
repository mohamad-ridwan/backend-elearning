const express = require('express')

const router = express.Router();

const userControllers = require('../controllers/user')

router.post('/post', userControllers.post)
router.get('/get', userControllers.get)

module.exports = router;