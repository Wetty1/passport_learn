const LocalStrategy = require('passport-local')
const mongoose = require('mongoose')
const User = require('./../model/User')

module.exports = (passport) => {
     passport.serializeUser((user, cb) => {
          return cb(null, user._id)
     })

     passport.deserializeUser((id, cb) => {
          User.findById(id)
          .then(user => cb(null, user))
          .catch(error => cb(error, {}))
     })

     passport.use('local-signup', new LocalStrategy({
          usernameField: 'username',
          passwordField: 'password',
          passReqToCallback: true
     },
     function (req, username, password, cb) {
          User.findOne({username: username}).then((userExit) => {
               if(!userExit) {
                    let user = new User({
                         name:req.body.name,
                         username:req.body.username,
                         email: req.body.email,
                         password: req.body.password
                    })
                    user.password = user.genHash(user.password)
                    
                    console.log('Usuario: ', user)
                    return user.save()
                         .then((userX) => {
                              console.log('Enviado pro banco:')
                              return cb(null, userX)
                         })
                         .catch((error) => {
                              console.error('errozão bolado', error)
                              return cb(error)
                         })
               }
               return cb(null, false)
          }).catch((error) => {
               return cb(error, false)
          })
     }))

     passport.use('local-signin', new LocalStrategy({
          usernameField: 'username',
          passwordField: 'password',
          passReqToCallback: true
     },
          function (req, username, password, cb) {
               User.findOne({username}).then((user) => {
                    if(!user) {
                         console.error('Não encontrado!')
                         return cb(null, false)
                    }
                    user.valid(password, (err, result) => {
                         if(!result || err) {
                              console.error('Erro na senha!')
                              return cb(null, false)
                         }
                         console.log("logado")
                         return cb(null, user)
                    })
               })
          }
     ))
}