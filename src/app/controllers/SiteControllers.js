class SiteControllers {
    index(req, res) {
        res.render('home')
    }   
}

module.exports = new SiteControllers