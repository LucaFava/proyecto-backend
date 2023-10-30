import { Router } from "express"
import { cartsService } from "../persistence/index.js"
import { productsService } from "../persistence/index.js"

const router = Router()

// ruta para mostrar todos los carritos 
router.get("/", async(req,res) => {
    try {
        const carts = await cartsService.getCart()

        res.json({data:carts})
    } catch (error) {
        res.json({message:"error"})
    }
})

// ruta para crear un carrito
router.post("/", async(req,res)=>{
    try {
        const cartCreated = await cartsService.createCart()

        res.json({status:"success",data:cartCreated})
    } catch (error) {
        res.json({message:error})
    }
})

// ruta para agregar un producto al carrito
router.post("/:cid/product/:pid", async(req,res) => {
    try {
        const {cid: cartId, pid:prodId} = req.params;
        const cart = await cartsService.getCartById(cartId)
        const prod = await productsService.getProductsById(prodId)

        const result = await cartsService.addProdCart(cartId, prodId)

 
        res.json({status:"success", result})
    } catch (error) {
        res.json({message:error.message})
    }
})

// ruta para buscar un carrito por id

router.get("/:cid", async(req,res)=>{
    const idCart = req.params.cid

    const cart = await cartsService.getCartById(idCart)

    res.json({status:"succes", cart})
})

// ruta para eliminar un produto de un carrito
router.delete("/:cid/product/:pid", async(req, res)=>{
    try {
        const {cid: cartId, pid:productId} = req.params;
        const cart = await cartsService.getCartById(cartId)
        const result = await cartsService.deleteProd(cartId, productId)

 
        res.json({status:"success", result})
    } catch (error) {
        res.json({message:error.message})
    }
});

// ruta para cambiar la cantidad de un producto
router.put("/:cid/product/:pid", async(req, res)=>{
    try {
        const {cid: cartId, pid:productId} = req.params;
        const {newQuantity} = req.body
        const cart = await cartsService.getCartById(cartId)
        const result = await cartsService.updateProdCart(cartId, productId, newQuantity)

 
        res.json({status:"success", result})
    } catch (error) {
        res.json({message:error.message})
    }
})
export {router as cartsRouter}  