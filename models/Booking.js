const mongoose = require("mongoose");

module.exports = mongoose.model("Booking", new mongoose.Schema({
  name:String,
  phone:String,
  address:String,
  service:String,
  subservice:String,
  datetime:String
}));
