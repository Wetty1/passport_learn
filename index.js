const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const passport = require('passport')
const mongoose = require('mongoose')

//O que eu esqueci
const morgan = require('morgan')
const methodOverride = require('method-override')
const session = require('express-session')

const app = express()

/** PASSPORT BASIC */
//passport.use(require('./src/auth/basic'))
//app.get('*', passport.authenticate)

// CONSFIGURANDO O EXPRESS
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// CONFIGURANDO O VIEW ENGINE
app.engine('handlebars', exphbs())
app.set('views', __dirname, 'views')
app.set('view engine', 'handlebars')

require('./src/index')(app)

// STARTANDO O SERVIDOR
app.listen(3000, () => {
    console.log('Express has been started')
})