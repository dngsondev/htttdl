const connection = require('../../db/db');

// Hàm thêm cửa hàng vào cơ sở dữ liệu
function addMarker(name, address, lat, lng, image, description, callback) {
    const query = 'INSERT INTO cuahang (tenCH, diachi, kinhdo, vido, hinhanh, mota) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(query, [name, address, lat, lng, image, description], callback);
}

module.exports = addMarker;
