const Vehicle = require('../models/vehicleModel');

// Add a new vehicle
const addVehicle = async (req, res) => {
    try {
        const { name, status } = req.body;
        const newVehicle = new Vehicle({ name, status });
        await newVehicle.save();
        res.status(201).json(newVehicle);
    } catch (error) {
        res.status(500).json({ message: 'Error adding vehicle', error });
    }
};

// Update vehicle status
const updateVehicle = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedVehicle = await Vehicle.findByIdAndUpdate(
            id,
            { status, lastUpdated: Date.now() },
            { new: true }
        );
        res.status(200).json(updatedVehicle);
    } catch (error) {
        res.status(500).json({ message: 'Error updating vehicle', error });
    }
};

// Fetch all vehicles
const getAllVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching vehicles', error });
    }
};

module.exports = { addVehicle, updateVehicle, getAllVehicles };
