const connection = require('../../db/db')

function inventory(maCH, callback) {
    connection.query('SELECT hh.tenHH, hh.loaiHH, h.soluong, hd.sotien FROM hanghoa hh, hhch h, cuahang c, hoadon hd where hd.maCH = c.maCH and hh.maHH = h.maHH and c.maCH = h.maCH and h.maCH = ?', [maCH], callback);
}


module.exports = inventory