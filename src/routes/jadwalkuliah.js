const express = require('express');

const router = express.Router();

const jadwalKuliahControllers = require('../controllers/jadwalkuliah')

router.post('/post/matakuliah', jadwalKuliahControllers.matakuliah)
router.post('/post/matakuliah/data-card-absen/:_id', jadwalKuliahControllers.dataCardAbsen)
router.post('/post/matakuliah/jadwal-absen/:_id', jadwalKuliahControllers.jadwalAbsen)
router.post('/post/matakuliah/jadwal-absen/absen-mhs/:_id/:pertemuan', jadwalKuliahControllers.absenMhs)
router.post('/post/matakuliah/materi-tambahan/:_id', jadwalKuliahControllers.materiTambahan)
router.get('/get/matakuliah', jadwalKuliahControllers.allMatakuliah)
router.get('/get/matakuliah/one-matkul/:path', jadwalKuliahControllers.oneMatkul)

module.exports = router;