const express = require('express')
const routes = express.Router()

routes.get('/', function(req, res) {
    res.redirect('teachers')
})

routes.get('/teachers', function(req, res) {
    res.render('teachers')
})

routes.get('/students', function(req, res) {
    res.render('students')
})

module.exports = routes