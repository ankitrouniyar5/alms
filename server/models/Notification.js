const mongoose = require('mongoose');

const NotificationSchema = mongoose.Schema({

  
    Branch_Name :{
        type : String,
    },
    customer_address:{
        type : String,

    },customer_phone:{
        type : String,

    },pincode :{
        type : Number,
    },
    time :{
        type : Date,
        default : Date.now

    },read :{
        type : Boolean
    }

})

const Notification = mongoose.model('Notification',NotificationSchema,'Notification');

module.exports = Notification