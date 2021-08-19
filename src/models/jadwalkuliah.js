const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jadwalKuliah = new Schema({
    id: {
        type: String
    },
    matakuliah: {
        type: String
    },
    hari: {
        type: String
    },
    jamMasuk: {
        type: String
    },
    jamKeluar: {
        type: String
    },
    noRuang: {
        type: String
    },
    kelas: {
        type: String
    },
    kodeMTK: {
        type: String
    },
    kelPraktek: {
        type: String
    },
    kodeGabung: {
        type: String
    },
    semester: {
        type: String
    },
    major: {
        type: String
    },
    campus: {
        type: String
    },
    kodeDosen: {
        type: String
    },
    path: {
        type: String
    },
    timeZoneMasuk: {
        type: String
    },
    timeZoneKeluar: {
        type: String
    },
    absensi: {
        type: Array
    },
    ruangDiskusi: {
        type: Array
    },
    ruangMateri: {
        type: Array
    },
    ruangTugas: {
        type: Array
    },
    sks: {
        type: String
    },
    created: {
        type: String
    },
    noAbsen: {
        type: String
    },
    message: {
        type: String
    },
    komplain: {
        type: String
    },
    dataNilaiTugas: {
        type: Array
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('jadwal-kuliah', jadwalKuliah)