import { Router } from "express";
import { addCourse, DeleteCourse, UpdateCourse } from "../controllers/Courses.Controller.js";
import { AdminLogIn } from "../controllers/Auth.controller.js";

const AdminRoute = Router();

AdminRoute.post('/login',AdminLogIn)
AdminRoute.post('/addcourse',addCourse);
AdminRoute.put('/courses/:Id',UpdateCourse);
AdminRoute.delete('/courses/:Id',DeleteCourse);

export {AdminRoute}