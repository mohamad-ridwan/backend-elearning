exports.get = (req, res, next) => {
    res.status(200).json({
        error: null,
        data: {
            message: 'user telah terverifikasi',
            user: req.user
        }
    })
}