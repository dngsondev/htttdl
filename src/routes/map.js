const express = require('express')
const router = express.Router()
const mapControllers = require('../app/controllers/MapControllers')

router.get('/delete', mapControllers.deleteMarker)
router.post('/addmarker', mapControllers.addMarker)
router.use('/', mapControllers.index)


module.exports = router