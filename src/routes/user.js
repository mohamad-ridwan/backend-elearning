const express = require('express')

const router = express.Router();

const userControllers = require('../controllers/user')

router.post('/post', userControllers.post)
router.get('/get', userControllers.get)
router.post('/login', userControllers.login)
router.post('/forgot-password', userControllers.forgotPassword)
router.put('/put/informasi-profil/:putId', userControllers.putInformasiProfile)
router.put('/put/informasi-profil/emailonly/:putId', userControllers.putEmailOnly)
router.put('/put/update-password/:putId', userControllers.putUpdatePassword)
router.put('/put/create-new-password:/putId', userControllers.createNewPassword)

module.exports = router;