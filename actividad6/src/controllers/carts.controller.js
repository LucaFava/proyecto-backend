import { cartsService } from "../persistence/index.js"
import { ProductsService } from "../services/products.service.js" 
 
export class CartsController{
    static getCarts = async(req,res) => {
        try {
            const carts = await cartsService.getCart()
    
            res.json({data:carts})
        } catch (error) {
            res.json({message:"error"})
        }
    }

    static createCart = async(req,res)=>{
        try {
            const cartCreated = await cartsService.createCart()
    
            res.json({status:"success",data:cartCreated})
        } catch (error) {
            res.json({message:error})
        }
    }

    static addProd = async(req,res) => {
        try {
            const {cid: cartId, pid:prodId} = req.params;
            const cart = await cartsService.getCartById(cartId)
            const prod = await ProductsService.getProdId(prodId)
    
            const result = await cartsService.addProdCart(cartId, prodId)
    
     
            res.json({status:"success", result})
        } catch (error) {
            res.json({message:error.message})
        }
    }

    static getCartById = async(req,res)=>{
        const idCart = req.params.cid
    
        const cart = await cartsService.getCartById(idCart)
    
        res.json({status:"succes", cart})
    }

    static deleteProd = async(req, res)=>{
        try {
            const {cid: cartId, pid:productId} = req.params;
            const cart = await cartsService.getCartById(cartId)
            const result = await cartsService.deleteProd(cartId, productId)
    
     
            res.json({status:"success", result})
        } catch (error) {
            res.json({message:error.message})
        }
    }

    static updateProd = async(req, res)=>{
        try {
            const {cid: cartId, pid:productId} = req.params;
            const {newQuantity} = req.body
            const cart = await cartsService.getCartById(cartId)
            const result = await cartsService.updateProdCart(cartId, productId, newQuantity)
    
     
            res.json({status:"success", result})
        } catch (error) {
            res.json({message:error.message})
        }
    }
}