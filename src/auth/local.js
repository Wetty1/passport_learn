const LocalStrategy = require('passport-local')
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
                    let user = new User(req.body)

                    user.password = user.genHash(user.password)

                    return user
                         .save()
                         .then((user) => {
                              return cb(null, user)
                         })
                         .catch((error) => {
                              console.error(error)
                              return cb(null)
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
                         return cb(null, false)
                    }
                    user.validate(password, (err, result) => {
                         if(!result || err) {
                              return cb(null, false)
                         }
                         console.log("logado")
                         return cb(null, user)
                    })
               })
          }
     ))
}