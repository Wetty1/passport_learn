const User = require('./../../model/User')

module.exports = (req, res) => {
    return res.render('users/new', {
        user: new User()
    })
}