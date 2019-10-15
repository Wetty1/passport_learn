const mongoose = require('mongoose')
require('./../../model/User')
const User = mongoose.model('user')

module.exports = (req, res) => {
     let user = new User(req.body)
     user.password = user.genHash(user.password)

     User
          .create(req.body)
          .then((user) => {
               console.log(user)
               return res.redirect('/')
          }).catch((error) => {
               console.log(error)
               return;
          })

}