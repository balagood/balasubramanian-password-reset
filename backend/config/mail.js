//const nodemailer = require("nodemailer");
import nodemailer from "nodemailer"
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "SendGrid",
  //host: "smtp.gmail.com",
  host: "smtp.sendgrid.net",
  port: 587,
  secure: true, 
  auth: {
    //api_key: process.env.SENDGRID_API_KEY
    //user: process.env.EMAIL_USER,
    //pass: process.env.EMAIL_PASS
    user: "apikey",
    pass: process.env.SENDGRID_API_KEY

  },
  tls: {
    //family: 4 // force IPv4
    rejectUnauthorized: false
  }

});
export default transporter;
