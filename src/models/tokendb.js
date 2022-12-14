const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tokendb = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String
    },
    tokenVerifikasi: {
        type: String
    },
    tokenUser: {
        type: String
    }
},{
    timestamps: true
})

module.exports = mongoose.model('tokendb', tokendb)