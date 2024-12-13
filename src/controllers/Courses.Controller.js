import CoursesModels from "../models/Courses.Models.js"
import UsersModels from "../models/Users.Models.js";
//Get all courses
export const getAllCourses = async (req, res) => {

    const AllCourses = await CoursesModels.find({})
    if (AllCourses.length == 0) {
        return res.status(400).json({ message: "Found No Courses" });
    }

    return res.status(200).json({ message: "all courses", AllCourses });
}


//get a single course 
export const getSingleCourse = async (req, res) => {

    const Id = req.params.Id

    if (!Id) {
        return res.status(400).json({ message: "Please Give Course Id" });
    }

    const SingleCourse = await CoursesModels.findById(Id);
    if (!SingleCourse) {
        return res.status(400).json({ message: "Course Not Found" });
    }
    return res.status(200).json({ message: "Single Course", data: SingleCourse });
}


//Enroll in a course
export const EnrollInCourse = async (req, res) => {
    const courseId = req.params.courseId;
    const userId = req.params.userId;
    const user = await UsersModels.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const findForCourse = await CoursesModels.findById(courseId);
    if (!findForCourse) {
        return res.status(404).json({ message: "Course not found" });
    }
if (user.enrolledCourses.includes(courseId)) {
    return res.status(400).json({ message: "You are already enrolled in this course" });
    
}
    user.enrolledCourses.push(courseId);
    await user.save();
    return res.status(200).json({ message: "Course Enrolled Successfully" });
}


//Admin only, add course
export const addCourse = async (req, res) => {
    try {
        const { title,
            description,
            duration,
            instructor,
        } = req.body;

        if (!title || !description || !duration || !instructor) {
            return res.status(400).json({ message: "Please give all the details" });
        }

        const NewCourse = new CoursesModels({
            title,
            description,
            duration,
            instructor,

        });
        await NewCourse.save();
        return res.status(200).json({ message: "New Course Added" });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


//admin only, update course
export const UpdateCourse = async (req, res) => {
    const Id = req.params.Id;
    
    const { title, description, duration, instructor } = req.body;

    if (!Id || !title || !description || !duration || !instructor) {
        return res.status(400).json({ message: "Please provide all fields" });
    }

    const FindById = await CoursesModels.findById( Id )
    if (!FindById) {
        return res.status(400).json({ message: "Course Not Found" });
    }
    FindById.title = title;
    FindById.description = description;
    FindById.duration = duration;
    FindById.instructor = instructor;
    const UpdateCourse = await FindById.save();
    return res.status(200).json({ message: "Course Updated", UpdateCourse });
}


//admin only, delete course
export const DeleteCourse = async (req, res) => {
    const Id  = await req.params.Id;
    
    if (!Id) {
        return res.status(400).json({ message: "Please provide Id" });
    }

    const DeleteCourse = await CoursesModels.deleteOne( {_id:Id} )
    if (!DeleteCourse) {
        return res.status(400).json({ message: "Course Not Found" });
    }
    return res.status(200).json({ message: "Course Deleted", DeleteCourse });
}

