import mongoose from "mongoose";


const ticketsCollection = "tickets"

const ticketsSchema = new mongoose.Schema({
    code:{
        type:String,
        required:true
    },
    purchase_dateTime:{
        type:Date
    },
    amaount:{
        type: Number,
        required:true
    },
    purcharser:{
        type:String,
        required: true
    }
});

export const ticketsModel = mongoose.model(ticketsCollection, ticketsSchema)