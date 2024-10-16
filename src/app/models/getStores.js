const connection = require('../../db/db')

function getStores(callback) {
    connection.query('SELECT * FROM cuahang', callback);
}



module.exports = getStores