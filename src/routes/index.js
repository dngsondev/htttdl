const loginRouter = require('./login')
const mapRouter = require('./map')
const statisticalRouter = require('./statistical')

function route(app){

    app.use('/statistical', statisticalRouter)

    app.use('/map', mapRouter)

    app.use('/login', loginRouter)

    app.use('/', (req, res) => {
        if (req.session.loggedin) {
            res.redirect('/map')
        }
        else{
            res.render('login')
        }
    })
}

module.exports = route