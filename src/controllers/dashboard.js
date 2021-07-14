
exports.get = (req, res, next) => {
    res.status(200).json({
        error: null,
        data: {
            message: 'user berhasil masuk ke page dengan token yang valid',
            user: req.user
        }
    })
}