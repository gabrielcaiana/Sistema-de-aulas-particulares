// importando filesystem do node
const fs = require("fs")
const data = require("./data.json")

//exportando arquivo
exports.post = function (req, res) {
    //validação
    const keys = Object.keys(req.body)
    for (key of keys) {
        if (req.body[key] == '') {
            return res.send('Please, fill all fields!')
        }
    }

    // organizacao dos dados a serem enviados
    let {avatar_url, name, selectedEducation, typeAula, atuacao } = req.body

    // tratamento dos dados
    let birth = Date.parse(req.body.birth)
    let created_at = Date.now()
    let id = Number(data.teachers.length + 1)


    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        selectedEducation,
        typeAula,
        atuacao,
        created_at
})

fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) {
        return res.send('Write file error')
    }

    return res.redirect("/")
})
}