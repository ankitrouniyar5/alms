const mongoose = require('mongoose');

const branchSchema = mongoose.Schema({

    Institution_Name:{
        type : String
    },
    username :{
        type : String,
        required : true 
    },
    password :{
        type : String,
        required : true
    },
    admin :{
        type : Number,
    },
    Branch_Name:{
        type : String
    },
    Address:{
        type : String
    },
    City :{
        type : String
    },
    Contact_Number :{
        type : String
    },
    Branch_Incharge:{
        type : String
    },
    Pincode_covered:{
        type : String
    },
    pincodes :[{
        type : String
    }]
})

const Branch = mongoose.model('Branch',branchSchema,'Branch');

module.exports = Branch