import mongoose from "mongoose";


const chatCollection = "chat"

const chatSchema = new mongoose.Schema({
    users:{
        type: String,
        required: true,
        unique:true
    },
    message:{
        type:String,
        required:true
    }
})

export const chatModel = mongoose.model(chatCollection, chatSchema)