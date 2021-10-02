const jadwalKuliah = require('../models/jadwalkuliah')

exports.matakuliah = (req, res, next) => {
    const id = req.body.id
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
        id: id,
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
        absensi: [],
        ruangDiskusi: [],
        ruangMateri: [],
        ruangTugas: [],
        dataNilaiTugas: []
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
    // example input data
    // 1. dosen : Dosen ~ AIN ~ fas fa-user-circle
    // 2. matakuliah : Matakuliah ~ MATEMATIKA DISKRIT ~ fas fa-book
    // 3. jamMasuk : Jam Masuk ~ 07:30 ~ fas fa-clock
    // 4. jamKeluar : Jam Keluar ~ 10:00 ~ far fa-clock
    // 5. ruang : Ruang ~ 406-D2 ~ fas fa-home
    // 6. kelas : Kelas ~ 15.2A.01 ~ fas fa-dice-d6
    // 7. hari : Hari ~ Kamis ~ far fa-calendar-alt
    // 8. kodeMTK : Kode MTK ~ 896 ~ fas fa-edit

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

exports.jadwalAbsen = async (req, res, next) => {
    const _id = req.params._id

    const getDocument = await jadwalKuliah.findOne({ _id: _id })
    const getJadwalAbsen = getDocument.absensi.filter((e) => e.id === 'jadwal-absen')

    const id = req.body.id
    const number = `${getJadwalAbsen.length + 1}`
    const tanggal = req.body.tanggal
    const matakuliah = req.body.matakuliah
    const pertemuan = req.body.pertemuan
    const rangkuman = req.body.rangkuman
    const beritaAcara = req.body.beritaAcara
    const dataAbsen = []

    const data = {
        id: id,
        number: number,
        statusAbsen: ' ',
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

exports.ruangMateri = (req, res, next) => {
    const _id = req.params._id
    const id = req.body.id

    const data = {
        id: id,
        data: []
    }

    jadwalKuliah.updateOne(
        { _id: _id },
        { $push: { ruangMateri: data } },
        { upsert: true }
    )
        .then(result => {
            res.status(201).json({
                message: 'data ruang materi berhasil di post',
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.materiTambahan = async (req, res, next) => {
    const _id = req.params._id

    const getUser = await jadwalKuliah.findOne({ _id: _id })
    const getMateriTambahan = getUser.ruangMateri.filter((e) => e.id === 'materi-tambahan')

    const id = req.params.id
    const number = `${getMateriTambahan[0].data.length + 1}`
    const kodeMTK = req.body.kodeMTK
    const kelas = req.body.kelas
    const judul = req.body.judul
    const deskripsi = req.body.deskripsi
    const file = req.file.path
    const update = req.body.update

    const data = {
        number: number,
        kodeMTK: kodeMTK,
        kelas: kelas,
        judul: judul,
        deskripsi: deskripsi,
        image: file,
        update: update
    }

    const updateDocument = {
        $push: { "ruangMateri.$[property].data": data },
        upsert: true
    }

    const options = {
        arrayFilters: [
            {
                "property.id": id
            }
        ]
    }

    jadwalKuliah.updateOne({ _id: _id }, updateDocument, options)
        .then(result => {
            res.status(201).json({
                message: 'data materi tambahan berhasil di post',
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.videoPembelajaran = (req, res, next) => {
    const _id = req.params._id
    const id = req.params.id
    const linkEmbedYoutube = req.body.linkEmbedYoutube
    const title = req.body.title
    const date = req.body.date
    const deskripsi = req.body.deskripsi

    const data = {
        linkEmbedYoutube: linkEmbedYoutube,
        title: title,
        date: date,
        deskripsi: deskripsi
    }

    const updateDocument = {
        $push: { "ruangMateri.$[property].data": data },
        upsert: true
    }

    const options = {
        arrayFilters: [
            {
                "property.id": id
            }
        ]
    }

    jadwalKuliah.updateOne({ _id: _id }, updateDocument, options)
        .then(result => {
            res.status(201).json({
                message: 'data video pembelajaran berhasil di post',
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.slidePembelajaran = (req, res, next) => {
    const _id = req.params._id
    const id = req.params.id
    const icon = req.body.icon
    const image = req.file.path
    const name = req.body.name

    const data = {
        icon: icon,
        image: image,
        name: name
    }

    const updateDocument = {
        $push: { "ruangMateri.$[property].data": data },
        upsert: true
    }

    const options = {
        arrayFilters: [
            {
                "property.id": id
            }
        ]
    }

    jadwalKuliah.updateOne({ _id: _id }, updateDocument, options)
        .then(result => {
            res.status(201).json({
                message: 'data slide pembelajaran berhasil di post',
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.ruangTugas = async (req, res, next) => {
    const _id = req.params._id

    const getDocument = await jadwalKuliah.findOne({ _id: _id })

    const number = `${getDocument.ruangTugas.length + 1}`
    const kodeMTK = req.body.kodeMTK
    const kelas = req.body.kelas
    const judul = req.body.judul
    const deskripsi = req.body.deskripsi
    const pertemuan = req.body.pertemuan
    const mulai = req.body.mulai
    const selesai = req.body.selesai
    const created = req.body.created
    const aksi = req.file.path

    const data = {
        number: number,
        kodeMTK: kodeMTK,
        kelas: kelas,
        judul: judul,
        deskripsi: deskripsi,
        pertemuan: pertemuan,
        mulai: mulai,
        selesai: selesai,
        created: created,
        image: aksi
    }

    jadwalKuliah.updateOne(
        { _id: _id },
        { $push: { ruangTugas: data } },
        { upsert: true }
    )
        .then(result => {
            res.status(201).json({
                message: 'data ruang tugas berhasil di post',
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.postDataNilaiTugas = async (req, res, next) => {
    const _id = req.params._id
    const name = req.body.name
    const nim = req.body.nim

    const getDocument = await jadwalKuliah.findOne({ _id: _id })
    const numberOfLength = getDocument.dataNilaiTugas.filter((e) => e.name === name && e.nim == nim)

    const id = req.body.id
    const kelas = req.body.kelas
    const pertemuan = req.body.pertemuan
    const number = `${numberOfLength.length + 1}`
    const kodeMTK = req.body.kodeMTK
    const judul = req.body.judul
    const linkTugas = req.body.linkTugas
    const komentarDosen = req.body.komentarDosen
    const nilai = req.body.nilai
    const created = req.body.created
    const updated = req.body.updated

    const data = {
        id: id,
        name: name,
        nim: nim,
        kelas: kelas,
        pertemuan: pertemuan,
        dataTugas: {
            number: number,
            kodeMTK: kodeMTK,
            judul: judul,
            linkTugas: linkTugas,
            komentarDosen: komentarDosen,
            nilai: nilai,
            created: created,
            updated: updated,
        }
    }

    jadwalKuliah.updateOne(
        { _id: _id },
        { $push: { dataNilaiTugas: data } },
        { upsert: true }
    )
        .then(result => {
            res.status(201).json({
                message: 'data nilai tugas berhasil di tambahkan',
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.ruangDiskusi = (req, res, next) => {
    const _id = req.params._id
    const id = new Date().getTime();
    const judul = req.body.judul
    const body = req.body.body
    const name = req.body.name
    const nim = req.body.nim
    const kelas = req.body.kelas
    const gmail = req.body.gmail
    const date = req.body.date
    const file = req.file && req.file.path ? req.file.path : ' '

    const data = {
        id: `${id}`,
        judul: judul,
        body: body,
        author: {
            name: name,
            nim: nim,
            kelas: kelas,
            gmail: gmail
        },
        image: file,
        date: date,
        komentar: []
    }

    jadwalKuliah.updateOne(
        { _id: _id },
        { $push: { ruangDiskusi: data } },
        { upsert: true }
    )
        .then(result => {
            res.status(201).json({
                message: 'data ruang diskusi berhasil di post',
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.komentarDiskusi = (req, res, next) => {
    const _id = req.params._id
    const id = req.params.id

    const message = req.body.message
    const color = req.body.color
    const name = req.body.name
    const nim = req.body.nim
    const kelas = req.body.kelas
    const gmail = req.body.gmail
    const image = req.body.image
    const date = req.body.date

    const data = {
        message: message,
        color: color,
        author: {
            name: name,
            nim: nim,
            kelas: kelas,
            gmail: gmail,
            image: image
        },
        date: date
    }

    const updateDocument = {
        $push: { "ruangDiskusi.$[property].komentar": data },
        upsert: true
    }

    const options = {
        arrayFilters: [
            { "property.id": id }
        ]
    }

    jadwalKuliah.updateOne({ _id: _id }, updateDocument, options)
        .then(result => {
            res.status(201).json({
                message: 'komentar ruang diskusi berhasil di post',
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.putDataNilaiTugas = async (req, res, next) => {
    const _id = req.params._id
    const id = req.params.id

    const getDocument = await jadwalKuliah.findOne({ _id: _id })
    const getDataNilaiTugas = getDocument.dataNilaiTugas.filter((e) => e.id == id)

    const number = getDataNilaiTugas[0].dataTugas.number
    const kodeMTK = getDataNilaiTugas[0].dataTugas.kodeMTK
    const judul = getDataNilaiTugas[0].dataTugas.judul
    const linkTugas = getDataNilaiTugas[0].dataTugas.linkTugas
    const komentarDosen = req.body.komentarDosen
    const nilai = req.body.nilai
    const created = getDataNilaiTugas[0].dataTugas.created
    const updated = req.body.updated

    const data = {
        number: number,
        kodeMTK: kodeMTK,
        judul: judul,
        linkTugas: linkTugas,
        komentarDosen: komentarDosen,
        nilai: nilai,
        created: created,
        updated: updated
    }

    const updateDocument = {
        $set: { "dataNilaiTugas.$[property].dataTugas": data }
    }

    const options = {
        arrayFilters: [
            {
                "property.id": id
            }
        ]
    }

    jadwalKuliah.updateOne({ _id: _id }, updateDocument, options)
        .then(result => {
            res.status(201).json({
                message: 'data nilai tugas berhasil di update',
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.putTimeZone = (req, res, next) => {
    const _id = req.params._id

    const hari = req.body.hari
    const timeZoneMasuk = new Date(req.body.timeZoneMasuk)
    const timeZoneKeluar = new Date(req.body.timeZoneKeluar)

    jadwalKuliah.findById(_id)
        .then(post => {
            if (!post) {
                const err = new Error('data tidak ada')
                err.errorStatus = 404;
                throw err;
            }

            post.hari = hari
            post.timeZoneMasuk = timeZoneMasuk
            post.timeZoneKeluar = timeZoneKeluar

            return post.save()
        })
        .then(result => {
            res.status(201).json({
                message: 'berhasil update timeZone',
                data: result
            })
        })
        .catch(err => next(err))
}

exports.putAuthorKomentar = (req, res, next) => {
    const id = req.params.id
    const image = req.body.image

    const updateDocument = {
        $set: { "ruangDiskusi.$[property].komentar.$[author].author.image": image }
    }

    const options = {
        arrayFilters: [
            { "property.komentar.author.nim": id },
            { "author.author.nim": id }
        ]
    }

    jadwalKuliah.updateMany({}, updateDocument, options)
        .then(result => {
            res.status(201).json({
                message: 'image author user pada komentar berhasil di update',
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.deleteRuangDiskusi = (req, res, next) => {
    const _id = req.params._id
    const id = req.params.id

    jadwalKuliah.updateOne(
        { _id: _id },
        { $pull: { ruangDiskusi: { id: id } } },
        { upsert: true }
    )
        .then(result => {
            res.status(200).json({
                message: 'forum ruang diskusi berhasil di hapus!',
                data: result
            })
        })
        .catch(err => console.log(err))
}