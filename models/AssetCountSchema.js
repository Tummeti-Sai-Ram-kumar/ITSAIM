const mongoose = require('mongoose');

const AssetCountSchema = new mongoose.Schema({
    AssetName : {
        type : String,
        required : true
    },
    WRCount : {
        type : Number,
        required : true
    },
    NWRCount : {
        type : Number,
        required : true
    },
    NWNRCount : {
        type : Number,
        required : true
    }
})

module.exports = mongoose.model('AssetCount',AssetCountSchema);