const express = require('express')
const router = express.Router()

module.exports = (passport) => {
     router.get('/new',require('./new'))
     router.get('/',require('./all'))
     router.post('/', passport.authenticate('local-signup', {
          sucessRedirect: '/',
          failureRedirect: '/users'
     }))
     //router.post('/', require('./create'))
     router.delete('/:id', require('./remove'))
     
     return router
}