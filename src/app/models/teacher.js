const db = require("../../config/db");
const { calculatorAge, graduation, date } = require("../../lib/utils");

module.exports = {
  all(callback) {
    db.query(`SELECT * FROM teachers ORDER BY name ASC`, function (
      err,
      results
    ) {
      const teachers = results.rows.map(function (teacher) {
        spreadTeacher = {
          ...teacher,
          subjects_taught: teacher.subjects_taught.split(","),
        };
        return spreadTeacher;
      });

      if (err) throw `Database error! ${err}`;
      callback(teachers);
    });
  },
  create(data, callback) {
    const query = `
        INSERT INTO teachers(
          avatar_url,
          name,
          birth_date,
          education_level,
          class_type,
          subjects_taught,
          created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id
        `;
    
    const values = [
        data.avatar_url,
        data.name,
        date(data.birth_date).iso,
        data.education_level,
        data.class_type,
        data.subjects_taught,
        date(Date.now()).iso
    ]

    db.query(query, values, function(err, results){
        if (err) throw `Database error! ${err}`;
        callback(results.rows[0])
    })
  },
  find(id, callback) {},
  update(data, callback) {},
  delete(id, callback) {},
};
