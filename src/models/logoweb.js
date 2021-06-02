const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const logoweb = new Schema({
    image: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('logoweb', logoweb)