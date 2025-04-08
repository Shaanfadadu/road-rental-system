const Vehicle = require("../models/Vehicle");

exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.addVehicle = async (req, res) => {
  const vehicle = new Vehicle(req.body);
  try {
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch {
    res.status(500).json({ message: "Error saving vehicle" });
  }
};

exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Not found" });
    res.json(vehicle);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteVehicle = async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
