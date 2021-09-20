const express = require('express')

const router = express.Router()

const tokenVerifikasiControllers = require('../controllers/tokenverifikasi')

router.get('/token-verifikasi', tokenVerifikasiControllers.get)

module.exports = router;