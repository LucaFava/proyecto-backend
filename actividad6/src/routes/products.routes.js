import { Router } from "express"
import { ProductManager } from "../persistence/productManager.js"

const productsService = new ProductManager("./productos.json")

const router = Router()

router.get("/", (req,res) => {
    res.json({message:"listado de productos"})
})

router.get("/:pid", async(req,res)=>{
    try {
        const id = parseInt(req.params.pid)
        // const product = await productsService.getProductsById(id)
        //  res.json(product)
         const products = await productsService.getProduct()
         const prodId = products.find((p)=> p.id === id)
         if (prodId) {
             res.json(prodId)
         } else {
             res.json({status:"error", message:error.message})
         }
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
})















export {router as prodRouter}