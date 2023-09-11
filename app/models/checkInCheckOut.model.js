const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checkInCheckOutSchema = new Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Employee',
    required: 'ID employee Obligatoire'
  },
  comment: {
    type: String
  },
  checkInTime: {
    type: Date,
    required: 'checkInTime Obligatoire'
  },
  checkOutTime: {
    type: Date
  },
  duration :{
    type: Number
  }
});

module.exports = mongoose.model('checkInCheckOut', checkInCheckOutSchema);
