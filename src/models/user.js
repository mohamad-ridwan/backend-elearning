const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    image: {
        type: String
    },
    password: {
        type: String
    },
    nim: {
        type: String
    },
    class: {
        type: String
    },
    campus: {
        type: String
    },
    major: {
        type: String
    },
    token: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('user', user)