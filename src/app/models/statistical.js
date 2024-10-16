const session = require('express-session');
const connection = require('../../db/db')

function statisticalCH(maCH, startDate, endDate, callback) {
    connection.query('SELECT h.soHD, n.tenNV, h.maKH, h.ngaylapHD, ch.tenCH, hh.tenHH, c.slCTHD, c.giaHH FROM hoadon h, chitiethoadon c, nhanvien n, hanghoa hh, cuahang ch WHERE ch.maCH = h.maCH and c.maHH = hh.maHH and h.soHD = c.soHD and h.maNV = n.maNV and ngaylapHD BETWEEN ? AND ? AND h.maCH = ?', [startDate, endDate, maCH], callback);
}


module.exports = statisticalCH