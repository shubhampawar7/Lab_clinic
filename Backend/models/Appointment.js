const mongoose = require('mongoose');


const labAppointmentSchema = new mongoose.Schema({

    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    active:{
        type:String
    },
    contactOnWhatsapp:{
        type:String
    }
})

module.exports=mongoose.model('LabAppointment',labAppointmentSchema)