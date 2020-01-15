const express = require('express')
const app = express()
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const path = require('path')
const tweets = require('./tweets');
const port = 8080

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(logger('dev'))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use((err, req, res, next) => {
    res.send(err.message)
})

app.locals.moment = require('moment');

const index = require('./routes/index')
const profile = require('./routes/profile')

app.use('/', index)
app.use('/profile', profile)

app.listen(port, () => console.log("http://localhost:8080/"))