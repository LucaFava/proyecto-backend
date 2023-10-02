import { Router } from "express"
import { cartsService } from "../persistence/index.js"


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

        res.json({data:cartCreated})
    } catch (error) {
        res.json({message:"error"})
    }
})

// ruta para agregar un producto al carrito
router.post("/:cid/product/:pid", async(req,res) => {
    try {
        const cartId = parseInt(req.params.cid)
        const productId = parseInt(req.params.pid)
        const quantity = 1
        await cartsService.addProdCart(cartId, productId, quantity)


        res.json({message:"peticion recibida"})
    } catch (error) {
        res.json({message:"error"})
    }
})

// ruta para buscar un carrito por id

router.get("/:cid", async(req,res)=>{
    const idCart = parseInt(req.params.cid)

    const carts = await cartsService.getCart()
    
    const cartElm = carts.find((c)=> c.id === idCart)
    if (cartElm) {
        res.json(cartElm)
    } else {
        res.json({message:"no se pudo encontrar el carrito"})
    }
})

export {router as cartsRouter}  