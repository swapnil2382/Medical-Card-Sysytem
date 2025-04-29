const express = require('express');
const { addDoctor, listDoctors } = require('../controllers/doctorController'); // Corrected require statement

const router = express.Router();

// Define routes and associate them with controller methods
router.post('/add-doctor', addDoctor);
router.get('/list-doctor-with-filter', listDoctors);

module.exports = router;
