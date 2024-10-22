const connection = require('../../db/db');

function updateMarker(name, address, image, description, maCH, callback) {
    const query = 'UPDATE cuahang c SET c.tenCH = ?, c.diachi = ?, c.hinhanh = ?, c.mota = ? WHERE c.maCH = ?';
    connection.query(query, [name, address, image, description, maCH], callback);

}

module.exports = updateMarker;