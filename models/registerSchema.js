const mongoose = require('mongoose')
const registerschema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    salt: String
})

module.exports = mongoose.model('User', registerschema)