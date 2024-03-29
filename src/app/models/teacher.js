const db = require("../../config/db");
const { calculatorAge, graduation, date } = require("../../lib/utils");

module.exports = {
  all(callback) {
    db.query(`SELECT teachers.*, count(students) AS total_students
    FROM teachers
    LEFT JOIN students ON (students.teacher_id = teachers.id)
    GROUP BY teachers.id
    ORDER BY total_students DESC`,
     function (err, results) {
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
  find(id, callback) {
      db.query(`SELECT * FROM teachers WHERE id = $1`, [id], function(err, results){
      if (err) throw `Database error! ${err}`;
      callback(results.rows[0])
      })
  },
  findBy(filter, callback) {
    db.query(`SELECT teachers.*, count(students) AS total_students
    FROM teachers
    LEFT JOIN students ON (students.teacher_id = teachers.id)
    WHERE teachers.name ILIKE '%${filter}%'
    OR teachers.subjects_taught ILIKE '%${filter}%'
    GROUP BY teachers.id
    ORDER BY total_students DESC`, function(err, results) {
      const teachers = results.rows.map(function(teacher){
        spreadTeacher = {
          ...teacher,
          subjects_taught: teacher.subjects_taught.split(","),
        }
        return spreadTeacher
      })
      if(err) throw `Database error ${err}`
      callback(teachers)
    })
  },
  update(data, callback) {
      const query = `UPDATE teachers SET
                        avatar_url=($1),
                        name=($2),
                        birth_date=($3),
                        education_level=($4),
                        class_type=($5),
                        subjects_taught=($6)
                WHERE id = $7
      `

      const values = [
          data.avatar_url,
          data.name,
          date(data.birth_date).iso,
          data.education_level,
          data.class_type,
          data.subjects_taught,
          data.id
      ]

      db.query(query, values, function(err, results){
        if (err) throw `Database error! ${err}`;
        callback()
      })
  },
  delete(id, callback) {
      db.query(`DELETE FROM teachers WHERE id = $1`, [id], function(err, results){
        if (err) throw `Database error! ${err}`;
        return callback()
      })
  },
  paginate(params) {
    const { filter, limit, offset, callback } = params

    let query = "",
        filterQuery = "",
        totalQuery = `(
          SELECT count(*) FROM teachers
        ) as total`

    if (filter) {
      filterQuery = `
      WHERE teachers.name ILIKE '%${filter}%'
      OR teachers.subjects_taught ILIKE '%${filter}%'
      `

      totalQuery = `(
        SELECT count(*) from teachers
        ${filterQuery}
      )as total`
    }

    query = `
    SELECT teachers.*, ${totalQuery}, count(students) AS total_students
    FROM teachers
    LEFT JOIN students ON (students.teacher_id = teachers.id)
    ${filterQuery}
    GROUP BY teachers.id LIMIT $1 OFFSET $2
    `

    db.query(query,[limit,offset], function(err, results){
      if(err) throw `Database Error ${err}`

      const teachers = results.rows.map(function (teacher) {
        spreadTeachers = {
          ...teacher,
          subjects_taught: teacher.subjects_taught.split(","),
        };
        return spreadTeachers;
      });
      callback(teachers)
    })
  }
};
