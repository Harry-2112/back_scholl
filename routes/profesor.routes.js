import express from "express";
import profesor from "../controllers/profesor";
const router = express.Router();

//COURSES

router.post("/course", profesor.createCourse);
router.get("/course/:id_c",profesor.readCourse)
router.put('/course/:id_c',profesor.updateCourse)
router.delete('/course/:id_c',profesor.deleteCourse)
router.post('/my-courses',profesor.getCourses)


//ASSIGNMENTS
router.post("/assignment/:id_c", profesor.createAssignment);

router.get('/course-assignments/:id_c', profesor.getAssignments)


//DELIVERIES
router.get('/deliveries/:id_a',profesor.getDeliveries)

module.exports = router;
