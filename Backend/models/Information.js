// models/settings.js
const mongoose = require('mongoose');

const InformationSchema = new mongoose.Schema({
  phone: String,
  mobile:String,
  address: String,
  shopTiming: [
    {
      day: String,
      openingTime: String,
      closingTime: String
    }
  ]
  ,
  email: String, 
});

module.exports = mongoose.model('Information', InformationSchema);
