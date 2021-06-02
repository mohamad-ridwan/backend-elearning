const logoweb = require('../models/logoweb')

exports.post = (req, res, next) => {
    const image = req.file.path

    const post = new logoweb({
        image: image
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

    logoweb.find()
        .countDocuments()
        .then(count => {
            totalItems = count
            return logoweb.find()
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