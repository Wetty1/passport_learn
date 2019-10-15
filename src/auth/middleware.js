module.exports = (req, res, next) => {
    if(req.isAuthenticated()){
        console.log("Autenticado")
        return next()
    }
    console.log("Não autenticado")
    return res.redirect('/auth')
}