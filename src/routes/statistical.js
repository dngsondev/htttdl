const express = require('express')
const router = express.Router()

const statisticalControllers = require('../app/controllers/StatisticalControllers')

// router.post('/inventory', statisticalControllers.inventory)
router.post('/', statisticalControllers.statistical)
router.get('/', statisticalControllers.index)

module.exports = router