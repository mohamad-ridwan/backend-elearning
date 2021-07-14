const absensi = require('../models/absensi');

const tokenRandom1 = Math.random().toString(36).substr(2)
const tokenRandom2 = Math.random().toString(36).substr(2)
const getToken = tokenRandom1 + tokenRandom2

exports.post = (req, res, next) => {
    const statusAbsen = req.body.statusAbsen
    const tanggal = req.body.tanggal
    const matakuliah = req.body.matakuliah
    const pertemuan = req.body.pertemuan
    const rangkuman = req.body.rangkuman
    const beritaAcara = req.body.beritaAcara
    const campus = req.body.campus
    const kelas = req.body.class
    const major = req.body.major
    const dosen = req.body.dosen
    const semester = req.body.semester
    const path = req.body.path

    const post = new absensi({
        statusAbsen: statusAbsen,
        tanggal: tanggal,
        matakuliah: matakuliah,
        pertemuan: pertemuan,
        rangkuman: rangkuman,
        beritaAcara: beritaAcara,
        campus: campus,
        class: kelas,
        major: major,
        dosen: dosen,
        semester: semester,
        path: path
    })

    post.save()
        .then(result => {
            res.status(201).json({
                message: 'data berhasil di tambah',
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.absen = (req, res, next) => {
    const _id = req.params._id
    const id = req.body.id
    const dosen = req.body.dosen
    const matakuliah = req.body.matakuliah
    const jamMasuk = req.body.jamMasuk
    const jamKeluar = req.body.jamKeluar
    const ruang = req.body.ruang
    const kelas = req.body.kelas
    const hari = req.body.hari
    const kodeMTK = req.body.kodeMTK

    const dataMhsAbsen = {
        id: id,
        dosen: dosen,
        matakuliah: matakuliah,
        jamMasuk: jamMasuk,
        jamKeluar: jamKeluar,
        ruang: ruang,
        kelas: kelas,
        hari: hari,
        kodeMTK: kodeMTK
    }

    absensi.updateOne(
        { _id: _id },
        { $push: { absen: dataMhsAbsen } },
        { upsert: true }
    ).then(result => {
        res.status(201).json({
            message: 'mhs berhasil absen',
            data: result
        })
    })
        .catch(err => console.log(err))
}

exports.jadwalAbsen = (req, res, next) => {
    const _id = req.params._id
    const id = req.body.id
    const tanggal = req.body.tanggal
    const matakuliah = req.body.matakuliah
    const pertemuan = req.body.pertemuan
    const rangkuman = req.body.rangkuman
    const beritaAcara = req.body.beritaAcara
    const dataAbsen = []

    const data = {
        id: id,
        tanggal: tanggal,
        matakuliah: matakuliah,
        pertemuan: pertemuan,
        rangkuman: rangkuman,
        beritaAcara: beritaAcara,
        dataAbsen: dataAbsen
    }

    absensi.updateOne(
        { _id: _id },
        { $push: { absen: data } },
        { upsert: true }
    ).then(result => {
        res.status(201).json({
            message: 'dosen berhasil upload absen',
            data: result
        })
    })
        .catch(err => console.log(err))
}

exports.absenMhs = (req, res, next) => {
    const _id = req.params._id
    const nim = req.body.nim
    const name = req.body.name
    const tokenUser = req.body.tokenUser
    const pertemuan = req.body.pertemuan

    const data = {
        nim: nim,
        name: name,
        tokenUser: tokenUser
    }

    const updateDocument = {
        $push: { "absen.$[item].dataAbsen": data },
        upsert: true
    }

    const options = {
        arrayFilters: [
            {
                "item.pertemuan": pertemuan
            }
        ]
    }

    absensi.updateOne({ _id: _id }, updateDocument, options)
        .then(result => {
            res.status(201).json({
                message: 'mhs berhasil absen',
                data: result
            })
        })
        .catch(err => console.log(err))
}