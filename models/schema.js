const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    pays: {
        type: String,
        // required: true,
    },
    nom: {
        type: String,

    },
    nom_partenaire: {
        type: String,

    },
    titre: {
        type: String
    },
    message: {
        type: String
    },

    img:
    {

        type: String
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    userId: {
        type: String,

    }

})

module.exports = mongoose.model("File", schema)