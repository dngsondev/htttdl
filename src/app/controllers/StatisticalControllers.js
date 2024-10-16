const statisticalCH = require('../models/statistical')

class StatisticalControllers {

    index(request, response) {
        const maCH = request.query.maCH;
        request.session.maCH = maCH;
        response.render('statistical', {maCH: request.session.maCH});
    }
    
    statistical(request, response) {
        let maCH = request.session.maCH;
        let startDate = request.body.ngaybatdau; 
        let endDate = request.body.ngayketthuc;
        let tkcuahang;
        console.log(maCH, startDate, endDate);
        statisticalCH(maCH, startDate, endDate, function(error, results, fields) {
            if (error) throw error;
            tkcuahang = results.map(result => result);
            request.session.tkcuahang = tkcuahang;
            request.session.maCH = maCH
            // console.log(tkcuahang[0].tenCH)
            // request.session.tenCH = tkcuahang[0].tenCH
            response.render('statistical', {maCH: request.session.maCH, tkcuahang: request.session.tkcuahang});
            //response.render('statistical', {layout: 'main',maCH: request.session.maCH, tkcuahang: request.session.tkcuahang});
        })
    }
}

module.exports = new StatisticalControllers