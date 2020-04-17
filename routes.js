const express = require('express')
const routes = express.Router()
const teachers = require('./teachers')

routes.get('/', function(req, res) {
    res.redirect('teachers')
})

routes.get('/teachers', teachers.index)

routes.get('/teachers/register', function(req, res) {
    return res.render('teachers/register')
})

routes.get('/teachers/:id', teachers.show)

routes.get('/teachers/:id/edit', teachers.edit)

routes.post('/teachers', teachers.post)

routes.put('/teachers', teachers.put)

routes.delete('/teachers', teachers.delete)

routes.get('/students', function(req, res) {
    res.render('students/students')
})

module.exports = routes