import { CartsService } from "../services/carts.service.js" 
import { ProductsService } from "../services/products.service.js" 
 
export class CartsController{
    static getCarts = async(req,res) => {
        try {
            const carts = await CartsService.getCart()
    
            res.json({data:carts})
        } catch (error) {
            res.json({message:"error"})
        }
    }

    static createCart = async(req,res)=>{
        try {
            const cartCreated = await CartsService.createCart()
    
            res.json({status:"success",data:cartCreated})
        } catch (error) {
            res.json({message:error})
        }
    }

    static addProd = async(req,res) => {
        try {
            const {cid: cartId, pid:prodId} = req.params;
            const cart = await  CartsService.getCartById(cartId)
            const prod = await ProductsService.getProdId(prodId)
    
            const result = await cartsService.addProdCart(cartId, prodId)
    
     
            res.json({status:"success", result})
        } catch (error) {
            res.json({message:error.message})
        }
    }

    static getCartById = async(req,res)=>{
        const idCart = req.params.cid
    
        const cart = await CartsService.getCartById(idCart)
    
        res.json({status:"succes", cart})
    }

    static deleteProd = async(req, res)=>{
        try {
            const {cid: cartId, pid:productId} = req.params;
            const cart = await CartsService.getCartById(cartId)
            const result = await CartsService.deleteProd(cartId, productId)
    
     
            res.json({status:"success", result})
        } catch (error) {
            res.json({message:error.message})
        }
    }

    static updateProd = async(req, res)=>{
        try {
            const {cid: cartId, pid:productId} = req.params;
            const {newQuantity} = req.body
            const cart = await CartsService.getCartById(cartId)
            const result = await CartsService.updateProdCart(cartId, productId, newQuantity)
    
     
            res.json({status:"success", result})
        } catch (error) {
            res.json({message:error.message})
        }
    };

    static purchaseCart = async(req, res)=>{
        try {
            const {cid : cartId} = req.params;

            const cart = await CartsService.getCartById(cartId) 
            console.log("cart", cart);
            // verificar el stock de cada producto
            if (cart.products.length > 0) {
                const ticketsProducts = []
                const rejectedProducts = []
                for (let i = 0; i<cart.products.length; i++) {
                    const cartProduct = cart.products[i]
                    const productInfo = cartProduct.productId
                    console.log("productInfo",productInfo);
                    // por cada producto comparar la cantidad con el stock
                    if (cartProduct.quantity < productInfo.stock) {
                        
                    }
                }
            } else {
                res.json({status:"error", messagge:"el carrito esta vacio"})
            }
        } catch (error) {
            res.json({message:error.message})
        }
    }
}