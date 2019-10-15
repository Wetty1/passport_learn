module.exports = (req, res) => {
     //return res.json({ msg: 'Hello express'})
     return res.render('main/index', {
          user: req.user || null
     } )
}