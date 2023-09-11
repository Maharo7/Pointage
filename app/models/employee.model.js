const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name:{
        type: String,
        required:'name obligatoire'
    },
    firstName:{
        type: String
    },
    dateCreated:{
        type: Date,
        required:'dateCreated obligatoire'
    },
    department:{
        type: String
    }
})
module.exports = mongoose.model('employee', employeeSchema);