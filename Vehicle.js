// const mongoose = require("mongoose");

// const vehicleSchema = new mongoose.Schema({
//   name: String,
//   type: String,
//   price: Number,
//   image: String,
//   available: { type: Boolean, default: true },
// });

// module.exports = mongoose.model("Vehicle", vehicleSchema);

const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  title: String,
  brand: String,
  pricePerDay: Number,
  imageUrl: String,
  available: { type: Boolean, default: true },
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
