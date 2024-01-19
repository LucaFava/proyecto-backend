import mongoose from "mongoose";

const usersCollection = "users"

const usersSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name:String,
    age: {
        type:Number
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required:true
    },
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"carts",
    },
    role:{
        type:String,
        enum:["user", "admin"],
        default:"user",
    }
})

export const usersModel = mongoose.model(usersCollection, usersSchema)