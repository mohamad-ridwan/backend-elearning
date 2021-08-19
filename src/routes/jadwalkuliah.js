const express = require('express');

const router = express.Router();

const jadwalKuliahControllers = require('../controllers/jadwalkuliah')

router.post('/post/matakuliah', jadwalKuliahControllers.matakuliah)
router.post('/post/matakuliah/data-card-absen/:_id', jadwalKuliahControllers.dataCardAbsen)
router.post('/post/matakuliah/jadwal-absen/:_id', jadwalKuliahControllers.jadwalAbsen)
router.post('/post/matakuliah/jadwal-absen/absen-mhs/:_id/:pertemuan', jadwalKuliahControllers.absenMhs)
router.post('/post/matakuliah/ruang-materi/:_id', jadwalKuliahControllers.ruangMateri)
router.post('/post/matakuliah/ruang-materi/materi-tambahan/:_id/:id', jadwalKuliahControllers.materiTambahan)
router.post('/post/matakuliah/ruang-materi/video-pembelajaran/:_id/:id', jadwalKuliahControllers.videoPembelajaran)
router.post('/post/matakuliah/ruang-materi/slide-pembelajaran/:_id/:id', jadwalKuliahControllers.slidePembelajaran)
router.post('/post/matakuliah/ruang-tugas/:_id', jadwalKuliahControllers.ruangTugas)
router.post('/post/matakuliah/data-nilai-tugas/:_id', jadwalKuliahControllers.postDataNilaiTugas)
router.post('/post/matakuliah/ruang-diskusi/:_id', jadwalKuliahControllers.ruangDiskusi)
router.post('/post/matakuliah/ruang-diskusi/komentar/:_id/:id', jadwalKuliahControllers.komentarDiskusi)
router.put('/put/matakuliah/data-nilai-tugas/:_id/:id', jadwalKuliahControllers.putDataNilaiTugas)
router.put('/put/matakuliah/jadwal-absen/time-zone/:_id', jadwalKuliahControllers.putTimeZone)
router.get('/get/matakuliah', jadwalKuliahControllers.allMatakuliah)
router.get('/get/matakuliah/one-matkul/:path', jadwalKuliahControllers.oneMatkul)
router.delete('/delete/matakuliah/ruang-diskusi/:_id/:id', jadwalKuliahControllers.deleteRuangDiskusi)

module.exports = router;