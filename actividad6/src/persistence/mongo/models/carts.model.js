import mongoose from "mongoose"

const cartsCollection = "carts"

const cartSchema = new mongoose.Schema({
    products: {
        type: [
            {
                productsId: String,

                quantity: {
                    type:Number,
                    required:true
                }
            }
        ],
        default:[] // con esto le decimos q al momento de crearse el carrito la propiedad products sea inicialmente un array vacio, ya que al principio no hbrá ningun producto agregado
    }    
});

export const cartModel = mongoose.model(cartsCollection, cartSchema)