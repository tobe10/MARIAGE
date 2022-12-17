const multer = require('multer')
const express = require('express')
const router = express.Router()
const passport = require('passport')
const storage = require('./config.js')
const upload = multer({ storage: storage })

const { homeControl, imgControl, loginController,
    registerSubmit, protectedRoute, registerController,
    logoutController, getLogout, showImages } = require('./controler/controler')

// get routes
router.get('/', homeControl)
router.get('/protected-route', protectedRoute)
router.get('/login', loginController)
router.get('/register', registerController)
router.get('/logout', getLogout)
router.get('/images', showImages)

//post routes
router.post('/logout', logoutController)
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/' }))
router.post('/register', registerSubmit)

router.post('/upload', upload.array('file', 12), imgControl)
module.exports = router