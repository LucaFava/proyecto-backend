import mongoose from "mongoose";

const usersCollection = "users"

const usersSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required:true
    }
})

export const usersModel = mongoose.model(usersCollection, usersSchema)