const mongoose = require('mongoose');

const vehicleSchema = mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  model: { type: String, required: true },
  price: { type: Number, required: true },
  availability: { type: Boolean, default: true },
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
