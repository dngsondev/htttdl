const express = require('express')
const router = express.Router()

const statisticalControllers = require('../app/controllers/StatisticalControllers')

router.post('/thongke', statisticalControllers.statistical)
router.get('/', statisticalControllers.index)

module.exports = router