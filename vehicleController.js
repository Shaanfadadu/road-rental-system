const Vehicle = require('C:\\Users\\shaan\\OneDrive\\Desktop\\sem 6\\mini project\\project - Copy\\road-runner-rentals\\backend\\models\\Vehicle.js');

const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicles' });
  }
};

const addVehicle = async (req, res) => {
  const { owner, name, model, price } = req.body;
  try {
    const newVehicle = new Vehicle({ owner, name, model, price });
    await newVehicle.save();
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(500).json({ message: 'Error adding vehicle' });
  }
};

module.exports = { getVehicles, addVehicle };
