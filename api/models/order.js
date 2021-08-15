const mongoose = require('mongoose');

// Define model for Order
const OrderShema = new mongoose.Schema({
  id: {
    type: String,
    require: true,
    unique: true,
  },
  orderNumber: {
    type: Number,
    require: true,
  },
  responsiblePerson: {
    type: String,
    require: true,
  },
  healthCareDistrict: {
    type: String,
    require: true,
  },
  vaccine: {
    type: String,
    require: true,
  },
  injections: {
    type: Number,
    require: true,
  },
  arrived: {
    type: String,
    require: true,
  },
});
// Export model as Vaccination
module.exports = mongoose.model('Order', OrderShema);
