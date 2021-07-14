const express = require('express');

const router = express.Router();

const absensiControllers = require('../controllers/absensi')

router.post('/post', absensiControllers.post)
router.post('/post/absen-mhs/:_id', absensiControllers.absen)
router.post('/post/jadwal-absen/:_id', absensiControllers.jadwalAbsen)
router.post('/post/jadwal-absen/absen-mhs/:_id', absensiControllers.absenMhs)

module.exports = router;