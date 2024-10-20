const connection = require('../../db/db')

function deleteMarker(maCH, callback) {
    connection.query('delete from cuahang where maCH = ?', [maCH], callback);
}

module.exports = deleteMarker