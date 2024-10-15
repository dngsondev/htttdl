const express = require('express')
const path = require('path')
const hbs = require('express-handlebars')
const session = require('express-session')
const route = require('./routes')
const db = require('./db/db')
const app = express()
const port = 3000

db.connect(() => {
    console.log('connected')
})

app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

app.engine('hbs', hbs.engine({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

app.use(session({
  secret: 'yourSecretKey',  // Thay bằng một khóa bí mật
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  // Để `secure: true` nếu bạn sử dụng HTTPS
}));

route(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})