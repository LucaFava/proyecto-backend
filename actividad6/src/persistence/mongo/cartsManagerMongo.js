import { cartModel } from "./models/carts.model.js";


export class CartsManagerMongo{
    constructor(){
        this.model = cartModel
    }

    async getCart(){

    };
    async createCart(){
        try {
            const newCart = {}
            const result = await this.model.create(newCart)
            
            return result;
        } catch (error) {
            console.log(error.message);
            throw new Error("no se pudo crear el carrito")
        };
    };
    
    async addProdCart(cartId, productId){
        try {
            // primero obtenemos el carrito
            const cart = await this.model.findById(cartId)
            // validacion de si el producto ya existe
            const prodExist = cart.products.find(e => e.productId = productId)
            // console.log("prodExist:", prodExist);
            const newProdCart = {
                productId: productId,
                quantity: 1
            };
        
            cart.products.push(newProdCart)
            const result = await this.model.findByIdAndUpdate(cartId, cart, {new:true})
            return result;
            
            
        } catch (error) {
            console.log(error.message);
            throw new Error("no se pudo agregar el carrito")
        }
    };
    async getCartById(idCart){
        try {
            const result = await this.model.findById(idCart).populate(""); //en caso de no encontrar el carrito solicitado el servidor puede devolver un undefinded, para evitar eso, hay que hacer una validacion para tener más controlado los resultados
            if (!result) {
                throw new Error("El carrito solicitado no existe, pruebe con otro")
            };
            return result;
        } catch (error) {
            console.log(error.message);
            throw new Error("no se pudo obtener el carrito")
        }
    };
}