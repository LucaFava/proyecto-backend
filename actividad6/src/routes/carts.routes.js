import { Router } from "express"
import { cartsService } from "../persistence/index.js"


const router = Router()

router.get("/", async(req,res) => {
    try {
        const carts = await cartsService.getCart()

        res.json({data:carts})
    } catch (error) {
        res.json({message:"error"})
    }
})

router.post("/", async(req,res)=>{
    try {
        const cartCreated = await cartsService.createCart()

        res.json({data:cartCreated})
    } catch (error) {
        res.json({message:"error"})
    }
})

router.post("/:cid/product/:pid", async(req,res) => {
    try {
        const cartId = parseInt(req.params.cid)
        const productId = parseInt(req.params.pid)

        res.json({message:"peticion recibida"})
    } catch (error) {
        res.json({message:"error"})
    }
})


export {router as cartsRouter}