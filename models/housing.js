const mongoose = require("mongoose");

const housingSchema = new mongoose.Schema({
  lastname: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  leasecontract: {
    type: String,
    required: true,
  },
  housingtype: {
    type: String,
    required: true,
  },
  adresse: {
    type: String,
    required: true,
    
  },
  city: {
    type: String,
    required: true,
  },
  department:{
    type:String, 
    required:true
  },
  surface: {
    type: String,
    required: true,
  },
  numberpieces: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: Array,
    required: true,
  },
  image: {
    type:Array,
    required:true
  },
 
  customer: {
    type: mongoose.Types.ObjectId,
    ref: "Customer",
    required: false,
    
  },
});

const Housing = mongoose.model("Housing", housingSchema);
module.exports = Housing;
