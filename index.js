import express from "express";
import { DbConnect } from "./src/utils/db.utils.js";
import 'dotenv/config';
import { AdminRoute } from "./src/routes/Admin.route.js";
import {  UserRoute } from "./src/routes/User.route.js";
import cors from 'cors';

const app = express();
//inbuilt middleware 
app.use(express.json());

app.use(cors());

//Only Admin Route
app.use('/admin', AdminRoute);

//User Routes
app.use('/users', UserRoute)

//server listening
app.listen(process.env.PORT, async () => {
    await DbConnect();
    console.log(`server is running at http://localhost:${process.env.PORT}`);
})