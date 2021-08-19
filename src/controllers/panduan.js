const panduan = require('../models/panduan')

exports.post = (req, res, next) => {
    const id = req.body.id
    const name = req.body.name
    const icon = req.body.icon
    const youtube = req.body.youtube
    const file = req.file.path

    const post = new panduan({
        id: id,
        name: name,
        icon: icon,
        youtube: youtube,
        image: file
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

    panduan.find()
        .countDocuments()
        .then(count => {
            totalItems = count
            return panduan.find()
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