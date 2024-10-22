const connection = require('../../db/db')

function inventory(maCH, callback) {
    connection.query('SELECT hh.tenHH, tl.theloai, h.soluong, hd.sotien FROM hanghoa hh, hhch h, cuahang c, hoadon hd, theloai tl where tl.maTL = hh.loaiHH and hd.maCH = c.maCH and hh.maHH = h.maHH and c.maCH = h.maCH and h.maCH = ?', [maCH], callback);
}


module.exports = inventory