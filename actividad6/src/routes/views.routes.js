import { Router } from "express";
import { productsService } from "../persistence/index.js";


const router = Router()

// ruta para la view de home
router.get("/", async(req, res)=>{
    const products = await productsService.getProduct()

    res.render("home", {products: products})
})
// ruta para la view de los productos en tiempo real
router.get("/realtimeproducts", (req, res)=>{
    res.render("realTime")
})




export {router as viewsRouter}