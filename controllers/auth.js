import pool from "../database/keys";

const authentication = {};

authentication.signUp = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (role == "profesor") {
    try {
      await pool.query(
        "INSERT INTO profesor (p_name,p_email,p_password) VALUES ($1,$2,$3)",
        [name, email, password]
      );
      res.status(200).json({
        message: "Successful register profesor",
        profesor: { name, email, password },
      });
    } catch (err) {
      if (err.constraint == "uk_profesor_p_email") {
        res.status(500).json({
          message: "Someone is alreafy using email",
          err,
        });
      } else {
        res.status(500).json({
          message: "Ah error ha ocurred",
          err,
        });
      }
    }
  } else {
    try {
      await pool.query(
        "INSERT INTO student (s_name,s_email,s_password) VALUES ($1,$2,$3)",
        [name, email, password]
      );
      res.status(200).json({
        message: "Successful register student",
        profesor: { name, email, password },
      });
    } catch (err) {
      if (err.constraint == "uk_student_s_email") {
        res.status(500).json({
          message: "Someone is alreafy using email",
          err,
        });
      } else {
        res.status(500).json({
          message: "Ah error ha ocurred",
          err,
        });
      }
    }
  }
};

authentication.signIn = async (req, res) => {
  const { email, password, role } = req.body;
  if (role == "profesor") {
    try {
      const profesor = await (
        await pool.query(
          "SELECT * FROM profesor WHERE p_email=$1 AND p_password=$2",
          [email, password]
        )
      ).rows;
      if (profesor.length > 0) {
        res.status(200).json({
          id: profesor[0].id_p,
          name: profesor[0].p_name,
          email: profesor[0].p_email,
          role: "profesor",
        });
      } else {
        res.status(200).json({
          message: "the profesor does not exist or password is invalid",
          NotFound: true,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Ah error has ocurred",
        error,
      });
    }
  } else {
    try {
      const student = await (
        await pool.query(
          "SELECT * FROM student WHERE s_email=$1 AND s_password=$2",
          [email, password]
        )
      ).rows;
      if (student.length > 0) {
        res.status(200).json({
          id: student[0].id_s,
          name: student[0].s_name,
          email: student[0].s_email,
          role: "student",
        });
      } else {
        res.status(200).json({
          message: "the student does not exist or password is invalid",
          NotFound: true,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Ah error has ocurred",
        error,
      });
    }
  }
};

module.exports = authentication;
