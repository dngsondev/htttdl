// const lg = require('../models/loginAccounts')
const accountsSes = require('../models/loginAccounts')
class LoginControllers {
    // index(req, res) {
    //     // res.render('login')

    //     if (req.session.loggedin) {
    //         // Truyền username từ session vào view
    //         // res.render('home', { username: 'Xin chao ' + req.session.username });
    //         res.render('map');
    //     } else {
    //         res.render('login');
    //     }

    // }

    login(req, res) {
        accountsSes(req, res)
    }
}

module.exports = new LoginControllers