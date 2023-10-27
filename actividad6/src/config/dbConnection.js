import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        await mongoose.connect('mongodb+srv://lucafavarel:Luca.Fava456@cluster0.jojn5mi.mongodb.net/ecommerceDB?retryWrites=true&w=majority');
        console.log("Base de datos conectada");
    } catch (error) {
        console.log(`hubo un error conectando la base de datos: ${error.message}`);
    }
};