const { calculatorAge, date } = require("../../lib/utils");
const teachers = require("../models/teacher")

module.exports = {
  index(req, res) {
    let { filter, page, limit } = req.query
    page = page || 1
    limit = limit || 2
    let offset = limit * (page - 1 )

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(teachers) {
        const pagination = {
          total: Math.ceil(teachers[0].total / limit),
          page
        }
        return res.render("teachers/index", {teachers, pagination, filter})
      }
    }
    
    teachers.paginate(params)
  },
  create(req, res) {
    return res.render("teachers/register");
  },
  post(req, res) {
    const keys = Object.keys(req.body);
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Por favor, preencha todos os campos!");
      }
    }
    
    teachers.create(req.body, function(){
      return res.redirect("/teachers")
    })
  },
  show(req, res) {
    teachers.find(req.params.id, function(teacher){
      if(!teacher) return res.send(" Teacher not found!")

      teacher.birth_date = calculatorAge(teacher.birth_date)
      teacher.subjects_taught = teacher.subjects_taught.split(",")
      teacher.created_at = date(teacher.created_at).format

      return res.render("teachers/show", { teacher });
    })
  },
  edit(req, res) {
    teachers.find(req.params.id, function(teacher){
      if(!teacher) return res.send(" Teacher not found!")

      teacher.birth_date = date(teacher.birth_date).iso
      teacher.subjects_taught = teacher.subjects_taught.split(",")
      teacher.created_at = date(teacher.created_at).format

      return res.render("teachers/edit", { teacher });
    })
  },
  put(req, res) {
    const keys = Object.keys(req.body);
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Por favor, preencha todos os campos!");
      }
    }
    
    teachers.update(req.body, function(){
      return res.redirect(`/teachers/${req.body.id}`)
    })
  },
  delete(req, res) {
    teachers.delete(req.body.id, function(){
      return res.redirect("/teachers")
    })
  },
};

