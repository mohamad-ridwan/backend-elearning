const tokendb = require('../models/tokendb')

exports.post = (req, res, next)=>{
    const name = req.body.name
    const email = req.body.email
    const tokenVerifikasi = req.body.tokenVerifikasi
    const tokenUser = req.body.tokenUser

    const post = new tokendb({
        name: name,
        email: email,
        tokenVerifikasi: tokenVerifikasi,
        tokenUser: tokenUser
    })

    post.save()
    .then(result=>{
        res.status(201).json({
            message: 'token verifikasi telah berhasil di tambah',
            data: result
        })
    })
    .catch(err=>console.log(err))
}

exports.delete = (req, res, next)=>{
    const tokenVerifikasi = req.body.tokenVerifikasi

    tokendb.deleteOne({
        tokenVerifikasi: tokenVerifikasi
    })
    .then(result => {
        res.status(200).json({
            message: `token berhasil di hapus`,
        })
    })
    .catch(err => console.log(err))
}

exports.deleteMany = (req, res, next)=>{
    const email = req.body.email

    tokendb.deleteMany({
        email: email
    })
    .then(result => {
        res.status(200).json({
            message: `semua token dari user ${email} berhasil di hapus!`,
        })
    })
    .catch(err => console.log(err))
}

exports.get = (req, res, next)=>{
    let totalItems;

    tokendb.find()
        .countDocuments()
        .then(count => {
            totalItems = count
            return tokendb.find()
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