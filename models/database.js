const mongoose = require('mongoose')

const con = () => {
    try {
        mongoose.connect('mongodb://0.0.0.0:27017/Uploader')
            .then(console.log('connexion établie'))
    }

    catch (e) {
        console.log('e')
        process.exit(1)
    }
}

module.exports = con;