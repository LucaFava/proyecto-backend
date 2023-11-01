import { cartModel } from "./models/carts.model.js";


export class CartsManagerMongo{
    constructor(){
        this.model = cartModel
    }

    async getCart(){
        try {
            const result = await this.model.find().lean()
            if (!result) {
                throw new Error("El carrito solicitado no existe, pruebe con otro")
            };
            return result;
        } catch (error) {
            console.log(error.message);
            throw new Error("no se pudo obtener el carrito")
        }
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
    
    async getCartById(idCart){
        try {
            const result = await this.model.findById(idCart).populate("products.productId").lean(); //en caso de no encontrar el carrito solicitado el servidor puede devolver un undefinded, para evitar eso, hay que hacer una validacion para tener más controlado los resultados
            if (!result) {
                throw new Error("El carrito solicitado no existe, pruebe con otro")
            };
            return result;
        } catch (error) {
            console.log(error.message);
            throw new Error("no se pudo obtener el carrito")
        }
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
   
    async deleteProd(cartId, productId){
        try {
            const cart = await this.model.findById(cartId)
            const prodExist = cart.products.find(e => e.productId = productId)
            if (prodExist) {
                const newProducts = cart.products.filter(e => e.productId != productId);
                cart.products = newProducts;

                const result = await this.model.findByIdAndUpdate(cartId, cart, {new:true})
                return result;
            } else {
                throw new Error("el producto que quiere eliminar no existe")
            }
        } catch (error) {
            console.log(error.message);
            throw new Error("no se pudo eliminar el producto")
        }
    };
    async updateProdCart(cartId, productId, newQuantity){
        // este método actualizara la cantidad de un producto dentro de un carrito
        try {
            const cart = await this.model.findById(cartId)
            const prodIndex = cart.products.findIndex(e => e.productId = productId)
            if (prodIndex>=0) {
                cart.products[prodIndex].quantity = newQuantity
                const result = await this.model.findByIdAndUpdate(cartId, cart, {new:true})
                return result;
            } else {
                throw new Error("el producto que quiere eliminar no existe")
            }
        } catch (error) {
            console.log("updateProdCart", error.message);
            throw new Error("no se pudo actualizar la cantidad de el producto")
        }
    }
}