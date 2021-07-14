const jwt = require('jsonwebtoken')

const verifikasiToken = (req, res, next) => {
    const token = req.header("accessToken");

    if (!token) {
        return res.status(401).json({
            error: 'Akses ditolak'
        })
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ error: 'token tidak valid' })
    }
};

module.exports = verifikasiToken;