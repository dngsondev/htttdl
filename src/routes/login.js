const express = require('express')
const router = express.Router()

const loginControllers = require('../app/controllers/LoginControllers')
const logoutControllers = require('../app/controllers/LogoutControllers')

router.post('/login', loginControllers.login)
router.get('/logout', logoutControllers.logout)


module.exports = router

