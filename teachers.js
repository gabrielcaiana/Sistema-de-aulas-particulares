const fs = require("fs")
const data = require("./data.json")

exports.show = function (req, res) {
    const { id } = req.params
    const foundTeacher = data.teachers.find(function (teachers) {
        return teachers.id == id
    })

    if (!foundTeacher) {
        return res.send('Professor não encontrado!')
    }

    const teacher = {
        ...foundTeacher,
        atuacao: foundTeacher.atuacao.split(',')

    }

    return res.render('teachers/show', {teacher})
}

exports.post = function (req, res) {
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

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) {
            return res.send('Erro ao escrever o arquivo!')
        }

        return res.redirect("/")
    })
}