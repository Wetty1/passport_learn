const User = require('./../../model/User')

module.exports = (req, res) => {
     User
          .find({})
          .then((users) => {
               return res.render('users/index', {
                    users: users
               })
          })
          .catch((error) => {
               console.log(error)
          })
} 