import express from "express";
import student from "../controllers/student";

const router = express.Router();


router.get('/courses', student.getCourses)

router.post('/course/:id_c', student.joinCourse)

router.post('/my-courses',student.getMyCourses)

router.get('/assignments/:id_c', student.getAssignments)

router.post('/delivery',student.addDelivery)
module.exports = router