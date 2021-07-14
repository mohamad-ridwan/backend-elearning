const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const absensi = new Schema({
    statusAbsen: {
        type: String
    },
    tanggal: {
        type: String
    },
    matakuliah: {
        type: String
    },
    pertemuan: {
        type: String
    },
    rangkuman: {
        type: String
    },
    beritaAcara: {
        type: String
    },
    campus: {
        type: String
    },
    class: {
        type: String
    },
    major: {
        type: String
    },
    dosen: {
        type: String
    },
    semester: {
        type: String
    },
    path: {
        type: String
    },
    absen: {
        type: Array
    },
    dataAbsen: {
        type: Array
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('absensi', absensi)