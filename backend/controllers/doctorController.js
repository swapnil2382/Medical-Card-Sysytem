const Doctor = require("../models/Doctor"); // Use require for importing models

// Add a new doctor
const addDoctor = async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json({ success: true, data: doctor });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// List doctors with filters
const listDoctors = async (req, res) => {
    try {
      const { page = 1, limit = 10, location, specialization, consultation_fees } = req.query;
      const query = {};
  
      if (location) query.location = location;
      if (specialization) query.specialization = { $regex: specialization, $options: 'i' }; // Handle case-insensitive search for specialization
      if (consultation_fees) query.consultation_fees = { $lte: consultation_fees };
  
      const doctors = await Doctor.find(query)
        .skip((page - 1) * limit)
        .limit(Number(limit));
  
      const total = await Doctor.countDocuments(query);
  
      res.status(200).json({
        page: Number(page),
        limit: Number(limit),
        totalDoctors: total,
        totalPages: Math.ceil(total / limit),
        doctors,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  

// Export the functions using module.exports
module.exports = {
  addDoctor,
  listDoctors
};
