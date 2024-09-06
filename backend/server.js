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

const userSchema = new mongoose.Schema({
  name: String, 
  email: {
    type: String,
    unique: true, 
  },
  password: String,
});

const User = mongoose.model("User", userSchema);

app.post("/register", async (req, res) => {
  try {
    const result = await User.create(req.body);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

app.post("/login", async(req, res) => {
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
