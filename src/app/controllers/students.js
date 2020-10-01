const {date } = require("../../lib/utils");
const students = require("../models/student")

module.exports = {
    index(req, res) {
      let { filter, page, limit } = req.query
      page = page || 1
      limit = limit || 3
      let offset = limit * (page - 1 )
  
      const params = {
        filter,
        page,
        limit,
        offset,
        callback(students) {
          const pagination = {
            total: Math.ceil(students[0].total / limit),
            page
          }
          return res.render("students/index", {students, pagination, filter})
        }
      }
      
      students.paginate(params)
  },
  create(req, res) {
    students.teacherOptions(function(options){
      return res.render("students/register", {teacherOptions: options});
    })
  },
  post(req, res) {
    const keys = Object.keys(req.body);
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Por favor, preencha todos os campos!");
      }
    }
    
    students.create(req.body, function(){
      return res.redirect("/students")
    })
  },
  show(req, res) {
    students.find(req.params.id, function(student){
      if(!student) return res.send(" student not found!")

      student.birth_date = date(student.birth_date).format
      return res.render("students/show", { student });
    })
  },
  edit(req, res) {
    students.find(req.params.id, function(student){
      if(!student) return res.send(" student not found!")

      student.birth_date = date(student.birth_date).iso

      students.teacherOptions(function(options){
        return res.render("students/edit", { student, teacherOptions: options });
      })
    })
  },
  put(req, res) {
    const keys = Object.keys(req.body);
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Por favor, preencha todos os campos!");
      }
    }
    
    students.update(req.body, function(){
      return res.redirect(`/students/${req.body.id}`)
    })
  },
  delete(req, res) {
    students.delete(req.body.id, function(){
      return res.redirect("/students")
    })
  },
};

