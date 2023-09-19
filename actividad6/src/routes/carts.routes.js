import { Router } from "express"

const router = Router()

router.get("/", (req,res) => {
    res.json({message:"listado de carrito"})
})





export {router as cartsRouter}