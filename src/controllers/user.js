const user = require('../models/user')

const getToken = new Date().getTime()

exports.post = (req, res, next) => {
    const name = req.body.name
    const email = req.body.email
    const image = req.file.path
    const password = req.body.password
    const nim = req.body.nim
    const kelas = req.body.class
    const campus = req.body.campus
    const major = req.body.major
    const token = getToken

    const post = new user({
        name: name,
        email: email,
        image: image,
        password: password,
        nim: nim,
        class: kelas,
        campus: campus,
        major: major,
        token: token
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

exports.get = (req, res, next) => {
    let totalItems;

    user.find()
        .countDocuments()
        .then(count => {
            totalItems = count
            return user.find()
        })
        .then(result => {
            res.status(200).json({
                message: 'data di dapatkan',
                data: result,
                total_data: totalItems
            })
        })
        .catch(err => {
            next(err)
        })
}