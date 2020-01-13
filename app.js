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

app.get('/', (req, res) => {
    res.render('index', { tweets })
})
app.get('/login', (req, res) => {
    res.render('login');
});
  
app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/profile', (req, res) => {
    res.render('profile');
});

app.get('/profile/edit', (req, res) => {
    res.render('editProfile');
});

app.listen(port, () => console.log("http://localhost:8080/"))