const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const passport = require('passport')
const mongoose = require('mongoose')
const morgan = require('morgan')
const methodOverride = require('method-override')
const session = require('express-session')

const app = express()



// CONSFIGURANDO O EXPRESS
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(methodOverride('_method'))
app.use(session({
    secret: '!@#%asdpo@#$$',
    resave: false,
    saveUninitialized: true 
})) // Antes do passport.initialize()

/** PASSPORT LOCAL */
require('./src/auth/local')(passport)
app.use(passport.initialize())
app.use(passport.session())
// CONFIGURANDO O PASSPORT
    /** PASSPORT BASIC *
        app.get('*', passport.authenticate('basic', { session: false }))
        passport.use(require('./src/auth/basic'))
    **/


require('./src/index')(app, passport)

// CONFIGURANDO O VIEW ENGINE
app.engine('handlebars', exphbs())
app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'handlebars')

// CONFIGURANDO MONGOOSE
mongoose.connect('mongodb+srv://user:user@cluster0-0v0b4.mongodb.net/PassportLearn?retryWrites=true&w=majority', { useNewUrlParser: true })
.then(() => {
    console.log('Servidor mongo conectado com sucesso!')
}).catch((error) => {
    console.error(error)
})
mongoose.Promise = global.Promise

// STARTANDO O SERVIDOR
app.listen(3000, () => {
    console.log('Express has been started')
})