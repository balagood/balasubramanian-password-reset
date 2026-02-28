//const User = require("../models/User");
//const transporter = require("../config/mail");
//const generateToken = require("../utils/generateToken");
//const bcrypt = require("bcrypt");

import Password from "../models/Password.js";
import transporter from "../config/mail.js";
import generateToken from "../utils/generate.token.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { BrevoClient } from '@getbrevo/brevo'
import SibApiV3Sdk  from "sib-api-v3-sdk";

export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await Password.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Password.create({
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};


export  const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Password.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const token = crypto.randomBytes(32).toString("hex");
    const expiry = Date.now() + 1000 * 60 * 15;

    user.reset_token = token;
    user.reset_expiry = expiry;
    await user.save();

    const resetLink = `https://passwordresetfrondend.netlify.app/${token}`;

    /* await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. Link expires in 15 minutes.</p>`
    }); */

    var defaultClient = SibApiV3Sdk.ApiClient.instance;
    var apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.BREVO_API_KEY;
    var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    await apiInstance.sendTransacEmail({
          sender: {
            email: process.env.EMAIL_USER,
            name: 'Testing',
          },
          to: [
            {
              email: email,
            },
          ],
          subject: "Reset your password",
          htmlContent: `
            <p>You requested a password reset.</p>
            <p>Click the link below to reset your password:</p>
            <a href="${resetLink}">${resetLink}</a>
            <p>This link expires in 10 minutes.</p>
          `,
        });
    
    res.json({ message: "Password reset link sent to email" });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }

};

export const verifyToken = async (req, res) => {
  const { token } = req.params;
  const user = await Password.findOne({ reset_token: token });

  if (!user) return res.status(400).json({ message: "Invalid token" });
  if (Date.now() > user.reset_expiry) return res.status(400).json({ message: "Token expired" });

  res.json({ message: "Valid token" });
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  const user = await Password.findOne({ reset_token: token });

  if (!user) return res.status(400).json({ message: "Invalid token" });
  if (Date.now() > user.reset_expiry) return res.status(400).json({ message: "Token expired" });

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;
  user.reset_token = null;
  user.reset_expiry = null;
  await user.save();

  res.json({ message: "Password updated successfully" });
};