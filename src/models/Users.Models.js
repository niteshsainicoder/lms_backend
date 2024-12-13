import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    enrolledCourses:[{
       type:String ,default:'0'}],
});

export default mongoose.model("User", UserSchema);