const express = require("express");
const app = express();
const path = require("path");

app.get("/", (req, res) => {
  res.json("Server Running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
