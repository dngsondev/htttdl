const connection = require('../../db/db')

function deleteMarker(request, response) {
    let maCH = request.body.maCH

    if (maCH) {
        // Thực hiện truy vấn SQL để tìm tài khoản trong cơ sở dữ liệu
        connection.query('delete from cuahang where maCH = ?', 
            [maCH], function(error, results, fields) {
            if (error) throw error;
            response.redirect('/');			
            response.end();
        });
    } else {
        response.send('Error!');
        response.end();
    }

}

module.exports = deleteMarker