const mongoose =  require('mongoose');

const QRSchema = new mongoose.Schema({
    HostName : {
        type : String,
        required : true
    },
    MakeModel : {
        type : String
    },
    SerialNumber : {
        type : String,
        required : true
    },
    WorkingStatus : {
        type : String
    },
    SalaryCode : {
        type : String
    },
    Remarks : {
        type : String
    }
})

module.exports = mongoose.model('QR',QRSchema);