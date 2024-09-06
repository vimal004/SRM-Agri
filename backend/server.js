const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");
app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://2004vimal:zaq1%40wsx@cluster0.kfsrfxi.mongodb.net/SRM_Agri"
  )
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.json("Server Running!");
});

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

app.post("/adminregister", async (req, res) => {
  try {
    const result = await Admin.create(req.body);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

app.post("/userregister", async (req, res) => {
  try {
    const result = await User.create(req.body);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

app.post("/adminlogin", async (req, res) => {
  try {
    const result = await Admin.findOne({ email: req.body.email });
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

app.post("/userlogin", async (req, res) => {
  try {
    const result = await User.findOne({ email: req.body.email });
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
