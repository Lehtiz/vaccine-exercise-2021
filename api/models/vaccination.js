const mongoose = require('mongoose');

// Define model for Vaccination
const VaccinationShema = new mongoose.Schema({
  id: {
    type: String,
    require: true,
    unique: true,
  },
  sourceBottle: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  vaccinationDate: {
    type: String,
    require: true,
  },
});

// Export model as Vaccination
module.exports = mongoose.model('Vaccination', VaccinationShema);
