const express = require('express')

const app = express()
const router = express.Router()

// use menerima semua method
app.use('/products', (req, res, next) => {
    console.log('url', req.originalUrl)
    console.log('method', req.method)
    res.json({name: "Dewaning", email: "email.dewaning"})
    next();
})

app.get('/users', (req, res, next) => {
    res.json({name: "Name Users"});
    next();
})

app.use('/', router)

app.listen(4000)