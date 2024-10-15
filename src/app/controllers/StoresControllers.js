const getStores = require('../models/getStores')

class StoresControllers {
    index(req, res) {
        getStores(req, res)
    }

}

module.exports = new StoresControllers