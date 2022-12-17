const multer = require('multer')
const bcrypt = require('bcrypt')
const File = require('../models/schema')
const registerSchema = require('../models/registerSchema')
const { genPassword } = require('../Authentification/passwordUtils')

const homeControl = (req, res) => {
    if (!req.isAuthenticated()) { return res.status(401).redirect('/login') }
    //console.log(userId)
    res.render('index')
}
//cv
const imgControl = async (req, res) => {
    const files = await req.files
    const d = req.body
    await files.map((file, index) => {
        const {
            pays,
            nom,
            nom_partenaire, titre, message
        } = d
        const data = {
            pays,
            nom,
            nom_partenaire,
            titre, message,
            img: file.filename,
            userId: req.session.passport.user
        }
        const dataCreated = new File(data)
        dataCreated.save()
            .then(console.log('Données enregistrées'))
            .catch('an error occured')
    })

    const info = '<div><h2> Images succesfully sent</h2> <a href="/images">Show images</a> </div>'
    res.send(info)
}
const showImages = (req, res) => {
    const userId = req.session.passport.user
    File.find({ userId: userId }, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('images', { files: items });
        }
    });
}
const loginController = (req, res) => {
    res.render('login')
}
const protectedRoute = (req, res) => {
    if (!req.isAuthenticated()) { return res.status(401).redirect('/login') }
    res.send('protected route')
}
const registerController = (req, res) => {
    res.render('register')
}
const logoutController = (req, res, next) => {
    req.logout(err => {
        if (err) { return next(err) }
        res.redirect('/login')
    })
}
const registerSubmit = async (req, res) => {
    const { username, password } = req.body

    const { hash, salt } = genPassword(password)
    const user = new registerSchema({
        username: username,
        hash: hash,
        salt: salt
    })
    await user.save()
        .then(res.redirect('/login'))
        .catch(console.log('Oups....something happens'))
}
const getLogout = (req, res) => {
    res.render('logout')
}


module.exports = {
    homeControl, imgControl, loginController,
    registerSubmit, registerController,
    logoutController, protectedRoute,
    getLogout, showImages
}