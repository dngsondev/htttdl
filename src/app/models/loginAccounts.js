const connection = require('../../db/db')
// http://localhost:3000/login/auth

function login(username, password, callback) {
    connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', 
        [username, password], callback
    );
}

module.exports = login