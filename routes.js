const express = require('express')
const routes = express.Router()

routes.get('/', function(req, res) {
    res.redirect('teachers/index')
})

routes.get('/teachers/index', function(req, res) {
    res.render('teachers/index')
})

routes.post('/teachers', function(req, res) {
    return res.send('recebido')
})

routes.get('/teachers/registerTeacher', function(req, res) {
    return res.render('teachers/registerTeacher')
})

routes.get('/students', function(req, res) {
    res.render('students/students')
})

module.exports = routes