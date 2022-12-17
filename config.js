const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './my-uploads')
    },
    filename: function (req, file, cb) {
        const extension = file.originalname.split('.')[1]
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension)
    }
})


module.exports = storage
