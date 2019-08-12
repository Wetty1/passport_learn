const User = require('./../../model/User')

module.exports = (req, res) => {
     let user = new User(req.body)
     user.password = user.genHash(user.password)

     User
          .create(req.body)
          .then((user) => {
               return res.redirect('/')
          }).catch((error) => {
               console.log(error)
               return;
          })

}