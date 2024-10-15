const express = require('express')
const router = express.Router()

const loginControllers = require('../app/controllers/LoginControllers')
const logoutControllers = require('../app/controllers/LogoutControllers')

router.post('/auth', loginControllers.login)
router.get('/logout', logoutControllers.logout)
// router.use('/', loginControllers.index)


module.exports = router

