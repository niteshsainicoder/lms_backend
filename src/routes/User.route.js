import { Router } from "express"
import { EnrollInCourse, getAllCourses, getSingleCourse } from "../controllers/Courses.Controller.js";
import { Signup, UserLogIn } from '../controllers/Auth.controller.js';
const UserRoute = Router();

UserRoute.get('/courses', getAllCourses);
UserRoute.get('/single/:Id', getSingleCourse);
UserRoute.post('/:userId/enroll/:courseId', EnrollInCourse);;

UserRoute.post('/signup', Signup);
UserRoute.post('/login', UserLogIn);
export { UserRoute }