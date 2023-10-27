import mongoose from "mongoose"

const productsCollection = "products"

// dentro de este esquema vamos a definir todas las propiedades de los productos q vamos a agregar a la coleccion
const productSchema = new mongoose.Schema({
    // del id se encargará mongo
    title: {
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    category:{
        type: String,
        required:true,
        // posibles categorias
        enums:["remera", "abrigos", "zapatillas"]
    },
    price:{
        type: Number,
        required:true
    },
    image:String,
    code:{
        type:String,
        unique:true,
        required: true
    },
    stock:{
        type:Number,
        default:30
    }
})

export const productsModel = mongoose.model(productsCollection, productSchema)

