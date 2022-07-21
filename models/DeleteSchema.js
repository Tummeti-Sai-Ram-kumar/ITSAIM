const mongoose = require('mongoose');
const DeleteSchema = new mongoose.Schema({
    EquipmentNumber : {
        type : String
    },
    Description : {
        type : String
    },
    Location : {
        type : String
    },
    SerialNumber : {
        type : String
    },
    Remarks : {
        type : String
    }
})

module.exports = mongoose.model('Delete',DeleteSchema);