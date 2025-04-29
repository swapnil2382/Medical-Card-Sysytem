const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const doctorRoutes = require('./routes/doctorRoutes');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/doctors', doctorRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));
