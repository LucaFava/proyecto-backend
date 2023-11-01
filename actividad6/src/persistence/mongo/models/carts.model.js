import mongoose from "mongoose"

const cartsCollection = "carts"

const cartSchema = new mongoose.Schema({
    products:{
        type: [
            {
                productId: {
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"products"
                },

                quantity: {
                    type:Number,
                    required:true
                }
            }
        ],
        default:[] // con esto le decimos q al momento de crearse el carrito la propiedad products sea inicialmente un array vacio, ya que al principio no hbrá ningun producto agregado
    }    
});


cartSchema.pre(["getCartById", "findById"], function(next) {
    this.populate("products") //this hace referencia al modelo o a la consulta que estemos haciendo
    next()
})

export const cartModel = mongoose.model(cartsCollection, cartSchema)