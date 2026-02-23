// const express = require("express");
// const bodyParser = require("body-parser");
// const authRoutes = require("./routes/authRoutes");
//import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.route.js";
import cors from "cors";
import configDB from "./config/db.js"; 

//dotenv.config();
//require("./config/db"); // connect to MongoDB

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // allow frontend
  methods: ["GET", "POST","PUT","DELETE"],
  credentials: true
}));

app.use(bodyParser.json());
app.use("/", authRoutes);




app.listen(3000, () => console.log("Server running on port 3000"));
