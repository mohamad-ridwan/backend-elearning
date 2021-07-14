const jadwalKuliah = require('../models/jadwalkuliah')
const bcrypt = require('bcryptjs')

const timeNow = new Date().getTime()

exports.matakuliah = async (req, res, next) => {

    const salt = await bcrypt.genSalt(10);

    const matakuliah = req.body.matakuliah
    const hari = req.body.hari
    const jamMasuk = req.body.jamMasuk
    const jamKeluar = req.body.jamKeluar
    const noRuang = req.body.noRuang
    const kelas = req.body.kelas
    const kodeMTK = req.body.kodeMTK
    const sks = req.body.sks
    const kelPraktek = req.body.kelPraktek
    const kodeGabung = req.body.kodeGabung
    const semester = req.body.semester
    const major = req.body.major
    const campus = req.body.campus
    const kodeDosen = req.body.kodeDosen
    const timeZoneMasuk = new Date(req.body.timeZoneMasuk)
    const timeZoneKeluar = new Date(req.body.timeZoneKeluar)

    const post = new jadwalKuliah({
        matakuliah: matakuliah,
        hari: hari,
        jamMasuk: jamMasuk,
        jamKeluar: jamKeluar,
        noRuang: noRuang,
        kelas: kelas,
        kodeMTK: kodeMTK,
        sks: sks,
        kelPraktek: kelPraktek,
        kodeGabung: kodeGabung,
        semester: semester,
        major: major,
        campus: campus,
        kodeDosen: kodeDosen,
        timeZoneMasuk: timeZoneMasuk,
        timeZoneKeluar: timeZoneKeluar,
        path: await bcrypt.hash(`${timeNow}`, salt),
        absensi: [],
        ruangDiskusi: [],
        ruangMateri: [],
        ruangTugas: []
    })

    post.save()
        .then(result => {
            res.status(201).json({
                message: 'data matakuliah berhasil di tambah',
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.dataCardAbsen = (req, res, next) => {
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

    const data = {
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

    jadwalKuliah.updateOne(
        { _id: _id },
        { $push: { absensi: data } },
        { upsert: true }
    ).then(result => {
        res.status(201).json({
            message: 'berhasil post data-card-absen',
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
    const created = req.body.created
    const dataAbsen = []

    const data = {
        id: id,
        created: created,
        tanggal: tanggal,
        matakuliah: matakuliah,
        pertemuan: pertemuan,
        rangkuman: rangkuman,
        beritaAcara: beritaAcara,
        dataAbsen: dataAbsen
    }

    jadwalKuliah.updateOne(
        { _id: _id },
        { $push: { absensi: data } },
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
    const noAbsen = req.body.noAbsen
    const message = req.body.message
    const komplain = req.body.komplain
    const pertemuan = req.params.pertemuan

    const data = {
        nim: nim,
        name: name,
        noAbsen: noAbsen,
        comment: {
            message: message,
            komplain: komplain
        }
    }

    const updateDocument = {
        $push: { "absensi.$[item].dataAbsen": data },
        upsert: true
    }

    const options = {
        arrayFilters: [
            {
                "item.pertemuan": pertemuan
            }
        ]
    }

    jadwalKuliah.updateOne({ _id: _id }, updateDocument, options)
        .then(result => {
            res.status(201).json({
                message: 'mhs berhasil absen',
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.allMatakuliah = (req, res, next) => {
    let totalItems;

    jadwalKuliah.find()
        .countDocuments()
        .then(count => {
            totalItems = count
            return jadwalKuliah.find()
        })
        .then(result => {
            res.status(200).json({
                message: 'data jadwal kuliah berhasil di dapatkan',
                data: result,
                total_data: totalItems
            })
        })
        .catch(err => {
            next(err)
        })
}

exports.oneMatkul = (req, res, next) => {
    const path = req.params.path

    jadwalKuliah.findOne({ _id: path })
        .then(result => {
            res.status(200).json({
                message: 'data absensi di dapatkan',
                data: result
            })
        })
        .catch(err => next(err))
}

exports.materiTambahan = (req, res, next) => {
    const _id = req.params._id
    const number = 1
    const kodeMTK = req.body.kodeMTK
    const kelas = req.body.kelas
    const judul = req.body.judul
    const deskripsi = req.body.deskripsi
    const file = req.body.file
    const update = req.body.update
}