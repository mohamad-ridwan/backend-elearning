const express = require('express')

const router = express.Router();

const logowebControllers = require('../controllers/logoweb')

router.post('/post', logowebControllers.post)
router.get('/get', logowebControllers.get)

module.exports = router;