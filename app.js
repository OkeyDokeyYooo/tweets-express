const express = require('express')
const app = express()
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const LocalStrategy = require('passport-local').Strategy
const Tweets = require('./models/tweets')
const port = process.env.PORT || 8080
const url = 'mongodb+srv://allen:k9kBdyFT6UAxLoMy@hackhub-on08q.mongodb.net/test?retryWrites=true&w=majority'

app.use(session({
    secret: 'webdxd',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false}
}))
app.use(passport.initialize())
app.use(passport.session())

require('./passport')

app.locals.moment = require('moment');

mongoose.connect(url)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(logger('dev'))

app.use((req, res, next) => {
    res.locals.user = req.user
    next()
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use((err, req, res, next) => {
    Tweets.find({} , (err, tweets) => {
        res.locals.tweets = tweets
        next()
    })
})


const index = require('./routes/index')
const profile = require('./routes/profile')

app.use('/', index)
app.use('/profile', profile)

// app.use((req, res, next) => {
//     const err = new Error('Page Not Found')
//     err.status = 404
//     next(err)
// })

// app.use((err, req, res, next) => {
//     res.send(err.message)
// })

app.listen(port, () => console.log("http://localhost:8080/"))