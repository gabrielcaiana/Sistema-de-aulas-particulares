const { calculatorAge, graduation, date } = require("../../lib/utils");

module.exports = {
  index(req, res) {
    return res.render("students/index");
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
    return;
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

