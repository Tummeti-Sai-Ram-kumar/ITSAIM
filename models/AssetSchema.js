const mongoose = require('mongoose');

const IpadsSchema = new mongoose.Schema({
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

const LaptopByodSchema = new mongoose.Schema({
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


const HarddiskSchema = new mongoose.Schema({
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
const LaptopsTridentSchema = new mongoose.Schema({
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

const CCTVSchema = new mongoose.Schema({
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

const IpPhonesSchema = new mongoose.Schema({
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

const DesktopsSchema = new mongoose.Schema({
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




const LaptopByod = mongoose.model('LaptopsB',LaptopByodSchema);
const Ipads = mongoose.model('Ipads',IpadsSchema);
const Harddisk = mongoose.model('Harddisk',HarddiskSchema);
const CCTV = mongoose.model('CCTV',CCTVSchema);
const IpPhone = mongoose.model('IpPhone',IpPhonesSchema);
const LaptopTrident = mongoose.model('LaptopTrident',LaptopsTridentSchema);
const Desktop = mongoose.model('Desktop',DesktopsSchema);


module.exports = {Ipads,LaptopByod,Harddisk,CCTV,IpPhone,LaptopTrident,Desktop};


