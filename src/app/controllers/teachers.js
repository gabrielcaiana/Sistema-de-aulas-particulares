const { calculatorAge, graduation, date } = require("../../lib/utils");
const teachers = require("../models/teacher")

module.exports = {
  index(req, res) {
    teachers.all(function(teachers){
      return res.render("teachers/index", {teachers})
    })
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
    return;
  },
  edit(req, res) {
    return;
  },
  put(req, res) {
    const keys = Object.keys(req.body);
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Por favor, preencha todos os campos!");
      }
    }
    return;
  },
  delete(req, res) {
    return;
  },
};

