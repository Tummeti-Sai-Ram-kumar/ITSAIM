const mongoose = require('mongoose');

const RackSchema = new mongoose.Schema({
    AssetName : {
        type : String,
        required : true
    },
    RackNumbers : [
        {
            type : Number,
            required : true
        }
    ],
    BoxNumbers : [
        {
            type : Number
        }
    ],
    Remarks : {
        type : String
    }
})

module.exports = mongoose.model('Rack',RackSchema);