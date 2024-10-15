const connection = require('../../db/db')
// upload file hinh anh
const multer = require('multer')
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/images'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Khởi tạo multer với cấu hình đã đặt
const upload = multer({ storage: storage });

function addMarker(request, response) {
    upload.single('pictureCH')(request, response, function (err) {
        if (err) {
            return response.send('Error uploading file.');
        }

        let name = request.body.nameCH;
        let address = request.body.addressCH;
        let lat = request.body.lat;
        let lng = request.body.lng;
        let description = request.body.mota;
        let image = request.file ? request.file.filename : null; // Lấy tên file ảnh đã lưu

        if (name && address && lat && lng && description && image) {
            // Thực hiện truy vấn SQL để thêm thông tin vào cơ sở dữ liệu
            connection.query('INSERT INTO cuahang (tenCH, diachi, kinhdo, vido, hinhanh, mota) VALUES (?,?,?,?,?,?)', 
            [name, address, lat, lng, image, description], function(error, results, fields) {
                if (error) throw error;
                response.redirect('/');
                response.end();
            });
        } else {
            console.log('Missing required information.');
            response.send('Please enter all required information!');
            response.end();
        }
    });
}

module.exports = addMarker