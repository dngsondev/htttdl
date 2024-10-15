const session = require('express-session');
const connection = require('../../db/db')

function statisticalCH(request, response) {
    let maCH = request.session.maCH;
    let startDate = request.body.ngaybatdau; 
    let endDate = request.body.ngayketthuc;
    console.log(maCH, startDate, endDate);

    // Make sure to use placeholders (?) for query parameters to prevent SQL injection
    connection.query('SELECT * FROM hoadon WHERE ngaylapHD BETWEEN ? AND ? AND maCH = ?', [startDate, endDate, maCH], function(error, results, fields) {
        if (error) throw error;
        tkcuahang = results.map(result => result);
        request.session.tkcuahang = tkcuahang;
        response.render('statistical', {layout: 'main',maCH: request.session.maCH, tkcuahang: request.session.tkcuahang});
    });
}


module.exports = statisticalCH