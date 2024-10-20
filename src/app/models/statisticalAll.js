const session = require('express-session');
const connection = require('../../db/db')

function statisticalAll(callback) {
    connection.query('SELECT maCH, tenCH FROM cuahang', callback);
}


module.exports = statisticalAll