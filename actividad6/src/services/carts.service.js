import { cartsDao } from "../persistence/index.js" 

export class CartsService {

    static getCart = ()=>{
        return cartsDao.getCart()
    }

    static createCart = ()=>{
        return cartsDao.createCart()
    }

    static getCartById = (idCart)=>{
        return cartsDao.getCartById(idCart)
    }

    static addProdCart = (cartId, productId)=>{
        return cartsDao.addProdCart(cartId, productId)
    }

    static deleteProd = (cartId, productId)=>{
        return cartsDao.deleteProd(cartId, productId)
    }

    static updateProdCart = (cartId, productId, newQuantity)=>{
        return cartsDao.updateProdCart(cartId, productId, newQuantity)
    }
}