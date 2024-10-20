const addMarker = require('../models/addMarker')
const getStores = require('../models/getStores')
const deleteMarker = require('../models/deleteMarker')

const multer = require('multer');
const path = require('path');

// Cấu hình multer để lưu file ảnh
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/images')); // Thư mục lưu ảnh
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Tạo tên file duy nhất
    }
});

const upload = multer({ storage: storage });

class MapContollers {

    index(req, res) {
        getStores(function(error, results, fields) {
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
        })
    }


    addMarker(request, response) {
        // addMarker(req, res)
        upload.single('pictureCH')(request, response, function (err) {
            if (err) {
                return response.send('Error uploading file.');
            }

            let name = request.body.nameCH;
            let address = request.body.addressCH;
            let lat = request.body.lat;
            let lng = request.body.lng;
            let description = request.body.mota;
            let image = request.file ? request.file.filename : null;

            if (name && address && lat && lng && description && image) {
                addMarker(name, address, lat, lng, image, description, function(error, results) {
                    if (error) throw error;
                    response.redirect('/');
                });
            } else {
                response.send('Please enter all required information!');
            }
        });
    }
    
    deleteMarker(request,response){
        let maCH = request.query.maCH
        console.log(maCH)
        if (maCH) {
            deleteMarker(maCH, function(error, results, fields) {
                if (error) throw error;
                response.redirect('/');			
            })
        }
    }

}

module.exports = new MapContollers