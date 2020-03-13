const express = require('express')
const routes = express.Router()
const teachers = require('./teachers')

routes.get('/', function(req, res) {
    res.redirect('teachers/index')
})

routes.get('/teachers/index', function(req, res) {
    res.render('teachers/index')
})

//Estrutura de validação do cadastro de professores
routes.post('/teachers', teachers.post)

routes.get('/teachers/registerTeacher', function(req, res) {
    return res.render('teachers/registerTeacher')
})

routes.get('/students', function(req, res) {
    res.render('students/students')
})

module.exports = routes