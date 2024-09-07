const express = require("express");
const resourcerouter = express.Router();
const mongoose = require("mongoose");
const cors = require("cors");

resourcerouter.use(express.json());
resourcerouter.use(cors());

const ResourceSchema = new mongoose.Schema({
  fieldNumber: String,
  area: String,
  crop: String,
  details: String,
  menCount: Number,
  womenCount: Number,
  count: Number,
  date: String,
});

const Resource = new mongoose.model("Resource", ResourceSchema);

resourcerouter.post("/add", async (req, res) => {
  try {
    const result = await Resource.create(req.body);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

resourcerouter.get("/all", async (req, res) => {
  try {
    const result = await Resource.find();
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

resourcerouter.get("/all/:date", async (req, res) => {
  try {
    const result = await Resource.find({ date: req.params.date });
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

module.exports = resourcerouter;
