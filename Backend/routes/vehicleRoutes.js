const express = require('express');
const {
    addVehicle,
    updateVehicle,
    getAllVehicles,
} = require('../controllers/vehicleController');

const router = express.Router();

router.post('/vehicles', addVehicle);
router.put('/vehicles/:id', updateVehicle);
router.get('/vehicles', getAllVehicles);

module.exports = router;
