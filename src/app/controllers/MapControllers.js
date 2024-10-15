const addMarker = require('../models/addMarker')
const getStores = require('../models/getStores')
class MapContollers {
    addMarker(req, res) {
        addMarker(req, res)
    }
    index(req, res) {
        getStores(req, res)
    }
}

module.exports = new MapContollers