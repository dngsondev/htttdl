const session = require('express-session');
const connection = require('../../db/db')

function statisticalStores( startDate, endDate, maTL, callback) {
    connection.query('SELECT h.soHD, n.tenNV, h.maKH, h.ngaylapHD, ch.tenCH, hh.tenHH, c.slCTHD, c.giaHH FROM theloai tl, hoadon h, chitiethoadon c, nhanvien n, hanghoa hh, cuahang ch WHERE tl.maTL = hh.loaiHH and ch.maCH = h.maCH and c.maHH = hh.maHH and h.soHD = c.soHD and h.maNV = n.maNV and ngaylapHD BETWEEN ? AND ? AND hh.loaiHH = ?', [startDate, endDate, maTL], callback);
}


module.exports = statisticalStores