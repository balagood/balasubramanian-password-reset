//const nodemailer = require("nodemailer");
import nodemailer from "nodemailer"
import dotenv from "dotenv";
dotenv.config();
console.log("for checking");
console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);
console.log('Checking')
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  //host: "smtp.sendgrid.net",
  port: 587,
  secure: false, 
  auth: {
    //api_key: process.env.SENDGRID_API_KEY
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
   // user: "apikey",
   // pass: process.env.SENDGRID_API_KEY

  },tls: {
    rejectUnauthorized: false, // ⚠️ disables certificate validation
  },

});
export default transporter;
