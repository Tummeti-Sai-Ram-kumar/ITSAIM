const mongoose = require('mongoose');
// set of rules and properties which are obeyed by the DB is known as Schema

const userSchema = new mongoose.Schema({
    UserName : {
        type : String,
        required : true
    },
    PassWord : {
        type : String,
        required : true
    }
})

// Derive a Schema and compile it to a model 
module.exports = mongoose.model('User',userSchema);