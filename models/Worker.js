const mongoose = require("mongoose");

module.exports = mongoose.model("Worker", new mongoose.Schema({
  name:String,
  phone:String,
  skills:String,
  experience:String,
  lat:Number,
  lng:Number
}));
