const { calculatorAge, graduation, date } = require("../../lib/utils");
const students = require("../models/student")

module.exports = {
  index(req, res) {
    students.all(function(students){
      return res.render("students/index", {students})
    })
  },
  create(req, res) {
    return res.render("students/register");
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

      student.birth_date = calculatorAge(student.birth_date)
      return res.render("students/show", { student });
    })
  },
  edit(req, res) {
    students.find(req.params.id, function(student){
      if(!student) return res.send(" student not found!")

      student.birth_date = date(student.birth_date).iso
      return res.render("students/edit", { student });
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

