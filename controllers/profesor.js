import poll from "../database/keys";
import cloudinary from "../lib/cloudinary";
const profesor = {};

//COURSES
profesor.createCourse = async (req, res) => {
  const { id, c_name, c_description } = req.body;
  try {
    await poll.query(
      "INSERT INTO course (p_id, c_name, c_description) VALUES ($1, $2, $3)",
      [id, c_name, c_description]
    );

    res.status(200).json({
      message: "Successful added course",
      course: { id, c_name, c_description },
    });
  } catch (error) {
    res.status(500).json({
      message: "An error has ocurred",
      error,
    });
  }
};

profesor.readCourse = async (req, res) => {
  const id = req.params.id_c;
  try {
    const course = await (
      await poll.query("SELECT * FROM course WHERE id_c=$1", [id])
    ).rows[0];
    res.status(200).json({
      course,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error has ocurred",
      error,
    });
  }
};

profesor.updateCourse = async (req, res) => {
  const id = req.params.id_c;
  const { c_name, c_description } = req.body;
  try {
    await poll.query(
      "UPDATE course SET c_name=$1,c_description=$2 WHERE id_c=$3",
      [c_name, c_description, id]
    );
    res.status(200).json({
      message: "Successful edited course",
      course: { c_name, c_description },
    });
  } catch (error) {
    res.status(500).json({
      message: "An error has ocurred",
      error,
    });
  }
};

profesor.deleteCourse = async (req, res) => {
  const id = req.params.id_c;
  try {
    await poll.query("DELETE FROM course WHERE id_c=$1", [id]);
    res.status(200).json({
      message: "Successful delete course",
    });
  } catch (error) {
    res.status(500).json({
      message: "An error has ocurred",
      error,
    });
  }
};

profesor.getCourses = async (req, res) => {
  const { id } = req.body;
  try {
    const course = await (
      await poll.query("SELECT * FROM course WHERE p_id=$1", [id])
    ).rows;
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({
      message: "An error has ocurred",
      error,
    });
  }
};

//ASSIGNMENTS
profesor.createAssignment = async (req, res) => {
  const id_c = req.params.id_c;
  const { a_name, a_description } = req.body;

  let url = req.files.a_file.tempFilePath.replace(/\\/g, "/");

  const file = await cloudinary(url);

  try {
    await poll.query('INSERT INTO assignment (c_id, a_name, a_description, a_file) VALUES ($1,$2,$3,$4)',[id_c,a_name,a_description,file])
    res.status(200).json({
      message: "Successful added assignment",
      assignment: { a_name, a_description, file },
    });
  } catch (error) {
    res.status(500).json({
      message: "An error has ocurred",
      error,
    });
  }
};
profesor.getAssignments = async(req,res)=>{
  const id_c = req.params.id_c;

  try {
    const assignment = await (await poll.query('SELECT * FROM assignment WHERE c_id=$1',[id_c])).rows
    res.status(200).json(
      assignment
    );
  } catch (error) {
    res.status(500).json({
      message: "An error has ocurred",
      error,
    });
  }
}

//DELIVERIES
profesor.getDeliveries = async (req, res)=>{
  const id_a = req.params.id_a;
  try {
    const deliveries = await (await poll.query('SELECT * FROM delivery JOIN (SELECT id_s, s_name FROM student) AS S ON s_id=id_s WHERE a_id=$1',[id_a])).rows

    res.status(200).json(deliveries)
  } catch (error) {
    res.status(500).json({
      message: "An error has ocurred",
      error,
    });
  }
}

module.exports = profesor;
