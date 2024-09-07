const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());
app.use("/auth", require("./authrouter"));

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
