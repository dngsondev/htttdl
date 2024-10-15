const connection = require('../../db/db')

function getStores(req, res) {
    connection.query('SELECT * FROM cuahang', function(error, results, fields) {
        if (error) {
            console.error('Error fetching data:', error);
            res.status(500).send('Error fetching data');
        } else {
            var arr = results.map(result => result);
            
            // Kiểm tra xem req.session đã tồn tại hay chưa
            if (!req.session) {
                req.session = {};  // Khởi tạo session nếu nó chưa tồn tại
            }

            req.session.results = arr;  // Gán kết quả vào session
            res.render('home', {username: req.session.username, results: arr});
        }
    });
}



module.exports = getStores