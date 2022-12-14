const express = require('express')

const router = express.Router()

const tokendbControllers = require('../controllers/tokendb')

router.post('/post', tokendbControllers.post)
router.delete('/delete', tokendbControllers.delete)
router.delete('/delete-many', tokendbControllers.deleteMany)
router.get('/get', tokendbControllers.get)

module.exports = router