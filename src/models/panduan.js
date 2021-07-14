const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const panduan = new Schema({
    id: {
        type: String
    },
    name: {
        type: String
    },
    icon: {
        type: String
    },
    link: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('panduan', panduan)