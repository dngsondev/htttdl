const connection = require('../../db/db')
// http://localhost:3000/login/auth

function login(request, response) {
    // Lấy thông tin username và password từ form
    let username = request.body.username;
    let password = request.body.password;
    console.log(username, password);

    // Kiểm tra xem username và password có tồn tại hay không
    if (username && password) {
        // Thực hiện truy vấn SQL để tìm tài khoản trong cơ sở dữ liệu
        connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (error) throw error;

            // Nếu tìm thấy tài khoản phù hợp
            if (results.length > 0) {
                // Xác thực người dùng và lưu thông tin trong session
                request.session.loggedin = true;
                request.session.username = username;

                // Chuyển hướng về trang chủ
                response.redirect('/');
            } else {
                // Nếu thông tin đăng nhập không chính xác
                response.send('Incorrect Username and/or Password!');
            }			
            response.end();
        });
    } else {
        // Nếu thiếu username hoặc password
        response.send('Please enter Username and Password!');
        response.end();
    }
}
// function logout(req, res) {
//     req.session.destroy()
//     res.redirect('/')
// }

module.exports = login
// module.exports = logout