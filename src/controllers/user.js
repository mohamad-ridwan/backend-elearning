const user = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.post = async (req, res, next) => {

    const salt = await bcrypt.genSalt(10);

    const name = req.body.name
    const email = req.body.email
    const image = req.file.path
    const password = await bcrypt.hash(req.body.password, salt)
    const nim = req.body.nim
    const kelas = req.body.class
    const campus = req.body.campus
    const major = req.body.major
    const statusSemester = req.body.statusSemester
    const noAbsen = req.body.noAbsen

    const post = new user({
        name: name,
        email: email,
        image: image,
        password: password,
        nim: nim,
        class: kelas,
        campus: campus,
        major: major,
        statusSemester: statusSemester,
        noAbsen: noAbsen
    })

    post.save()
        .then(result => {
            res.status(201).json({
                message: 'data user/mhs berhasil di tambah',
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.login = async (req, res, next) => {

    const getUser = await user.findOne({ nim: req.body.nim })

    if (!getUser) {
        return res.status(400).json({ error: 'Nim is wrong' })
    }

    const validPassword = await bcrypt.compare(req.body.password, getUser.password)

    if (!validPassword) {
        return res.status(400).json({
            error: 'Password is wrong'
        })
    }

    const token = jwt.sign({
        data: {
            _id: getUser._id,
            name: getUser.name,
            email: getUser.email,
            image: getUser.image,
            nim: getUser.nim,
            class: getUser.class,
            campus: getUser.campus,
            major: getUser.major,
            statusSemester: getUser.statusSemester,
            noAbsen: getUser.noAbsen
        }
    }, process.env.TOKEN_SECRET, { expiresIn: '1h' })

    res.header("accessToken", token).json({
        error: null,
        data: {
            token
        }
    })
}

exports.forgotPassword = async (req, res, next) => {
    const getUser = await user.findOne({ email: req.body.email })

    if (!getUser) {
        return res.status(400).json({ error: 'Email tidak terdaftar pada sistem!' })
    }

    const token = jwt.sign({
        data: {
            email: getUser.email
        }
    }, process.env.TOKEN_SECRET, { expiresIn: '1h' })

    res.header("accessToken", token).json({
        error: null,
        data: {
            token
        }
    })
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

exports.putInformasiProfile = (req, res, next) => {
    const image = req.file.path
    const email = req.body.email
    const putId = req.params.putId

    user.findById(putId)
        .then(post => {
            if (!post) {
                const err = new Error('data tidak ada')
                err.errorStatus = 404;
                throw err;
            }

            post.image = image
            post.email = email

            return post.save()
        })
        .then(result => {
            const token = jwt.sign({
                data: {
                    _id: result._id,
                    name: result.name,
                    email: result.email,
                    image: result.image,
                    nim: result.nim,
                    class: result.class,
                    campus: result.campus,
                    major: result.major,
                    statusSemester: result.statusSemester,
                    noAbsen: result.noAbsen
                }
            }, process.env.TOKEN_SECRET, { expiresIn: '1h' })

            res.header("accessToken", token).json({
                error: null,
                data: {
                    token
                }
            })
        })
        .catch(err => next(err))
}

exports.putEmailOnly = (req, res, next) => {
    const email = req.body.email
    const putId = req.params.putId

    user.findById(putId)
        .then(post => {
            if (!post) {
                const err = new Error('data tidak ada')
                err.errorStatus = 404;
                throw err;
            }

            post.email = email

            return post.save()
        })
        .then(result => {
            const token = jwt.sign({
                data: {
                    _id: result._id,
                    name: result.name,
                    email: result.email,
                    image: result.image,
                    nim: result.nim,
                    class: result.class,
                    campus: result.campus,
                    major: result.major,
                    statusSemester: result.statusSemester,
                    noAbsen: result.noAbsen
                }
            }, process.env.TOKEN_SECRET, { expiresIn: '1h' })

            res.header("accessToken", token).json({
                error: null,
                data: {
                    token
                }
            })
        })
        .catch(err => next(err))
}

exports.putUpdatePassword = async (req, res, next) => {
    const salt = await bcrypt.genSalt(10);

    const putId = req.params.putId

    const getUser = await user.findOne({ _id: putId })

    const validCurrentPassword = await bcrypt.compare(req.body.currentPassword, getUser.password)

    const newPassword = await bcrypt.hash(req.body.newPassword, salt)
    const confirmPassword = await bcrypt.hash(req.body.confirmPassword, salt)

    if (!validCurrentPassword) {
        return res.status(400).json({ error: 'current password is wrong' })
    } else {
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ error: 'confirm password must be the same' })
        } else {
            user.findById(putId)
                .then(post => {
                    if (!post) {
                        const err = new Error('data tidak ada')
                        err.errorStatus = 404;
                        throw err;
                    }

                    post.password = confirmPassword

                    return post.save()
                })
                .then(result => {
                    const token = jwt.sign({
                        data: {
                            _id: result._id,
                            name: result.name,
                            email: result.email,
                            image: result.image,
                            nim: result.nim,
                            class: result.class,
                            campus: result.campus,
                            major: result.major,
                            statusSemester: result.statusSemester,
                            noAbsen: result.noAbsen
                        }
                    }, process.env.TOKEN_SECRET, { expiresIn: '1h' })

                    res.header("accessToken", token).json({
                        error: null,
                        data: {
                            token
                        }
                    })
                })
                .catch(err => next(err))
        }
    }
}

exports.createNewPassword = async (req, res, next) => {
    const salt = await bcrypt.genSalt(10);

    const putId = req.params.putId

    const newPassword = await bcrypt.hash(req.body.newPassword, salt)
    const confirmPassword = await bcrypt.hash(req.body.confirmPassword, salt)

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ error: 'confirm password must be the same' })
    } else {
        user.findById(putId)
            .then(post => {
                if (!post) {
                    const err = new Error('data tidak ada')
                    err.errorStatus = 404;
                    throw err;
                }

                post.password = confirmPassword

                return post.save()
            })
            .catch(err => next(err))
    }
}