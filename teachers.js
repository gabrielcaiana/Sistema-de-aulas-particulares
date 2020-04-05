const fs = require("fs")
const data = require("./data.json")
const { calculatorAge, graduation, date } = require('./utills')

exports.show = function(req, res) {
    const { id } = req.params
    const foundTeacher = data.teachers.find(function(teachers) {
        return teachers.id == id
    })

    if (!foundTeacher) {
        return res.send('Professor não encontrado!')
    }

    const teacher = {
        ...foundTeacher,
        age: calculatorAge(foundTeacher.birth),
        graduation: graduation(foundTeacher.selectEducation),
        atuacao: foundTeacher.atuacao.split(','),
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundTeacher.created_at)
    }

    return res.render('teachers/show', { teacher })
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
    let id = Number(data.teachers.length + 1)

    data.teachers.push({
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

exports.edit = function(req, res) {
    const { id } = req.params
    const foundTeacher = data.teachers.find(teachers => teachers.id == id) //mesma coisa que isso --> find(function (teachers) {return teachers.id == id

    if (!foundTeacher) {
        return res.send('Professor não encontrado!')
    }

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth),
        graduation: graduation(foundTeacher.selectEducation)
    }

    return res.render('teachers/edit', { teacher })
}

exports.put = function(req, res) {
    const { id } = req.body
    let index = 0

    const foundTeacher = data.teachers.find(function(teacher, foundIndex) {
        if (id == teacher.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundTeacher) return res.send('Write file error')

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(foundTeacher.id)
    }

    data.teachers[index] = teacher

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send('Write file error')
        return res.redirect(`/teachers/${id}`)
    })

}