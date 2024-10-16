// const lg = require('../models/loginAccounts')
const accountsSes = require('../models/loginAccounts')
class LoginControllers {

    login(request, response) {
        let username = request.body.username;
        let password = request.body.password;
        console.log(username, password);
        if (username && password) {
            accountsSes(username, password, function(error, results, fields) {
                if (error) throw error;
    
                if (results.length > 0) {
                    request.session.loggedin = true;
                    request.session.username = username;
    
                    response.redirect('/');
                } else {
                    response.send('Incorrect Username and/or Password!');
                }			
                response.end();
            })
        }
    }
}

module.exports = new LoginControllers