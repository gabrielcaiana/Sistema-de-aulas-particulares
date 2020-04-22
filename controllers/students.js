const fs = require("fs")
const data = require("../data.json")
const { calculatorAge, graduation, date } = require('../utills')

exports.index = function(req, res) {
    const students = data.students.map( (student) =>{
        const spreadStudent = {
            ...student,
            atuacao: student.atuacao.split(',')
        }
        return spreadStudent
    })

    return res.render('students/index', {students})
}

exports.register = function(req, res) {
    return res.render('students/register')
}

exports.post = function(req, res) {
    const keys = Object.keys(req.body)
    for (key of keys) {
        if (req.body[key] == '') {
            return res.send('Por favor, preencha todos os campos!')
        }
    }

    let { avatar_url, name, selectEducation, typeAula, atuacao } = req.body

    let birth = Date.parse(req.body.birth)
    let created_at = Date.now()
    let id = Number(data.students.length + 1)

    data.students.push({
        id,
        avatar_url,
        name,
        birth,
        selectEducation,
        typeAula,
        atuacao,
        created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) {
            return res.send('Erro ao escrever o arquivo!')
        }

        return res.redirect("/")
    })
}

exports.show = function(req, res) {
    const { id } = req.params
    const foundStudent = data.students.find(function(students) {
        return students.id == id
    })

    if (!foundStudent) {
        return res.send('Professor não encontrado!')
    }

    const student = {
        ...foundStudent,
        age: calculatorAge(foundStudent.birth),
        graduation: graduation(foundStudent.selectEducation),
        atuacao: foundStudent.atuacao.split(','),
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundStudent.created_at)
    }

    return res.render('students/show', { student })
}

exports.edit = function(req, res) {
    const { id } = req.params
    const foundStudent = data.students.find(students => students.id == id) //mesma coisa que isso --> find(function (students) {return students.id == id

    if (!foundStudent) {
        return res.send('Professor não encontrado!')
    }

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth),
        graduation: graduation(foundStudent.selectEducation)
    }

    return res.render('students/edit', { student })
}

exports.put = function(req, res) {
    const { id } = req.body
    let index = 0

    const foundStudent = data.students.find(function(student, foundIndex) {
        if (id == student.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundStudent) return res.send('Write file error')

    const student = {
        ...foundStudent,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(foundStudent.id)
    }

    data.students[index] = student

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send('Write file error')
        return res.redirect(`/students/${id}`)
    })

}

exports.delete = function(req, res) {
    const { id } = req.body
    const filteredStudents = data.students.filter(function(student) {
        return student.id != id
    })

    data.students = filteredStudents

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(error) {
        if (error) return res.send('Write file error')
        return res.redirect(`/students`)
    })
}