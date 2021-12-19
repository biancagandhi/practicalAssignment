const mongoose = require("mongoose");
var Float = require("mongoose-float").loadType(mongoose);
const Product = new mongoose.Schema({
  title: { type: String, default: null },
  price: { type: Float, default: null },
  desc: { type: String, default: null },
});

module.exports = mongoose.model("Product", Product);
