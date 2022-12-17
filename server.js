const express = require('express')
const app = express()
const session = require('express-session')
const { format, nextDay } = require('date-fns')
//const { genPassword, validPassword } = require('./Authentification/passwordUtils')

//const logEvents = require('./middlware/logger');
//const logger = require('./middlware/logger');
const passport = require('passport');
require('./Authentification/passport')



const PORT = process.env.PORT || 3000
// middlwares
//app.use(logger)
app.use('/', express.static('my-uploads'))
app.use('/upload', express.static('my-uploads'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
//connect to database
const con = require('./models/database')()

// setting the store for session
const MongoStore = require('connect-mongo')

// setting sessions
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://0.0.0.0:27017/Uploader' }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
    }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use('/', require('./routes'));


//routes
app.listen(PORT, () => console.log(`server  running at ${PORT}`))

