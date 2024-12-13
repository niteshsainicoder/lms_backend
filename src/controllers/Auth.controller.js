import UsersModels from "../models/Users.Models.js";

export const AdminLogIn = async (req, res) => {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
        return res.status(400).json({ message: "Please Provide Email and Password" });
    }

    if (Email == "acadmically@gmail.com" && Password == "password") {

        return res.status(200).cookie("authtoken", "This user is admin").json({ message: "Admin Logged In Successfully" });

    }
    return res.status(400).json({ message: "Invalid Email or Password" });
}


export const UserLogIn = async (req, res) => {
    const { Email, Password } =  req.body;
    console.log(Email, Password,'from outer');
    
    if (!Email || !Password) {
        console.log("Please Provide Email and Password", Email, Password);
        
        return res.status(400).json({ message: "Please Provide Email and Password" });
    }

    const User = await UsersModels.findOne({email: Email,password: Password });
    if (User) {
        return res.status(200).json({ message: "User Logged In Successfully", data: User });
    }
    return res.status(400).json({ message: "Invalid Email or Password" });

}

export const Signup = async (req,res) => {
    const { Name, Email, Password } = req.body;
    const newUser = await UsersModels.create({name: Name,email: Email, password:Password, enrolledCourses: [] });
    if (newUser) {
        return res.status(200).json({ message: "User Created Successfully", data: newUser });
    }
    else {
        return res.status(400).json({ message: "User Not Created" });
    }

}