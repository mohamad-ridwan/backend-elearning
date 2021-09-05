const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
const dotenv = require('dotenv')
const cors = require('cors')

const app = express()

app.use(cors())

dotenv.config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const userRoutes = require('./src/routes/user')
const logowebRoutes = require('./src/routes/logoweb')
const panduanRoutes = require('./src/routes/panduan')
const jadwalKuliahRoutes = require('./src/routes/jadwalkuliah')
const dashboardRoutes = require('./src/routes/dashboard')
const verifikasiToken = require('./src/routes/validate-token')

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, 'E-learning' + '-' + `${new Date().getTime()}` + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(multer({ storage: fileStorage }).single('image'))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credential", "true")
    res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept, accessToken");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
})

app.use('/v1/users', userRoutes)
app.use('/v2/logoweb', logowebRoutes)
app.use('/v3/panduan', panduanRoutes)
app.use('/v4/jadwal-kuliah', jadwalKuliahRoutes)
app.use('/v5/dashboard', verifikasiToken, dashboardRoutes)

app.use((error, req, res, next) => {
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
})

const PORT = process.env.PORT || 6300

mongoose.connect('mongodb+srv://ridwan:ugELM2oeKdlMmVR9@cluster0.mtciq.mongodb.net/elearning?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => {
        app.listen(PORT, () => console.log(`Server connect on ${PORT}`))
    })
    .catch((err) => console.log(err))