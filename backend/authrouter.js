const express = require("express");
const authrouter = express.Router();
const mongoose = require("mongoose");
const cors = require("cors");

authrouter.use(express.json());
authrouter.use(cors());

const AdminSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);

authrouter.post("/adminregister", async (req, res) => {
  try {
    const result = await Admin.create(req.body);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

authrouter.post("/userregister", async (req, res) => {
  try {
    const result = await User.create(req.body);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

// Admin login route
authrouter.post("/adminlogin", async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    if (admin && admin.password === req.body.password) {
      res.send({ success: true, message: "Login successful", admin });
    } else {
      res.send({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: "Server error" });
  }
});

// User login route
authrouter.post("/userlogin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user && user.password === req.body.password) {
      res.send({ success: true, message: "Login successful", user });
    } else {
      res.send({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: "Server error" });
  }
});

module.exports = authrouter;
