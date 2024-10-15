const statisticalCH = require('../models/statistical')

class StatisticalControllers {

    index(request, response) {
        const maCH = request.query.maCH;
        request.session.maCH = maCH;
        response.render('statistical', {maCH: request.session.maCH});
    }
    
    statistical(request, response) {
        statisticalCH(request, response)
    }
}

module.exports = new StatisticalControllers