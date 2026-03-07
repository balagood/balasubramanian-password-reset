import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const { DB_HOST,DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env;
const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}?retryWrites=true&w=majority`;

mongoose.connect(uri)
.then(()=>console.log("database is connected"))
.catch((err)=>console.log('connection is failed:',err))

export default mongoose