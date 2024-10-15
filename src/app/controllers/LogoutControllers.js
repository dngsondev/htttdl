class LogoutControllers {
    logout(req, res) {
        req.session.destroy()
        res.redirect('/')
    }
}

module.exports = new LogoutControllers